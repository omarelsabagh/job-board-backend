import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateApplicationDTO } from './dto/create-app.dto';
import { UserTokenData } from 'src/common/decorators';
import { Application, UserRole } from '@prisma/client';
import {
  BAD_REQUEST_MESSAGES,
  GENERAL_ERROR_MESSAGES,
} from 'src/common/helpers';
import { ApplicationStatus } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getById(id: number, user: UserTokenData) {
    const application = await this.prismaService.application.findUnique({
      where: { id },
      include: { job: true },
    });

    if (!application) {
      throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);
    }

    // Only job seeker who submitted OR admin can view
    const isOwner = application.userId === user.sub;
    const isAdmin = user.role === UserRole.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }

    return application;
  }

  public async findAllByJob({
    jobId,
    userId,
  }: {
    jobId: string;
    userId: number;
  }): Promise<Application[]> {
    return this.prismaService.application.findMany({
      where: {
        jobId,
        job: {
          createdById: userId,
        },
      },
      include: {
        user: {
          select: { id: true, fullname: true, email: true },
        },
      },
    });
  }

  public async findAllByUser(userId: number) {
    return this.prismaService.application.findMany({
      where: { userId },
      include: {
        job: {
          select: { id: true, title: true, status: true },
        },
      },
    });
  }

  public async create({
    data: { jobId, ...data },
    user,
  }: {
    data: CreateApplicationDTO;
    user: UserTokenData;
  }): Promise<Application> {
    if (user.role !== UserRole.JOBSEEKER) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }

    const job = await this.prismaService.job.findUnique({
      where: { id: jobId },
    });
    if (!job) throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);

    const existing = await this.prismaService.application.findFirst({
      where: { jobId: jobId, userId: user.sub },
    });
    if (existing)
      throw new BadRequestException(BAD_REQUEST_MESSAGES.ALREADY_EXIST);

    return this.prismaService.application.create({
      data: {
        ...data,
        jobId,
        userId: user.sub,
      },
    });
  }

  public async updateStatus(id: number, status: ApplicationStatus) {
    const application = await this.prismaService.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);
    }

    return this.prismaService.application.update({
      where: { id },
      data: { status },
    });
  }
}
