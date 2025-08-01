import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Application, UserRole } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards';
import { CreateApplicationDTO } from './dto/create-app.dto';
import { CurrentUser, UserTokenData } from 'src/common/decorators';
import { UpdateApplicationStatusDTO } from './dto/update-application-status.dto';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles(UserRole.ADMIN)
  @Get('job/:jobId')
  @UseGuards(RolesGuard)
  getAllByJob(
    @Param('jobId') jobId: string,
    @CurrentUser() user: UserTokenData,
  ): Promise<Application[]> {
    return this.applicationsService.findAllByJob({ jobId, userId: user.sub });
  }

  @Get(':id')
  async getApplicationById(
    @Param('id', ParseIntPipe)
    id: number,
    @CurrentUser() user: UserTokenData,
  ) {
    return this.applicationsService.getById(id, user);
  }

  @Roles(UserRole.JOBSEEKER)
  @Get('my')
  @UseGuards(RolesGuard)
  getAllByUser(@CurrentUser() user: UserTokenData) {
    return this.applicationsService.findAllByUser(user.sub);
  }

  @Roles(UserRole.JOBSEEKER)
  @Post()
  @UseGuards(RolesGuard)
  create(
    @Body() data: CreateApplicationDTO,
    @CurrentUser() user: UserTokenData,
  ): Promise<Application> {
    return this.applicationsService.create({ data, user });
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  async updateStatus(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() data: UpdateApplicationStatusDTO,
  ) {
    return this.applicationsService.updateStatus(id, data.status);
  }
}
