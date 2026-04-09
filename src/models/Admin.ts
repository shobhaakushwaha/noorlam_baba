import mongoose, {
 Document,
  Schema,
} from 'mongoose';
import bcrypt from 'bcrypt';

export interface AdminDocument extends Document {
  name?: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  status: boolean;
  otp?: string;
  lastEmailSentAt?: Date;
}

const AdminSchema = new Schema<AdminDocument>({
  name: { type: String }, // Optional
  email: { type: String, required: true, unique: true },
  mobile: { type: String },
  password: { type: String },
  role: { type: String, default: 'admin' },
  status: { type: Boolean, default: true },
  otp: { type: String },
  lastEmailSentAt: { type: Date },
});

// AdminSchema.pre('save', async function (
//   next: CallbackWithoutResultAndOptionalError,
// ) {
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }

//   try {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     next(error as Error);
//   }
// });

export const Admin = mongoose.model<AdminDocument>('Admin', AdminSchema);
