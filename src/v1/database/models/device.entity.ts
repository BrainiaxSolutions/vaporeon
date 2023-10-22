import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DeviceNameEnum } from 'src/enum/deviceEnum';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'devices' })
export class DeviceEntity {
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
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: [Number],
  })
  location: {
    type: string;
    coordinates: [number, number];
  };

  @Prop({
    type: String,
    length: 45,
    nullable: false,
  })
  street: string;

  @Prop({
    type: Number,
    required: true,
  })
  maximumLimit: number;

  @Prop({
    type: [],
    required: true,
  })
  alerts: AlertObject[];

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

export const DeviceSchema = SchemaFactory.createForClass(DeviceEntity);
