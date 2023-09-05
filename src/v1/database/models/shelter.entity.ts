import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'shelters' })
export class ShelterEntity {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    type: String,
    length: '45',
    nullable: false,
  })
  name: string;

  @Prop({
    type: String,
    length: '45',
    nullable: false,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    length: '18',
    unique: true,
    nullable: false,
  })
  cnpj: string;

  @Prop({
    type: String,
    length: '2',
    nullable: true,
  })
  state: string;

  @Prop({
    type: String,
    length: 29,
    nullable: true,
  })
  city: string;

  @Prop({
    type: String,
    length: '9',
    nullable: false,
  })
  zipCode: string;

  @Prop({
    type: String,
    length: 45,
    nullable: false,
  })
  address: string;

  @Prop({
    type: String,
    length: 4,
    nullable: false,
  })
  addressNumber: string;

  @Prop({
    type: String,
    length: 30,
    nullable: false,
  })
  complement: string;

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
    length: 14,
    nullable: false,
  })
  phone: string;

  @Prop({
    type: Boolean,
    default: false,
    nullable: true,
  })
  isActive: string;

  @Prop({
    type: Boolean,
    nullable: false,
  })
  terms: string;

  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  updatedAt: Date;
}

export const ShelterSchema = SchemaFactory.createForClass(ShelterEntity);
