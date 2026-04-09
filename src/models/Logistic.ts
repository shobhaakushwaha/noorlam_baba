
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

import * as bcrypt from 'bcrypt';

export type LogisticDocument = Logistic & Document;

@Schema({ timestamps: true })
export class Logistic {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  mobile: string;

  @Prop({ type: String })
  password: string;

  @Prop({ type: String, default: '' })
  profile: string;

  @Prop({ type: String })
  vehicleType: string;

  @Prop({ type: String })
  vehicleNumber: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Date, default: null })
  lastEmailSentAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const LogisticSchema = SchemaFactory.createForClass(Logistic);

// Hash password before save
LogisticSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // next();
});

export const LogisticModel = mongoose.model<LogisticDocument>('Logistic', LogisticSchema);
