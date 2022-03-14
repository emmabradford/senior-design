import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './Book/schemas/book.schema';
import { BooksController } from './Book/book.controller';
import { BooksModule } from './Book/book.module';
import { BooksService } from './Book/book.service';
import { GenresModule } from './Genre/genre.module';
import { Book } from './Book/schemas/book.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://emma:emma@bookscluster.jrr4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    BooksModule,
    GenresModule,
    MongooseModule.forFeature([
			{ name: Book.name, schema: BookSchema },
		]),
  ],
  controllers: [
    AppController,
    // BooksController,
  ],
  providers: [AppService,
    // BooksService,
  ],
})
export class AppModule { }
