import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDTO {
  @ApiProperty({
    description: 'Job ID to apply for',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  jobId: string;

  @ApiProperty({
    description: 'Resume text content',
    example:
      'Experienced software engineer with 5+ years in web development...',
  })
  @IsString()
  resumeText: string;

  @ApiProperty({
    description: 'Cover letter content',
    example: 'I am excited to apply for this position...',
  })
  @IsString()
  coverLetter: string;
}
