import { S3 } from 'aws-sdk';
import * as mime from 'mime-types';
import * as path from 'path';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export class FileUploadHelper {
  static async upload(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ key: string; url: string }> {
    // ✅ Guard: catch missing env vars early with clear messages
      console.log(process.env,"************************")
    if (!process.env.BUCKET_NAME) {
      throw new Error('Missing env variable: BUCKET_NAME');
    }
    if (!process.env.AWS_BASE_PATH) {
      throw new Error('Missing env variable: AWS_BASE_PATH');
    }

    try {
      const extension =
        path.extname(file.originalname) ||
        `.${mime.extension(file.mimetype)}`;

      const params: S3.PutObjectRequest = {
        Bucket: process.env.BUCKET_NAME,                          // ✅ guarded above
        Key: `${process.env.AWS_BASE_PATH}/${folder}/${Date.now()}${extension}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const uploadResult = await s3.upload(params).promise();

      return {
        key: uploadResult.Key,
        url: uploadResult.Location,
      };
    } catch (error) {
      console.error('AWS Upload Error:', error);
      throw error;
    }
  }

  static getFileType(originalname: string = ''): string {
    return path.extname(originalname).replace('.', '');
  }
}