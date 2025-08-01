import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDTO {
  @ApiProperty({
    description: 'Job title',
    example: 'Software Engineer',
  })
  title: string;

  @ApiProperty({
    description: 'Job description',
    example: 'We are looking for a skilled software engineer...',
  })
  description: string;

  @ApiProperty({
    description: 'Job location',
    example: 'New York, NY',
  })
  location: string;

  @ApiProperty({
    description: 'Job salary in USD',
    example: 80000,
  })
  salary: number;
}
