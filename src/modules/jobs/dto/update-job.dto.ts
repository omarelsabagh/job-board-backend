import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDTO } from './create-job.dto';
import { JobStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDTO extends PartialType(CreateJobDTO) {
  @ApiProperty({
    description: 'Job status',
    enum: JobStatus,
    example: JobStatus.OPEN,
    required: false,
  })
  status?: JobStatus;
}
