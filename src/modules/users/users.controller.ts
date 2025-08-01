import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from '@prisma/client';
import { RegisterDTO } from './dto/register.dto';
import { PaginatedResponse } from 'src/common/dto';
import { Roles } from 'src/common/decorators';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersSwaggerExamples } from './swagger/users.swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
    example: 1,
  })
  @ApiResponse(UsersSwaggerExamples.userList)
  findAllSeekers(
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.findAllSeekers({ page });
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse(UsersSwaggerExamples.userCreated)
  @ApiResponse(UsersSwaggerExamples.validationError)
  create(@Body() data: RegisterDTO): Promise<Partial<User>> {
    return this.usersService.create({
      data,
    });
  }
}
