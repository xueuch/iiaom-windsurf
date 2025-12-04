import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Page d\'accueil de l\'API' })
  @ApiResponse({ status: 200, description: 'Message de bienvenue' })
  getHello() {
    return this.appService.getInfo();
  }
}
