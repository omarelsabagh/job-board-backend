import { IsString, IsUUID } from 'class-validator';

export class CreateApplicationDTO {
  @IsUUID()
  jobId: string;

  @IsString()
  resumeText: string;

  @IsString()
  coverLetter: string;
}
