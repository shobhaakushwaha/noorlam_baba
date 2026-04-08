import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Admin } from '../../../models/admin.schema';
import { OtpModel as Otp } from '../../../models/otp.schema';

import generateJwtToken from '../../../utils/jwtHandler';
import { sendEmail } from '../../../helpers/emailHelper';

import constant from '../../../constant/index';
import { MESSAGE } from '../../../constant/admin.messages';

import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  // ─── Register ─────────────────────────────
  async register(body: RegisterDto) {
    const { name, email, mobile, password } = body;

    const exists = await Admin.exists({ email });
    if (exists) {
      return { success: false, message: MESSAGE.EMAIL_EXIST, statusCode: 422 };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Admin({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: 'admin',
    });

    await user.save();

    const token = generateJwtToken({
      ...user.toObject(),
      _id: user._id.toString(),
    });

    return {
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      message: MESSAGE.ADMIN_REGISTER_SUCCESS,
      statusCode: 200,
    };
  }

  //Login
  async login(body: LoginDto) {
    const { email, password } = body;

    const user = await Admin.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: MESSAGE.EMAIL_NOT_REGISTERED,
        statusCode: 422,
      };
    }

    let isValid = await bcrypt
      .compare(password, user.password)
      .catch(() => false);

    // legacy support
    if (!isValid && user.password === password) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      isValid = true;
    }

    if (!isValid) {
      return {
        success: false,
        message: MESSAGE.INVALID_PASSWORD,
        statusCode: 422,
      };
    }

    if (!user.status) {
      return {
        success: false,
        message: MESSAGE.INACTIVE_ACCOUNT,
        statusCode: 422,
      };
    }

    const token = generateJwtToken({
      ...user.toObject(),
      _id: user._id.toString(),
    });

    return {
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      message: MESSAGE.ADMIN_LOGIN_SUCCESS,
      statusCode: 200,
    };
  }

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
      const otp = '123456'; // TODO dynamic

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
