import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (field) {
      let property: string;
      try {
        property = request.user[field];
      } catch {}
      return property;
    }
    return request.user;
  },
);
