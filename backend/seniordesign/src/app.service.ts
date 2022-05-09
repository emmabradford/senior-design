import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Book } from './Book/schemas/book.schema';
//import * as mongoDB from "mongodb";
//import * as dotenv from "dotenv";

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>
  ) { }
  async getRecs(numRec: number, minPage: number, maxPage: number, g: Array<string>) {
    let books = await this.bookModel.find();
    if(g == null){
      g = ["Nonfiction", "Fiction"];
    }
    if (minPage == null) {
      minPage = 0;
    }
    if (maxPage == null) {
      maxPage = 10000;
    }
    if (numRec == null) {
      numRec = 10;
    }

    books = books.filter(d => d.numPages > minPage);
    books = books.filter(d => d.numPages < maxPage);

    let books1 = [];
    //if (g) {
      for (let i = 0; i < g.length; i++) {
        books.filter(d => {
          if(d.genre.includes(g[i])){
            books1.push(d);
          }
        });
      }
      books = books1;
   // }
    
    let recs = [];
    if (books.length <= numRec) {
      return books;
    }
    else {
      while (recs.length < numRec) {
        let b = books[Math.floor(Math.random() * books.length)]
        if (recs.indexOf(b) == -1) {
          recs.push(b);
        }
      }
      return recs;
    }


  }
}
