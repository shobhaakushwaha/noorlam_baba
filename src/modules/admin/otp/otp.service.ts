import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Admin } from '../../../models/Admin';
import { OtpModel as Otp } from '../../../models/Otp';

import generateJwtToken from '../../../utils/jwtHandler';
import sendEmail  from '../../../helpers/emailHelper';

import constant from '../../../constant/index';
import { MESSAGE } from '../../../constant/admin.messages';

import {
 
  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './otp.tdo';

@Injectable()
export class OtpService {
  
 // ─── Forgot Password ─────────────────────────────
  async forgotPassword(body: ForgotPasswordDto) {
    console.log(body, 'body***********');
    const admin = await Admin.findOne({ email: body.email });

    if (!admin) {
      return {
        success: false,
        message: MESSAGE.NO_ACCOUNT_EXISTS,
        statusCode: 422,
      };
    }

    const currentTime = Date.now();

    if (
      !admin.lastEmailSentAt ||
      currentTime - new Date(admin.lastEmailSentAt).getTime() >
        constant.RESEND_WAITING_TIME
    ) {
      const otp = '123456'; 

      await sendEmail({
        to: body.email,
        subject: 'OTP',
        html: `Hi ${admin.name}, OTP: ${otp}`,
      });

      admin.lastEmailSentAt = new Date();
      admin.otp = otp;
      await admin.save();
    } else {
      return {
        success: false,
        message: 'Please wait before retry',
        statusCode: 422,
      };
    }

    return {
      success: true,
      message: MESSAGE.OTP_SENT,
      statusCode: 200,
    };
  }

  // ─── Verify OTP ─────────────────────────────
  async verifyOtp(body: VerifyOtpDto) {
    const record = await Admin.findOne({ email: body.email, otp: body.otp });

    if (!record) {
      return {
        success: false,
        message: MESSAGE.INVALID_MOBILE_OTP,
        statusCode: 422,
      };
    }

    record.otp = '';
    await record.save();

    return {
      success: true,
      message: MESSAGE.OTP_VERIFIED,
      statusCode: 200,
    };
  }

  // ─── Reset Password ─────────────────────────────
  async resetPassword(body: ResetPasswordDto) {
    const admin = await Admin.findOne({ otp: body.otp });

    if (body.newPassword != body.confirmPassword) {
      return {
        success: false,
        message: MESSAGE.PASSWORD_MISMATCH,
        statusCode: 422,
      };
    }

    if (!admin) {
      return { success: false, message: MESSAGE.INVALID_OTP, statusCode: 422 };
    }

    admin.password = await bcrypt.hash(body.newPassword, 10);
    admin.otp = '';
    await admin.save();

    return {
      success: true,
      message: MESSAGE.PASSWORD_UPDATE_SUCCESS,
      statusCode: 200,
    };
  }
}
