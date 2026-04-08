import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateInterestDto, GetInterestQueryDto } from './interest.dto';
import { InterestService } from './interest.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';

@Controller('admin/interest')
@UseGuards(AdminAuthGuard) // ← apply to all routes at once
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post('add')
  async create(@Body() dto: CreateInterestDto) {
    return this.interestService.createInterest(dto);
  }

  @Get('list')
  async getAll(@Query() query: GetInterestQueryDto) {
    return this.interestService.getInterests(query);
  }

  @Delete('delete/:id')       // ← route param :id
  async deleteInterest(@Param('id') id: string) {  // ← @Param not @Query
    return this.interestService.deleteInterest(id);
  }
}