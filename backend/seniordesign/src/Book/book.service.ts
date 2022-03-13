import {Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Book} from './schemas/book.schema';
import { BookDto } from './book.dto';

const bookProjection = {
    __v: false,
    _id: false,
  };

@Injectable()
export class BooksService{
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ){}

    async getAll(){
        const results = await this.bookModel.find();
        return results;
    }

    async getBookById(i:number): Promise<BookDto>{
        const result = this.bookModel.findOne({i}, bookProjection);
        return await result.exec();
    }

    public async postBook(book: BookDto) {
        const book1 = await new this.bookModel(book);
        return book1.save();
      }

    async deleteBook(deleteBookDto){
        const result = await this.bookModel.findByIdAndDelete(deleteBookDto).exec();
        return result;
    }

    async updateBook(updateBookDto): Promise<Book> {
		const result = this.bookModel.findByIdAndUpdate(
			updateBookDto._id,
			updateBookDto,
		);
		return await result.exec();
    }
    
    async createBook(createBookDto){
        const newBook = new this.bookModel(createBookDto);
        const result = await newBook.save();
        return result;
    }

    private async findBook(i: string):Promise<Book>{
        let result;
        try{
            result = await this.bookModel.findById(i).exec();
        }catch(err){
            throw new NotFoundException('the book was not found');
        }
        if(!result){
            throw new NotFoundException('the book was not found');
        }
        return result;
    }
}
