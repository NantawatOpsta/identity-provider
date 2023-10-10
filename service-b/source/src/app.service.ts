import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! From Service B';
  }

  getData(): object {
    return {
      server: 'Server B',
      framework: 'NestJs',
    };
  }
}
