import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '@kormo-erp/database';
import { IJwtPayload, IUserContext } from '@kormo-erp/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'default-secret',
        });
    }

    async validate(payload: IJwtPayload): Promise<IUserContext> {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub, is_active: true, deleted_at: IsNull() },
        });

        if (!user) {
            throw new UnauthorizedException('User not found or inactive');
        }

        return {
            id: user.id,
            email: user.email,
            company_id: user.company_id,
            designation_id: user.designation_id,
            branch_ids: user.branch_ids,
            is_active: user.is_active,
        };
    }
}