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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(UserRole.ADMIN)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllSeekers(
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<PaginatedResponse<User>> {
    return this.usersService.findAllSeekers({ page });
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  create(@Body() data: RegisterDTO): Promise<Partial<User>> {
    return this.usersService.create({
      data,
    });
  }
}
