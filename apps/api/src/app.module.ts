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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const logger = new Logger('DatabaseConnection');
        
        // --- CORRECTION MAJEURE ---
        // On lit directement les variables d'environnement injectées par Docker
        // Cela contourne les problèmes de namespace de configuration
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_NAME');
        const isSsl = configService.get('DB_SSL') === 'true';

        logger.log(`Tentative de connexion à ${host}:${port} (Base: ${database})`);

        return {
          type: 'postgres',
          host,
          port: port ? Number(port) : 5432,
          username,
          password,
          database,
          autoLoadEntities: true,
          // En local (NODE_ENV != production), on active la synchro pour créer les tables auto
          synchronize: configService.get('NODE_ENV') !== 'production',
          ssl: isSsl ? { rejectUnauthorized: false } : false,
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