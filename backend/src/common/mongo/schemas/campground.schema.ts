import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type CampDocument = Camp & Document;

@Schema({ timestamps: true, versionKey: false })
export class Camp {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  desc: string;

  @Prop()
  imgUrl: string;

  @Prop({ required: true })
  location: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: string;

  @Prop({ default: 0 })
  star: number;

  @Prop({ default: false })
  hasReview: boolean;
}

export const CampSchema = SchemaFactory.createForClass(Camp);
