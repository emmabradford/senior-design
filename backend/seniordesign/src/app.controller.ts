import { Controller, Get } from '@nestjs/common';
import { Body, Query, Delete, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { BooksService } from './Book/book.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) { }

  @Get()
  async getRecs(@Body('num rec') numRec: number,
    @Body('min pages') minPage: number,
    @Body('max pages') maxPage: number,
    @Body('genre') g: [string]
  ) {
    try {
      const result = await this.appService.getRecs(numRec, minPage, maxPage, g);
      console.log("hello");
      return result;
    }
    catch (err) {
      console.error(err);
      throw new HttpException('Error! Cannot get all Recomendations', 400);
    }
  }
}
