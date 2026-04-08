import mongoose from "mongoose";
import { ENV } from "./env";

const buildMongoURI = (): string => {
  const {
    DB_SERVER,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_AUTH,
  } = ENV;

  if (DB_AUTH) {
    return `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_SERVER}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`;
  }

  return `mongodb://${DB_SERVER}:${DB_PORT}/${DB_NAME}`;
};

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = buildMongoURI();

    await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${mongoUri}`);

  } catch (error: any) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
