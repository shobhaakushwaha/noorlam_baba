import path from 'path';
import AWS from 'aws-sdk';
import mime from 'mime-types';

// Env variables
const {
  AWS_ACCESS_KEY: ACCESS_KEY,
  AWS_SECRET_KEY: SECRET_KEY,
  AWS_BUCKET_REGION: BUCKET_REGION,
  AWS_BUCKET_NAME: BUCKET_NAME,
  AWS_BASE_PATH = 'ChatAstro_App',
} = process.env;

// Configure AWS
AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: BUCKET_REGION,
});

const s3 = new AWS.S3();

// File type (you can adjust based on your upload middleware)
interface UploadFile {
  name: string;
  data: Buffer;
  mimetype: string;
}

// Upload function
const uploadToS3 = async (
  file: UploadFile,
  folderPath: string
): Promise<AWS.S3.ManagedUpload.SendData> => {
  if (!file || !file.data) {
    throw new Error('No file data provided');
  }

  const extension =
    path.extname(file.name) ||
    `.${mime.extension(file.mimetype) || 'bin'}`;

  const key = `${AWS_BASE_PATH}/${folderPath}/${Date.now()}${extension}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: BUCKET_NAME as string,
    Key: key,
    Body: file.data,
    ContentType: file.mimetype,
  };

  return await s3.upload(params).promise();
};

// Get file type
const getFileType = (originalname: string = ''): 'image' | 'video' | null => {
  const ext = path.extname(originalname).toLowerCase();

  if (['.jpg', '.jpeg', '.png'].includes(ext)) return 'image';
  if (ext === '.mp4') return 'video';

  return null;
};

export { uploadToS3, getFileType };