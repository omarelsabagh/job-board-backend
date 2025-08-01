import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  REJECTED = 'REJECTED',
}

export class UpdateApplicationStatusDTO {
  @ApiProperty({
    description: 'New application status',
    enum: ApplicationStatus,
    example: ApplicationStatus.REVIEWED,
  })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
