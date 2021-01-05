import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (field) {
      try {
        return request.user[field];
      } catch {}
    }
    return request.user;
  },
);
