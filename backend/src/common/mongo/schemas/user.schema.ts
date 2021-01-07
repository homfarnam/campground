import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  token?: string;

  @Prop({ type: Array, default: ['user'] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
