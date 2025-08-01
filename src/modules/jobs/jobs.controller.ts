import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job, JobStatus, UserRole } from '@prisma/client';
import { CreateJobDTO } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import {
  CurrentUser,
  UserTokenData,
} from 'src/common/decorators/current-user.decorator';
import { UpdateJobDTO } from './dto/update-job.dto';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';

@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get(':id')
  find(@Param('id') id: string): Promise<Job> {
    return this.jobsService.findOne(id);
  }

  @Get()
  findAll(
    @Query('location') location?: string,
    @Query('status') status?: JobStatus,
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<PaginatedResponse<Job>> {
    return this.jobsService.findAll({ location, status, page });
  }

  @Roles(UserRole.ADMIN)
  @Post()
  @UseGuards(RolesGuard)
  async create(
    @CurrentUser() user: UserTokenData,
    @Body() data: CreateJobDTO,
  ): Promise<Job> {
    return this.jobsService.create({
      data,
      user,
    });
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @CurrentUser() user: UserTokenData,
    @Param('id') id: string,
    @Body()
    data: UpdateJobDTO,
  ): Promise<Partial<Job>> {
    return this.jobsService.update({
      data,
      userId: user.sub,
      id,
    });
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@CurrentUser() user: UserTokenData, @Param('id') id: string) {
    await this.jobsService.delete({
      userId: user.sub,
      id,
    });
  }
}
