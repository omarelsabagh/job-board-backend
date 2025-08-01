import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { RegisterDTO } from './dto/register.dto';
import { PrismaService } from 'src/database/prisma.service';
import { comparePassword, hashPassword } from 'src/common/helpers';
import { AUTH_ERROR_MESSAGES } from 'src/common/helpers';
import { LoginDTO } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findWithCredentials({
    email,
    password,
  }: LoginDTO): Promise<{ id: number; role: UserRole }> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user)
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);

    const passwordMatches = await comparePassword({
      password,
      userPassword: user.password,
    });

    if (!passwordMatches)
      throw new UnauthorizedException(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);

    return {
      id: user.id,
      role: user.role,
    };
  }

  public async create({
    data: { password, ...data },
  }: {
    data: RegisterDTO;
  }): Promise<Partial<User>> {
    //hash password
    const hashedPassword = await hashPassword(password);

    const user = await this.prismaService.user.create({
      data: {
        ...data,
        role: UserRole.JOBSEEKER,
        password: hashedPassword,
        updatedAt: null,
      },
    });

    return {
      fullname: user.fullname,
      role: user.role,
      email: user.email,
    };
  }
}
