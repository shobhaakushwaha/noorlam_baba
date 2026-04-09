import { Injectable } from '@nestjs/common';
import { CreateInterestDto, GetInterestQueryDto } from './interest.dto';
import { Interest } from '../../../models/interest';
import { MESSAGE } from '../../../constant/admin.messages';

@Injectable()
export class InterestService {
  // ✅ CREATE INTEREST
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

    const imagePath = file ? `/uploads/${file.filename}` : null;

    const interest = await Interest.create({
      ...dto,
      image: imagePath,
    });

    return {
      success: true,
      message: MESSAGE.ADD_INTEREST_SUCCESS,
      data: interest,
      statusCode: 200,
    };
  } catch (error) {
    console.error('Create Interest Error:', error);

    return {
      success: false,
      message: 'Something went wrong',
      data: null,
      statusCode: 500,
    };
  }
}
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

  // ✅ DELETE INTEREST
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
      message: 'Interest deleted successfully',
      data: null,
      statusCode: 200,
    };
  }
}