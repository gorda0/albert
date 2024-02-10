import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  home() {
    return 'Teste Albert Einstein';
  }
}
