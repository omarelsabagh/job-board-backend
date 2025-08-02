import { Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async login({ data }: { data: LoginDTO }): Promise<string> {
    const user = await this.usersService.findWithCredentials({
      email: data.email,
      password: data.password,
    });

    const payload = { sub: user.id, role: user.role, fullname: user.fullname };

    const accessToken: string = await this.jwt.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRE'),
    });
    return accessToken;
  }
}
