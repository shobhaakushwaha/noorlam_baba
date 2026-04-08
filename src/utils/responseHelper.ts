import { Response } from 'express';
import { encrypter } from '../utils/cryptoHandler';

const shouldEncrypt = process.env.ENCRYPTION === 'true';

interface BoomError {
  isBoom: boolean;
  output: {
    payload: { message: string };
    statusCode: number;
  };
  data?: any;
}

export const sendResponse = (
  res: Response,
  data: any | BoomError,
  message: string = 'Success',
  status: number = 200,
): Response => {
  // Handle Boom error structure
  if ((data as BoomError)?.isBoom && (data as BoomError)?.output?.payload) {
    const { output: { payload, statusCode }, data: boomData } = data as BoomError;
    return res.status(statusCode).json({
      status: statusCode,
      message: payload.message,
      data: boomData || null,
    });
  }

  const response = { status, message, data };
  return res.status(status).json(
    shouldEncrypt ? { data: encrypter({ response }) } : response
  );
};

export const normalResponse = (
  res: Response,
  data: any = {},
  message: string = 'Success',
  status: number = 200,
): void => {
  const response = { status, message, data };
  res.status(status).json(response);
};