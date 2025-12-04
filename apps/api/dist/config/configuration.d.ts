declare const _default: (() => {
    nodeEnv: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
    };
    cors: {
        origin: string | string[];
        methods: string[];
        allowedHeaders: string[];
        credentials: boolean;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    logging: {
        level: string;
    };
    swagger: {
        title: string;
        description: string;
        version: string;
        path: string;
    };
    upload: {
        maxFileSize: number;
        allowedFileTypes: string[];
    };
    email: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        from: string;
    };
    app: {
        name: string;
        url: string;
        frontendUrl: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    nodeEnv: string;
    port: number;
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
    };
    cors: {
        origin: string | string[];
        methods: string[];
        allowedHeaders: string[];
        credentials: boolean;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
    logging: {
        level: string;
    };
    swagger: {
        title: string;
        description: string;
        version: string;
        path: string;
    };
    upload: {
        maxFileSize: number;
        allowedFileTypes: string[];
    };
    email: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        from: string;
    };
    app: {
        name: string;
        url: string;
        frontendUrl: string;
    };
}>;
export default _default;
