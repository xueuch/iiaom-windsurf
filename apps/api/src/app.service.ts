import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'IIAOM API',
      version: '2.0.0',
      description: 'API de gestion scolaire IIAOM',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        docs: '/docs',
        health: '/api/health',
        auth: '/api/auth',
        users: '/api/users',
      },
    };
  }
}
