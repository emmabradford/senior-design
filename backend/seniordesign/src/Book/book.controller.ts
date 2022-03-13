import {Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Res, UseGuards} from '@nestjs/common';
import { BooksService} from './book.service';
import { BookSchema } from './schemas/book.schema';
import { BookDto } from './book.dto';

@Controller('books')

export class BooksController{
    constructor(private readonly booksService: BooksService){}

    @Get()
    async getAll(){
        try{
            const result = await this.booksService.getAll();
            return result;
        } catch(err){
            console.error(err);
            throw new HttpException('Error! Cannot get all books', 400);
        }
    }

    @Get(':id')
    async getBookById(@Param('id') i:string){
        console.log(i);
        try{
            const result = await this.booksService.getBookById(i);
            return result;
        } catch(err){
            console.error(err);
            throw new HttpException('Error! Cannot get book by id', 400);
        }
    }

    @Post()
   async postBook(@Body() book: BookDto) {
       try{
    return this.booksService.postBook(book);
       }catch(err){
        console.error(err);
        throw new HttpException('Error! Cannot post book', 400);
       }
  }


    @Patch(':id')
    async updateBook(@Body() updateBookDto){
        try{
            return await this.booksService.updateBook(updateBookDto);
        } catch(err){
            throw new HttpException('Error! Cannot update Book', 400);
        }
    }

    @Delete(':id')
    async deleteBook(@Body() deleteBookDto){
        try{
            await this.booksService.deleteBook(deleteBookDto);
            return null;
        } catch(err){
            console.error(err);
            throw new HttpException('Error! Cannot delete book', 400);
        }
    }

}