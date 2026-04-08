import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI as string,
  IS_PRODUCTION: process.env.IsProduction === "true",
  ENCRYPTION_ENABLED: process.env.ENCRYPTION === "true",
  ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM as string,
  ENCRYPTION_KEY: process.env.ENCRYPTION_FIXED_KEY as string,
  ENCRYPTION_IV: process.env.ENCRYPTION_FIXED_IV as string,

  JWT_SECRET: process.env.JWT_SECRET as string,
  MASTER_OTP: process.env.MASTER_OTP as string,

  ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
  SECRET_KEY: process.env.AWS_SECRET_KEY as string,
  BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  DB_SERVER: process.env.DB_SERVER ,
  DB_PORT: process.env.DB_PORT ,
  DB_NAME: process.env.DB_NAME ,

  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_AUTH: process.env.DB_AUTH === "true",

  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: Number(process.env.SMTP_PORT) || 587,
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
};

// Validate required values
const required = [
  "DB_SERVER",
  "DB_NAME",
  "DB_PORT",
  "ENCRYPTION_ALGORITHM",
  "ENCRYPTION_KEY",
  "ENCRYPTION_IV",
  "JWT_SECRET",
];

required.forEach((key) => {
  if (!ENV[key as keyof typeof ENV]) {
    throw new Error(`Missing env variable: ${key}`);
  }
});
