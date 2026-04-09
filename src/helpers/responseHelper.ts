import { Response } from 'express';
import { encrypter } from '../utils/cryptoHandler';

const shouldEncrypt = process.env.ENCRYPTION === 'false' ? false : true;
const shouldEncrypts = false;


export class ResponseHandler {
  static send(
    res: Response,
    data: any,
    message = 'Success',
    status = 200,

  ) {
    // Handle Boom-like error
    if (data?.isBoom && data?.output?.payload) {
      const {
        output: { payload, statusCode },
        data: boomData,
      } = data;

      return res.status(statusCode).json({
        status: statusCode,
        message: payload.message,
        data: boomData || null,
      });
    }

    const response = { status, message, data };

    return res
      .status(status)
      .json(shouldEncrypt ? { data: encrypter({ response }) } : response);
  }

  static normal(
    res: Response,
    data: any = {},
    message = 'Success',
    status = 200,
  ) {
    const response = { status, message, data };
    return res.status(status).json(response);
  }
}




export class NormalResponse {
  static send(
    res: Response,
    data: any,
    message = 'Success',
    status = 200,

  ) {
    // Handle Boom-like error
    if (data?.isBoom && data?.output?.payload) {
      const {
        output: { payload, statusCode },
        data: boomData,
      } = data;

      return res.status(statusCode).json({
        status: statusCode,
        message: payload.message,
        data: boomData || null,
      });
    }

    const response = { status, message, data };

    return res
      .status(status)
      .json(shouldEncrypts ? { data: encrypter({ response }) } : response);
  }

  static normal(
    res: Response,
    data: any = {},
    message = 'Success',
    status = 200,
  ) {
    const response = { status, message, data };
    return res.status(status).json(response);
  }
}