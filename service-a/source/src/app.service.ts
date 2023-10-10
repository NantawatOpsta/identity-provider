import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! From Service A';
  }

  getData(): object {
    return {
      server: 'Server A',
      framework: 'NestJs',
    };
  }
}
