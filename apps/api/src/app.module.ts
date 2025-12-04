import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './modules/health/health.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration centralisée
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'], // Utile en local, ignoré en prod si les variables sont dans l'OS
    }),
    // Connexion Base de Données Robustifiée
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseConnection');
        const isProduction = configService.get('nodeEnv') === 'production';
        
        // Récupération sécurisée des variables
        const host = configService.get<string>('database.host');
        const port = configService.get<number>('database.port');
        const username = configService.get<string>('database.username');
        const database = configService.get<string>('database.database');
        
        logger.log(`Tentative de connexion à ${host}:${port} (Base: ${database})`);

        return {
          type: 'postgres',
          host,
          port,
          username,
          password: configService.get<string>('database.password'),
          database,
          // Chargement automatique des entités
          autoLoadEntities: true, 
          // En PROD, on ne synchronise jamais automatiquement (risque de perte de données)
          // En DEV, c'est pratique.
          synchronize: !isProduction, 
          ssl: isProduction ? { rejectUnauthorized: false } : false,
          // Options de résilience
          connectTimeoutMS: 10000,
          retryAttempts: 5,
          retryDelay: 3000,
        };
      },
    }),
    HealthModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}