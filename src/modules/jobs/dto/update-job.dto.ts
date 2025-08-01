import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDTO } from './create-job.dto';
import { JobStatus } from '@prisma/client';

export class UpdateJobDTO extends PartialType(CreateJobDTO) {
  status?: JobStatus;
}
