import { IsEnum } from 'class-validator';

export enum ApplicationStatus {
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  REJECTED = 'REJECTED',
}

export class UpdateApplicationStatusDTO {
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
