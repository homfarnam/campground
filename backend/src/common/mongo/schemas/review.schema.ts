import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Camp } from './campground.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, versionKey: false })
export class Review extends Document {
  @Prop({ index: true, required: true, ref: Camp.name })
  camp: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: string;

  @Prop()
  title: string;

  @Prop({ default: 5 })
  star: number;

  @Prop()
  content: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
