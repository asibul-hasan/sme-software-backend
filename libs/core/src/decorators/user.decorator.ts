import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserContext } from '../interfaces/user-context.interface';

export const CurrentUser = createParamDecorator(
    (data: keyof IUserContext, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user;
    },
);