import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ unique: true, required: true })
  mobile: string;

  @Prop({ default: '+91' })
  countryCode: string;

  @Prop({
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male',
  })
  gender: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: '' })
  profile: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ type: Date })
  dateOfBirth: Date;

  @Prop({ default: null })
  otp: string | null;

  @Prop({ default: null })
  otpExpiry: Date | null;

  @Prop({ default: null })
  lastEmailSentAt: Date | null;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: '' })
  zipCode: string;

  @Prop({ default: '' })
  deviceToken: string;

  @Prop({ default: '' })
  deviceType: string;

  @Prop({ default: '' })
  latitude: string;

  @Prop({ default: '' })
  longitude: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};