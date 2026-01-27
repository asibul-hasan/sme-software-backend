import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BranchIds = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): number[] => {
        const request = ctx.switchToHttp().getRequest();
        return request.user?.branch_ids || [];
    },
);