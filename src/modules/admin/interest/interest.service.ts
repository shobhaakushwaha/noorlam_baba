import { Injectable } from '@nestjs/common';
import { CreateInterestDto, GetInterestQueryDto } from './interest.dto';
import { Interest } from '../../../models/interest';
import { MESSAGE } from '../../../constant/admin.messages';
 import { FileUploadHelper } from '../../../helpers/fileUploadHelper';

@Injectable()
export class InterestService {
  // CREATE INTEREST
async createInterest1(dto: CreateInterestDto, file: Express.Multer.File) {
  try {
    const exists = await Interest.findOne({ name: dto.name });

    if (exists) {
      return {
        success: false,
        message: MESSAGE.INTEREST_EXISTS,
        data: null,
        statusCode: 422,
      };
    }

    const imagePath = file ? `/uploads/${file.filename}` : null;

    const interest = await Interest.create({
      ...dto,
      image: imagePath,
    });
      return {
        message: MESSAGE.INTEREST_EXISTS,
        data: {},
        statusCode: 422,
      };
  } catch (error) {
    console.error('Create Interest Error:', error);

    return {
      success: false,
      message:MESSAGE.INTERNAL_SERVER_ERROR,
      data: null,
      statusCode: 500,
    };
  }
}




async createInterest(dto: CreateInterestDto, file: Express.Multer.File) {
  try {
    const exists = await Interest.findOne({ name: dto.name });

    if (exists) {
      return {
      success: false,
        message: MESSAGE.INTEREST_EXISTS,
        data: null,
        statusCode: 422,
      };
    }

    let imageUrl = "";

    if (file) {
      const uploaded = await FileUploadHelper.upload(file, 'interest');
      imageUrl = uploaded.url; 
    }

    const interest = await Interest.create({
      ...dto,
      image: imageUrl,
    });

    return {
      message: MESSAGE.ADD_INTEREST_SUCCESS,
      data: interest,
      code: 200,
    };
  } catch (error) {
    console.error('Create Interest Error:', error);

    return {
      message: MESSAGE.INTERNAL_SERVER_ERROR,
      data: {},
      code: 500,
    };
  }
}


//All INTERESTS
  async getInterests(query: GetInterestQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    // 🔍 Search by name
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }

    // 🔄 Filter by status
    if (query.status !== undefined && query.status !== '') {
      filter.status = query.status === 'true';
    }

    const [data, total] = await Promise.all([
      Interest.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),

      Interest.countDocuments(filter),
    ]);

    return {
      success: true,
      message: MESSAGE.INTEREST_LIST,
      data: {
        list: data,
          total,},
      statusCode: 200,
    };
  }

  // DELETE INTEREST
  async deleteInterest(id: string) {
    const interest = await Interest.findByIdAndDelete(id);

    if (!interest) {
      return {
        success: false,
        message: MESSAGE.INTEREST_NOT_FOUND,
        data: null,
        statusCode: 404,
      };
    }

    return {
      success: true,
      message: MESSAGE.DELETE_INTEREST_SUCCESS,
      data: null,
      statusCode: 200,
    };
  }
}