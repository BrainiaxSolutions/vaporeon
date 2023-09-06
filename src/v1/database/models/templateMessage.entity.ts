import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'templateMessages' })
export class TemplateMessageEntity {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    type: String,
    required: true,
  })
  message: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}

export const TemplateMessageSchema = SchemaFactory.createForClass(
  TemplateMessageEntity,
);
