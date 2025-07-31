import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
})
export class AppModule {}
