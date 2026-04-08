import crypto from 'crypto';

const algorithm = process.env.ENCRYPTION_ALGORITHM as string;
const key = process.env.ENCRYPTION_FIXED_KEY as string;
const iv = process.env.ENCRYPTION_FIXED_IV as string;

export const encrypter = (data: any): string | any => {
  if (process.env.ENCRYPTION !== 'true') return data;
  try {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } catch (err: any) {
    console.error('Encryption error:', err.message);
    return data;
  }
};

export const decrypter = (data: any): any | false => {
  if (process.env.ENCRYPTION !== 'true') return data;
  try {
    let encryptedStr = data?.reqData || data;
    if (!encryptedStr) return false;
    encryptedStr = encryptedStr?.toString().replace(/ /g, '+');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedStr, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (err: any) {
    console.error('Decryption error:', err.message);
    return false;
  }
};