import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type SellerDocument = Seller & Document;

@Schema({ timestamps: true })
export class Seller {
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
  businessName: string;

  @Prop({ type: String })
  businessAddress: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Date, default: null })
  lastEmailSentAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const SellerSchema = SchemaFactory.createForClass(Seller);

// Hash password before save
SellerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // next();
});