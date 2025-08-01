import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '@prisma/client';

export interface UserTokenData {
  sub: number;
  role: UserRole;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserTokenData => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
