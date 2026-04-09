import { Injectable } from '@nestjs/common';
import { OtpModel as Otp } from '../../../models/Otp'

@Injectable()
export class OtpService {

  async sendOtp(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
   await Otp.create({ email, otp });
   console.log(`OTP for ${email}: ${otp}`);
return {
      success: true,
      message: 'OTP sent successfully',
    };
  }

  async verifyOtp(email: string, otp: string) {
    const record = await Otp.findOne({ email, otp });

    if (!record) {
      return {
        success: false,
        message: 'Invalid OTP',
      };
    }

    await Otp.deleteOne({ _id: record._id });

    return {
      success: true,
      message: 'OTP verified',
    };
  }
}