"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'iiaom',
        ssl: process.env.DB_SSL === 'true',
    },
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'X-XSRF-TOKEN',
        ],
        credentials: true,
    },
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL, 10) || 60,
        limit: parseInt(process.env.THROTTLE_LIMIT, 10) || 100,
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    swagger: {
        title: 'IIAOM API',
        description: 'API for IIAOM School Management System',
        version: '1.0',
        path: 'api/docs',
    },
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024,
        allowedFileTypes: [
            'image/jpeg',
            'image/png',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        from: process.env.EMAIL_FROM || 'noreply@iiaom.com',
    },
    app: {
        name: 'IIAOM School Management',
        url: process.env.APP_URL || 'http://localhost:3000',
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:19006',
    },
}));
//# sourceMappingURL=configuration.js.map