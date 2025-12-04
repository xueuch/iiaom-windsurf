import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'], // Logs détaillés pour le débogage
    });

    const configService = app.get(ConfigService);
    const port = configService.get('port') || process.env.PORT || 3000;

    // Préfixe global pour l'API
    app.setGlobalPrefix('api');

    // CORS permissif pour le développement (à restreindre plus tard)
    app.enableCors({
      origin: '*', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    // Validation des données entrantes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Retire les champs non déclarés dans les DTO
        transform: true, // Transforme les types automatiquement
        forbidNonWhitelisted: true, // Renvoie une erreur si des champs inconnus sont envoyés
      }),
    );

    // Documentation Swagger
    const config = new DocumentBuilder()
      .setTitle('IIAOM API')
      .setDescription('Système de Gestion Scolaire - Documentation API')
      .setVersion('2.0')
      .addBearerAuth()
      .addTag('health')
      .addTag('auth')
      .addTag('users')
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Écoute sur 0.0.0.0 obligatoire pour Railway/Docker
    await app.listen(port, '0.0.0.0');
    
    logger.log(`🚀 Application LANCEE avec succès sur le port ${port}`);
    logger.log(`📚 Documentation disponible sur : ${await app.getUrl()}/docs`);
  
  } catch (error) {
    logger.error('❌ Erreur fatale au démarrage de l\'application', error);
    process.exit(1);
  }
}
bootstrap();