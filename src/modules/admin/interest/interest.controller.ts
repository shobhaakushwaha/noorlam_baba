import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { CreateInterestDto, GetInterestQueryDto } from './interest.dto';
import { InterestService } from './interest.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { NormalResponse } from '../../../helpers/responseHelper';

@Controller('admin/interest')
@UseGuards(AdminAuthGuard)
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  // ✅ CREATE INTEREST
  @Post('add')
  @UseInterceptors(FileInterceptor('image'))
  async createInterest(
    @Body() dto: CreateInterestDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const result = await this.interestService.createInterest(dto, file);

    return NormalResponse.send(
      res,
      result?.data || {},
      result?.message || 'Something went wrong',
      result?.statusCode || 500,
    );
  }

  // ✅ GET ALL INTERESTS
  @Get('list')
  async getAll(
    @Query() query: GetInterestQueryDto,
    @Res() res: Response,
  ) {
    const result = await this.interestService.getInterests(query);

    return NormalResponse.send(
      res,
      result?.data || {},
      result?.message || 'Something went wrong',
      result?.statusCode || 500,
    );
  }

  // ✅ DELETE INTEREST
  @Delete('delete/:id')
  async deleteInterest(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.interestService.deleteInterest(id);

    return NormalResponse.send(
      res,
      {},
      result?.message || 'Something went wrong',
      result?.statusCode || 500,
    );
  }
}