import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../auth/users/user.schema';

export type CampDocument = Camp & Document;

@Schema({ timestamps: true, versionKey: false })
export class Camp {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  author: string;

  @Prop({ default: 0 })
  star: number;

  @Prop({ default: false })
  hasReview: boolean;
}

export const CampSchema = SchemaFactory.createForClass(Camp);
