import { Body, Query, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BooksService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { BookDto } from './book.dto';

@Controller('books')

export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Get()
    async getAll() {
        try {
            const result = await this.booksService.getAll();
            return result;
        } catch (err) {
            console.error(err);
            throw new HttpException('Error! Cannot get all books', 400);
        }
    }

    @Get(':id')
    async getBookById(@Param('id') i: number) {
        console.log(i);
        try {
            const result = await this.booksService.getBookById(i);
            return result;
        } catch (err) {
            console.error(err);
            throw new HttpException('Error! Cannot get book by id', 400);
        }
    }

    @Post()
    async postBook(@Body() book: BookDto) {
        try {
            return this.booksService.postBook(book);
        } catch (err) {
            console.error(err);
            throw new HttpException('Error! Cannot post book', 400);
        }
    }


    @Patch(':id')
    async updateProduct(
        @Param('id') i: string,
        @Body('title') t: string,
        @Body('author') a: string,
        @Body('numPages') np: number,
        @Body('genre') g: [string]
    ) {
        try {
            await this.booksService.updateBook(i, t, a, np, g);

            return null;
        } catch (err) {
            console.error(err);
            throw new HttpException('Error! Cannot patch book', 400);
        }
    }

    @Delete(':id')
    async deleteBooks(@Param('id') i: string) {
        try {
            await this.booksService.deleteBook(i);
            return null;
        }
        catch (err) {
            console.error(err);
            throw new HttpException('Error! Cannot delete book', 400);
        }
    }

}