import { Response } from 'express';
import { encrypter } from '../utils/cryptoHandler';

const shouldEncrypt: boolean = process.env.ENCRYPTION === 'true';

interface BoomError {
  isBoom?: boolean;
  output?: {
    payload?: {
      message?: string;
    };
    statusCode?: number;
  };
  data?: any;
}

interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T;
}

/**
 * Sends a standardized API response, with optional Boom and encryption handling.
 */
export const sendResponse = <T = any>(
  res: Response,
  data: T | BoomError,
  message: string = 'Success',
  status: number = 200
): Response => {
  // Handle Boom error structure
  if ((data as BoomError)?.isBoom && (data as BoomError)?.output?.payload) {
    const boom = data as BoomError;

    return res.status(boom.output!.statusCode || 500).json({
      status: boom.output!.statusCode,
      message: boom.output!.payload!.message,
      data: boom.data || null,
    });
  }

  const response: ApiResponse<T> = { status, message, data: data as T };

  return res
    .status(status)
    .json(shouldEncrypt ? { data: encrypter({ response }) } : response);
};

/**
 * Sends a basic, non-encrypted response.
 */
export const normalResponse = <T = any>(
  res: Response,
  data: T = {} as T,
  message: string = 'Success',
  status: number = 200
): Response => {
  const response: ApiResponse<T> = { status, message, data };
  return res.status(status).json(response);
};