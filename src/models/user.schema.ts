// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import * as bcrypt from 'bcrypt';

// export type UserDocument = User & Document;

// @Schema({ timestamps: true })
// export class User {
//   @Prop({ type: String })
//   name: string;

//   @Prop({ type: String, unique: true })
//   email: string;

//   @Prop({ type: String })
//   mobile: string;

//   @Prop({ type: String })
//   password: string;

//   @Prop({ type: String, default: '' })
//   profile: string;

//   @Prop({ type: Boolean, default: true })
//   status: boolean;

//   @Prop({ type: String, default: null })
//   otp: string;

//   @Prop({ type: Date, default: null })
//   lastEmailSentAt: Date;

//   @Prop({ type: Boolean, default: false })
//   isDeleted: boolean;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

// // Hash password before save
// UserSchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });




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

  @Prop({ required: true, unique: true })
  mobile: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ default: '' })
  profile: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: null })
  otp: string | null;

  @Prop({ default: null })
  otpExpiry: Date | null;

  @Prop({ default: null })
  lastEmailSentAt: Date | null;

  @Prop({ default: false })
  isDeleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);




UserSchema.pre('save', async function (this: UserDocument) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});



UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
