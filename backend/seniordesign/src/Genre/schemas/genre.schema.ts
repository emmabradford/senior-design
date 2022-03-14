import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document } from 'mongoose';
 
@Schema()
export class Genre extends Document
{

   @Prop()
   name: string;

}
 
export const BookSchema = SchemaFactory.createForClass(Genre);

