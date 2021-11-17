import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//import { BookController } from './book.controler';
//import { BookService } from './book.service';
import {
	Book,
	BookSchema,
} from './schemas/book.schema';
//import {NotificationsModule}

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Book.name, schema: BookSchema },
		]),
	],
	//controllers: [NotificationsController],
	//providers: [NotificationsService],
})
export class NotificationsModule {}
