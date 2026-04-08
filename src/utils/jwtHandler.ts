import jwt, { SignOptions } from 'jsonwebtoken';
import CONFIG from '../constant/index';

// Define User type
interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  deviceType?: string;
}

// Define Payload type
interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  deviceType: string;
}

const generateJwtToken = (user: User): string => {
  if (!user || !user._id) {
    throw new Error('Invalid user data for token generation.');
  }

  const payload: JwtPayload = {
    id: user._id,
    name: user.name || '',
    email: user.email,
    role: user.role || 'user',
    deviceType: user.deviceType || '',
  };

  const options: SignOptions = {
    expiresIn: `${CONFIG.JWT_EXPIRE}d`,
  };

  return jwt.sign(payload, CONFIG.JWT_SECRET, options);
};

export default generateJwtToken;