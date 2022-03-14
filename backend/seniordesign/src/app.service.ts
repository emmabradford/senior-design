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
    //console.log(maxPage==null);
    //console.log(books.length);
    if (minPage == null) {
      minPage = 0;
    }
    if (maxPage == null) {
      maxPage = 10000;
    }
    console.log(numRec);
    if(numRec==null){
      numRec = 10;
    }

    books = books.filter(d => d.numPages > minPage);
    books = books.filter(d => d.numPages < maxPage);
    if (g) {
      for (let i = 0; i < g.length; i++) {
        //console.log(g[i]);
        books = books.filter(d => d.genre.includes(g[i]));
      }
    }
    let recs = [];
    console.log(numRec);
    if(books.length<= numRec){
      console.log("we good")
      return books;

    }
    else{
      while(recs.length<numRec){
        let b = books[Math.floor(Math.random()*books.length)]
        if(recs.indexOf(books)==-1){
          recs.push(b);
        }
        console.log(recs.length);
      }
      return recs;
    }

    
  }
}
