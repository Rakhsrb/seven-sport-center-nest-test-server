import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trainer extends Document {
  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  experience: string;

  @Prop()
  achievements: string[];
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
