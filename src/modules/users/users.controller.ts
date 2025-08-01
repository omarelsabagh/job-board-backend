import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { RegisterDTO } from './dto/register.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  create(@Body() data: RegisterDTO): Promise<Partial<User>> {
    return this.usersService.create({
      data,
    });
  }
}
