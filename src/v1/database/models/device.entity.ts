import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

enum DeviceNameEnum {
  PLUVIOMETER = 'pluviometer',
}

@Schema()
export class Device {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    type: String,
    enum: DeviceNameEnum,
    required: true,
  })
  deviceName: string;

  @Prop({
    type: String,
    minLength: 3,
    maxLength: 12,
    required: true,
  })
  latitude: string;

  @Prop({
    type: String,
    minLength: 3,
    maxLength: 12,
    required: true,
  })
  longitude: string;

  @Prop({
    type: Number,
    required: true,
  })
  maximumLimit: number;

  @Prop({
    type: [],
    required: true,
  })  
  alerts: Alert[]

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

export const DeviceSchema = SchemaFactory.createForClass(Device);

