import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get('/')
  getHealthCheck(): object {
    return { success: true, date: Date.now() };
  }
}
