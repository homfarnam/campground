import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/users/user.schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true, versionKey: false })
export class Review {
  @Prop({
    index: true,
    required: true,
  })
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
