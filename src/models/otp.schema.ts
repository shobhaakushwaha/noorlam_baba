import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({ timestamps: true })
export class Otp {
  @Prop({ type: String })
  mobile: string;

  @Prop({ type: String })
  countryCode: string;

  @Prop({ type: String, default: null })
  otp: string;

  @Prop({ type: Boolean, default: false })
  isMobileVerified: boolean;

  @Prop({ type: Date, default: null })
  lastMobileOTPSent: Date;

  @Prop({ type: String, default: null })
  email: string;

  @Prop({ type: Date, default: null })
  lastEmailOTPSent: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

// ✅ Add this line
export const OtpModel = mongoose.model<OtpDocument>('Otp', OtpSchema);