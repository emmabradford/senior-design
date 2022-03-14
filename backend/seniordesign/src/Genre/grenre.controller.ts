import {Body, Query, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import { GenreService} from './genre.service';
//import { BookSchema } from './schemas/book.schema';
//import { BookDto } from './book.dto';

@Controller('genres')

export class GenreController{
    constructor(private readonly genreService: GenreService){}

    @Get()
    async getAll(){
        try{
            const result = await this.genreService.getAll();
            return result;
        } catch(err){
            console.error(err);
            throw new HttpException('Error! Cannot get all genres', 400);
        }
    }


}