import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('test')
  async getTest() {
    return 'Welcome to Skills Tracker API!';
  }
}
