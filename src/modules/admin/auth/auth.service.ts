import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Admin } from '../../../models/Admin';
import { OtpModel as Otp } from '../../../models/Otp';

import generateJwtToken from '../../../utils/jwtHandler';
import { sendEmail } from '../../../helpers/emailHelper';

import constant from '../../../constant/index';
import { MESSAGE } from '../../../constant/admin.messages';

import {
  RegisterDto,
  LoginDto,
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

}
