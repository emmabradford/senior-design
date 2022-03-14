import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreController } from './grenre.controller';
import { GenreService } from './genre.service';
import {
	Genre,
	GenreSchema,
} from './schemas/genre.schema';
import { Book, BookSchema } from 'src/Book/schemas/book.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Genre.name, schema: GenreSchema },
		]),
		MongooseModule.forFeature([
			{ name: Book.name, schema: BookSchema },
		]),
	],
	controllers: [GenreController],
	providers: [GenreService],
})
export class GenresModule { }
