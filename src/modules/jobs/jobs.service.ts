import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDTO } from './dto/create-job.dto';
import { Job, JobStatus, Prisma, UserRole } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateJobDTO } from './dto/update-job.dto';
import { GENERAL_ERROR_MESSAGES } from 'src/common/helpers';
import { PaginatedResponse } from 'src/common/dto/paginated-response.dto';
import { UserTokenData } from 'src/common/decorators/current-user.decorator';

@Injectable()
export class JobsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(id: string) {
    const job = await this.prismaService.job.findUnique({
      where: { id },
      include: {
        createdByUser: {
          select: { id: true, fullname: true, email: true },
        },
      },
    });

    if (!job) {
      throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);
    }

    return job;
  }

  public async findAll({
    location,
    status,
    page,
    user,
  }: {
    location?: string;
    status?: JobStatus;
    page: number;
    user: UserTokenData;
  }): Promise<PaginatedResponse<Job>> {
    const limit = 12;
    const filter: Prisma.JobWhereInput = {};
    if (user.role === UserRole.ADMIN) filter.createdById = user.sub;
    if (location) filter.location = { contains: location, mode: 'insensitive' };
    if (status) filter.status = status;

    const [jobs, total] = await this.prismaService.$transaction([
      this.prismaService.job.findMany({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.job.count({ where: filter }),
    ]);

    return {
      data: jobs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public async create({
    data,
    user,
  }: {
    data: CreateJobDTO;
    user: UserTokenData;
  }): Promise<Job> {
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }
    return this.prismaService.job.create({
      data: {
        ...data,
        updatedAt: null,
        createdByUser: { connect: { id: user.sub } },
      },
    });
  }

  public async update({
    id,
    data,
    userId,
  }: {
    id: string;
    data: UpdateJobDTO;
    userId: number;
  }) {
    const job = await this.prismaService.job.findUnique({ where: { id } });

    if (!job) {
      throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);
    }

    if (job.createdById !== userId) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }

    return this.prismaService.job.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  public async delete({ id, userId }: { id: string; userId: number }) {
    const job = await this.prismaService.job.findUnique({ where: { id } });

    if (!job) {
      throw new NotFoundException(GENERAL_ERROR_MESSAGES.NOT_FOUND);
    }

    if (job.createdById !== userId) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }

    await this.prismaService.job.delete({ where: { id } });
  }
}
