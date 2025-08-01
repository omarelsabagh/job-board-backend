import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthSwaggerExamples } from './swagger/auth.swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse(AuthSwaggerExamples.loginSuccess)
  @ApiResponse(AuthSwaggerExamples.loginError)
  async login(
    @Body() data: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login({ data });

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse(AuthSwaggerExamples.logoutSuccess)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}
