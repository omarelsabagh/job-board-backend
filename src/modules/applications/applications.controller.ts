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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ApplicationsSwaggerExamples } from './swagger/applications.swagger';

@ApiTags('Applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Roles(UserRole.ADMIN)
  @Get('job/:jobId')
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Get all applications for a specific job (Admin only)',
  })
  @ApiParam({
    name: 'jobId',
    description: 'Job ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse(ApplicationsSwaggerExamples.applicationList)
  getAllByJob(
    @Param('jobId') jobId: string,
    @CurrentUser() user: UserTokenData,
  ): Promise<Application[]> {
    return this.applicationsService.findAllByJob({ jobId, userId: user.sub });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific application by ID' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: 1,
  })
  @ApiResponse(ApplicationsSwaggerExamples.singleApplication)
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
  @ApiOperation({
    summary: 'Get all applications for the current user (Job Seeker only)',
  })
  @ApiResponse(ApplicationsSwaggerExamples.userApplications)
  getAllByUser(@CurrentUser() user: UserTokenData) {
    return this.applicationsService.findAllByUser(user.sub);
  }

  @Roles(UserRole.JOBSEEKER)
  @Post()
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new job application (Job Seeker only)' })
  @ApiResponse(ApplicationsSwaggerExamples.applicationCreated)
  create(
    @Body() data: CreateApplicationDTO,
    @CurrentUser() user: UserTokenData,
  ): Promise<Application> {
    return this.applicationsService.create({ data, user });
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update application status (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'Application ID',
    example: 1,
  })
  @ApiResponse(ApplicationsSwaggerExamples.statusUpdated)
  async updateStatus(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() data: UpdateApplicationStatusDTO,
  ) {
    return this.applicationsService.updateStatus(id, data.status);
  }
}
