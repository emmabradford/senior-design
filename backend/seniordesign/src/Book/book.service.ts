import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { BookDto } from './book.dto';

const bookProjection = {
    __v: false,
    _id: false,
};

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) { }

    async getAll() {
        const results = await this.bookModel.find();
        return results;
    }

    async getBookById(i: string): Promise<BookDto> {
        const result = this.bookModel.findById(i);
        return await result.exec();
    }

    public async postBook(book: BookDto) {
        const book1 = await new this.bookModel(book);
        return book1.save();
    }

    async deleteBook(i: string) {
        try {
            const book = await this.bookModel.deleteOne({ _id: i }).exec();
        } catch (err) {
            console.log(err);
            throw new NotFoundException('could not find the product');
        }
    }

    async updateBook(i: string, t: string, a: string, np: number, g: Array<string>) {
        const newBook = await this.findBook(i);

        if (t) {
            newBook.title = t;
        }
        if (a) {
            newBook.author = a;
        }
        if (np) {
            newBook.numPages = np;
        }
        if (g) {
            const genres = newBook.genre;
            g.forEach(e => {
                if (e && genres.indexOf(e) == -1) {
                    newBook.genre.push(e);
                }
            });
        }
        newBook.save();
    }

    async createBook(createBookDto) {
        const newBook = new this.bookModel(createBookDto);
        const result = await newBook.save();
        return result;
    }

    private async findBook(i: string): Promise<Book> {
        let result;
        try {
            result = await this.bookModel.findById(i).exec();
        } catch (err) {
            throw new NotFoundException('the book was not found');
        }
        if (!result) {
            throw new NotFoundException('the book was not found');
        }
        return result;
    }
}
