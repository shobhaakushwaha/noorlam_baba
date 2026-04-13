import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../../models/User';
import generateJwtToken from '../../../utils/jwtHandler';
import { MESSAGE } from '../../../constant/user.messages';
import { decrypter } from '../../../utils/cryptoHandler';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async register(body: RegisterDto) {
    try {
      const requests = await decrypter(body);

      console.log(requests, 'Decrypted Registration Data:');

      const {
        name,
        email,
        password,
        dateOfBirth,
        gender,
        mobile,
        deviceType,
        deviceToken,
        countryCode,
        latitude,
        longitude,
        address
      } = requests;

      // Check Existing Mobile
      const existingUser = await this.userModel.findOne({
        mobile,
        isDeleted: false,
      });

      if (existingUser) {
        return {
          status: 422,
          message: MESSAGE.MOBILE_EXIST,
          data: {},
        };
      }

      // Check Existing Email
      const existingEmail = await this.userModel.findOne({
        email,
        isDeleted: false,
      });

      if (existingEmail) {
        return {
          status: 422,
          message: MESSAGE.EMAIL_EXIST,
          data: {},
        };
      }

      // Create User
      const user = await this.userModel.create({
        name,
        email,
        password,
        dateOfBirth,
        gender,
        mobile,
        deviceType,
        deviceToken,
        countryCode,
        latitude,
        longitude,
        address
      });

      // Generate JWT
      const token = generateJwtToken({
        _id: user._id.toString(),
        // mobile: user.mobile,
        email: user.email,
      });

      return {
        status: 200,
        message: MESSAGE.USER_REGISTER_SUCCESS,
        data: {
          user,
          token,
        },
      };
    } catch (err) {
      console.log('Registration Error:', err);

      return {
        status: 500,
        message: MESSAGE.INTERNAL_SERVER_ERROR,
        data: {},
      };
    }
  }
}