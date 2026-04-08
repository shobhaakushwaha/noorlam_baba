import { Injectable } from '@nestjs/common';
import { CreateInterestDto, GetInterestQueryDto } from './interest.dto';
import { Interest } from '../../../models/interest';

@Injectable()
export class InterestService {

  async createInterest(body: CreateInterestDto) {
    const exists = await Interest.findOne({ name: body.name });
    if (exists) {
      return { success: false, message: 'Interest already exists', statusCode: 422 };
    }
    const interest = await Interest.create(body);
    return { success: true, message: 'Interest added successfully', data: interest, statusCode: 200 };
  }

  async getInterests(query: GetInterestQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter: any = {};

    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }
    if (query.status !== undefined && query.status !== '') {
      filter.status = query.status === 'true';
    }

    const [data, total] = await Promise.all([
      Interest.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Interest.countDocuments(filter),
    ]);

    return {
      success: true,
      message: 'Interests retrieved successfully',
      data,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
      statusCode: 200,
    };
  }

  async deleteInterest(id: string) {  // ← renamed to match controller
    const interest = await Interest.findByIdAndDelete(id);
    if (!interest) {
      return { success: false, message: 'Interest not found', statusCode: 404 };
    }
    return { success: true, message: 'Interest deleted successfully', statusCode: 200 };
  }
}