import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './schemas/genre.schema';
import { GenreDto } from './genre.dto';
import { BooksModule } from 'src/Book/book.module';
import { Book } from 'src/Book/schemas/book.schema';

// const bookProjection = {
//     __v: false,
//     _id: false,
//   };

//@Injectable()
export class GenreService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) { }

    async getAll() {
        const books = await this.bookModel.find();
        let genres = [];
        books.forEach(d => {
            let gs = d.genre;
            gs.forEach(g => {
                if (genres.indexOf(g) == -1) {
                    genres.push(g);
                }
            });
        });
        return genres;
    }

}
