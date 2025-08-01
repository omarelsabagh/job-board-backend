import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password (minimum 6 characters)',
    example: 'password123',
    minLength: 6,
  })
  @MinLength(6)
  password: string;
}
