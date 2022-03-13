import { Injectable } from '@nestjs/common';
//import * as mongoDB from "mongodb";
//import * as dotenv from "dotenv";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
