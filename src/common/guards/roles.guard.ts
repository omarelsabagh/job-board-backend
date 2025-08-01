import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GENERAL_ERROR_MESSAGES } from '../helpers';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException(GENERAL_ERROR_MESSAGES.FORBIDDEN);
    }

    if (!requiredRoles.includes(user.role as string)) {
      throw new ForbiddenException(
        `Access denied: your role (${user.role}) is not allowed to perform this action.`,
      );
    }

    return true;
  }
}
