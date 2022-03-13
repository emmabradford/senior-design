import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './Book/schemas/book.schema';
 import { BooksController } from './Book/book.controller';
 import { BooksModule } from './Book/book.module';
 import { BooksService } from './Book/book.service';

@Module({
 imports: [
     MongooseModule.forRoot('mongodb+srv://emma:emma@bookscluster.jrr4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'), 
     BooksModule,
    ],
 controllers: [
    AppController, 
   // BooksController,
   ],
 providers: [AppService, 
  // BooksService,
],
})
export class AppModule {}
