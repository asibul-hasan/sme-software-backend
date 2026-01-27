import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '@kormo-erp/database';
import { SubscriptionStatus } from '@kormo-erp/core';

@Injectable()
export class SubscriptionGuard implements CanActivate {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.company_id) {
            return true; // Let auth guard handle this
        }

        const company = await this.companyRepository.findOne({
            where: { id: user.company_id },
        });

        if (!company) {
            throw new ForbiddenException('Company not found');
        }

        // Check if company is suspended
        if (company.status === SubscriptionStatus.SUSPENDED) {
            throw new ForbiddenException('Your account has been suspended. Please contact support.');
        }

        // Check if company is not active
        if (!company.is_active) {
            throw new ForbiddenException('Your account is inactive. Please contact support.');
        }

        // Check subscription expiry
        const today = new Date();
        const expiryDate = new Date(company.subscription_expiry);
        const gracePeriodEnd = new Date(expiryDate);
        gracePeriodEnd.setDate(gracePeriodEnd.getDate() + company.grace_period_days);

        if (today > expiryDate && today <= gracePeriodEnd) {
            // In grace period - allow but attach warning
            request.subscriptionWarning = {
                status: 'GRACE_PERIOD',
                expiryDate: expiryDate,
                daysRemaining: Math.ceil((gracePeriodEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
            };
            return true;
        }

        if (today > gracePeriodEnd) {
            throw new ForbiddenException('Your subscription has expired. Please renew to continue.');
        }

        return true;
    }
}