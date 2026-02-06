# KormoErp Project Structure

## Directory Layout


```
kormo-erp/
├── apps/
│   ├── api-main/                          # SME ERP API (PRIMARY FOCUS)
│   │   ├── src/
│   │   │   ├── main.ts
│   │   │   ├── app.module.ts
│   │   │   │
│   │   │   ├── modules/
│   │   │   │   │
│   │   │   │   ├── core/                  # Foundation (Non-removable)
│   │   │   │   │   ├── company/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── company.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-company.dto.ts
│   │   │   │   │   │   │   └── update-company.dto.ts
│   │   │   │   │   │   ├── company.controller.ts
│   │   │   │   │   │   ├── company.service.ts
│   │   │   │   │   │   ├── company.repository.ts
│   │   │   │   │   │   └── company.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── branch/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── branch.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-branch.dto.ts
│   │   │   │   │   │   │   └── update-branch.dto.ts
│   │   │   │   │   │   ├── branch.controller.ts
│   │   │   │   │   │   ├── branch.service.ts
│   │   │   │   │   │   ├── branch.repository.ts
│   │   │   │   │   │   └── branch.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── user/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── user.entity.ts
│   │   │   │   │   │   │   └── user-branch.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   │   │   ├── update-user.dto.ts
│   │   │   │   │   │   │   └── assign-branch.dto.ts
│   │   │   │   │   │   ├── user.controller.ts
│   │   │   │   │   │   ├── user.service.ts
│   │   │   │   │   │   ├── user.repository.ts
│   │   │   │   │   │   └── user.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   │   │   └── refresh-token.dto.ts
│   │   │   │   │   │   ├── strategies/
│   │   │   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   │   │   └── local.strategy.ts
│   │   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   │   └── auth.module.ts
│   │   │   │   │   │
│   │   │   │   │   └── core.module.ts
│   │   │   │   │
│   │   │   │   ├── settings/              # System Configuration
│   │   │   │   │   ├── designation/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── designation.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-designation.dto.ts
│   │   │   │   │   │   │   └── update-designation.dto.ts
│   │   │   │   │   │   ├── designation.controller.ts
│   │   │   │   │   │   ├── designation.service.ts
│   │   │   │   │   │   ├── designation.repository.ts
│   │   │   │   │   │   └── designation.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── permission/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── permission.entity.ts
│   │   │   │   │   │   │   └── designation-permission.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   └── assign-permission.dto.ts
│   │   │   │   │   │   ├── config/
│   │   │   │   │   │   │   └── permissions.config.ts    # HARDCODED (temporary)
│   │   │   │   │   │   ├── permission.controller.ts
│   │   │   │   │   │   ├── permission.service.ts
│   │   │   │   │   │   ├── permission.repository.ts
│   │   │   │   │   │   └── permission.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── form/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── form.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-form.dto.ts
│   │   │   │   │   │   │   └── update-form.dto.ts
│   │   │   │   │   │   ├── form.controller.ts
│   │   │   │   │   │   ├── form.service.ts
│   │   │   │   │   │   ├── form.repository.ts
│   │   │   │   │   │   └── form.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── approval/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── approval-rule.entity.ts
│   │   │   │   │   │   │   └── approval-history.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-approval-rule.dto.ts
│   │   │   │   │   │   │   └── approve.dto.ts
│   │   │   │   │   │   ├── approval.controller.ts
│   │   │   │   │   │   ├── approval.service.ts
│   │   │   │   │   │   ├── approval.repository.ts
│   │   │   │   │   │   └── approval.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── module-toggle/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── company-module.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   └── toggle-module.dto.ts
│   │   │   │   │   │   ├── module-toggle.controller.ts
│   │   │   │   │   │   ├── module-toggle.service.ts
│   │   │   │   │   │   ├── module-toggle.repository.ts
│   │   │   │   │   │   └── module-toggle.module.ts
│   │   │   │   │   │
│   │   │   │   │   └── settings.module.ts
│   │   │   │   │
│   │   │   │   ├── hr/                    # Human Resources (Operations)
│   │   │   │   │   ├── employee/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── employee.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── sql-state.dto.ts
│   │   │   │   │   │   │   ├── create-employee.dto.ts
│   │   │   │   │   │   │   ├── update-employee.dto.ts
│   │   │   │   │   │   │   └── list-employee.dto.ts
│   │   │   │   │   │   ├── employee.controller.ts
│   │   │   │   │   │   ├── employee.service.ts
│   │   │   │   │   │   ├── employee.repository.ts
│   │   │   │   │   │   └── employee.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── attendance/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── attendance.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── attendance.controller.ts
│   │   │   │   │   │   ├── attendance.service.ts
│   │   │   │   │   │   └── attendance.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── leave/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── leave.entity.ts
│   │   │   │   │   │   │   └── leave-type.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── leave.controller.ts
│   │   │   │   │   │   ├── leave.service.ts
│   │   │   │   │   │   └── leave.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── payroll/              # Future
│   │   │   │   │   │   └── (structure similar to above)
│   │   │   │   │   │
│   │   │   │   │   └── hr.module.ts
│   │   │   │   │
│   │   │   │   ├── inventory/             # Inventory Management
│   │   │   │   │   ├── product/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── product.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── sql-state.dto.ts
│   │   │   │   │   │   │   ├── create-product.dto.ts
│   │   │   │   │   │   │   ├── update-product.dto.ts
│   │   │   │   │   │   │   └── list-product.dto.ts
│   │   │   │   │   │   ├── product.controller.ts
│   │   │   │   │   │   ├── product.service.ts
│   │   │   │   │   │   ├── product.repository.ts
│   │   │   │   │   │   └── product.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── category/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── category.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── category.controller.ts
│   │   │   │   │   │   ├── category.service.ts
│   │   │   │   │   │   └── category.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── stock/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── stock.entity.ts
│   │   │   │   │   │   │   └── stock-log.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── adjust-stock.dto.ts
│   │   │   │   │   │   │   └── transfer-stock.dto.ts
│   │   │   │   │   │   ├── stock.controller.ts
│   │   │   │   │   │   ├── stock.service.ts
│   │   │   │   │   │   └── stock.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── warehouse/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── warehouse.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── warehouse.controller.ts
│   │   │   │   │   │   ├── warehouse.service.ts
│   │   │   │   │   │   └── warehouse.module.ts
│   │   │   │   │   │
│   │   │   │   │   └── inventory.module.ts
│   │   │   │   │
│   │   │   │   ├── sales/                 # Sales & POS
│   │   │   │   │   ├── pos/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   ├── sale.entity.ts
│   │   │   │   │   │   │   └── sale-item.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   ├── create-sale.dto.ts
│   │   │   │   │   │   │   └── sale-item.dto.ts
│   │   │   │   │   │   ├── pos.controller.ts
│   │   │   │   │   │   ├── pos.service.ts
│   │   │   │   │   │   └── pos.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── invoice/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── invoice.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── invoice.controller.ts
│   │   │   │   │   │   ├── invoice.service.ts
│   │   │   │   │   │   └── invoice.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── payment/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── payment.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   │   └── create-payment.dto.ts
│   │   │   │   │   │   ├── payment.controller.ts
│   │   │   │   │   │   ├── payment.service.ts
│   │   │   │   │   │   └── payment.module.ts
│   │   │   │   │   │
│   │   │   │   │   ├── customer/
│   │   │   │   │   │   ├── entities/
│   │   │   │   │   │   │   └── customer.entity.ts
│   │   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── customer.controller.ts
│   │   │   │   │   │   ├── customer.service.ts
│   │   │   │   │   │   └── customer.module.ts
│   │   │   │   │   │
│   │   │   │   │   └── sales.module.ts
│   │   │   │   │
│   │   │   │   ├── reports/               # Reporting
│   │   │   │   │   ├── dto/
│   │   │   │   │   │   ├── sales-report.dto.ts
│   │   │   │   │   │   ├── inventory-report.dto.ts
│   │   │   │   │   │   └── employee-report.dto.ts
│   │   │   │   │   ├── reports.controller.ts
│   │   │   │   │   ├── reports.service.ts
│   │   │   │   │   └── reports.module.ts
│   │   │   │   │
│   │   │   │   ├── dashboard/             # Dashboard
│   │   │   │   │   ├── dashboard.controller.ts
│   │   │   │   │   ├── dashboard.service.ts
│   │   │   │   │   └── dashboard.module.ts
│   │   │   │   │
│   │   │   │   └── accounting/            # Future Module
│   │   │   │       └── (structure similar to above)
│   │   │   │
│   │   │   ├── common/                    # Shared Infrastructure
│   │   │   │   ├── base/
│   │   │   │   │   ├── base.controller.ts
│   │   │   │   │   ├── base.service.ts
│   │   │   │   │   ├── base.repository.ts
│   │   │   │   │   └── sql-state.controller.ts
│   │   │   │   │
│   │   │   │   ├── guards/
│   │   │   │   │   ├── auth.guard.ts
│   │   │   │   │   ├── subscription.guard.ts
│   │   │   │   │   ├── permission.guard.ts
│   │   │   │   │   ├── module.guard.ts
│   │   │   │   │   └── branch.guard.ts
│   │   │   │   │
│   │   │   │   ├── decorators/
│   │   │   │   │   ├── user.decorator.ts
│   │   │   │   │   ├── permission.decorator.ts
│   │   │   │   │   ├── branch.decorator.ts
│   │   │   │   │   ├── company.decorator.ts
│   │   │   │   │   └── public.decorator.ts
│   │   │   │   │
│   │   │   │   ├── interceptors/
│   │   │   │   │   ├── branch-context.interceptor.ts
│   │   │   │   │   ├── transform.interceptor.ts
│   │   │   │   │   └── audit.interceptor.ts
│   │   │   │   │
│   │   │   │   ├── filters/
│   │   │   │   │   ├── http-exception.filter.ts
│   │   │   │   │   ├── subscription-expired.filter.ts
│   │   │   │   │   └── all-exceptions.filter.ts
│   │   │   │   │
│   │   │   │   ├── pipes/
│   │   │   │   │   ├── validation.pipe.ts
│   │   │   │   │   └── sql-state.pipe.ts
│   │   │   │   │
│   │   │   │   ├── dto/
│   │   │   │   │   ├── pagination.dto.ts
│   │   │   │   │   ├── sql-state-base.dto.ts
│   │   │   │   │   └── response.dto.ts
│   │   │   │   │
│   │   │   │   ├── enums/
│   │   │   │   │   ├── module.enum.ts
│   │   │   │   │   ├── form.enum.ts
│   │   │   │   │   ├── action.enum.ts
│   │   │   │   │   ├── status.enum.ts
│   │   │   │   │   └── permission.enum.ts
│   │   │   │   │
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── user-context.interface.ts
│   │   │   │   │   ├── jwt-payload.interface.ts
│   │   │   │   │   └── module-permission.interface.ts
│   │   │   │   │
│   │   │   │   └── utils/
│   │   │   │       ├── hash.util.ts
│   │   │   │       ├── date.util.ts
│   │   │   │       └── query.util.ts
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── database.config.ts
│   │   │   │   ├── jwt.config.ts
│   │   │   │   ├── app.config.ts
│   │   │   │   └── validation.config.ts
│   │   │   │
│   │   │   └── migrations/
│   │   │       └── (TypeORM migrations)
│   │   │
│   │   ├── test/
│   │   │   ├── app.e2e-spec.ts
│   │   │   └── jest-e2e.json
│   │   │
│   │   ├── .env
│   │   ├── .env.example
│   │   ├── project.json
│   │   └── tsconfig.app.json
│   │
│   ├── api-support/                       # InfoAidTech Admin (Future)
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       └── (minimal structure for now)
│   │
│   └── worker/                            # Background Jobs (Future)
│       └── src/
│           ├── main.ts
│           ├── app.module.ts
│           └── (minimal structure for now)
│
├── libs/                                  # Shared Libraries
│   ├── database/
│   │   ├── src/
│   │   │   ├── database.module.ts
│   │   │   ├── database.config.ts
│   │   │   ├── entities/
│   │   │   │   └── index.ts              # Export all entities
│   │   │   ├── repositories/
│   │   │   │   └── base.repository.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   │
│   ├── auth/
│   │   ├── src/
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── permission.guard.ts
│   │   │   ├── decorators/
│   │   │   │   └── permission.decorator.ts
│   │   │   ├── interfaces/
│   │   │   │   └── jwt-payload.interface.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   │
│   ├── subscription/
│   │   ├── src/
│   │   │   ├── subscription.module.ts
│   │   │   ├── guards/
│   │   │   │   └── subscription.guard.ts
│   │   │   ├── services/
│   │   │   │   ├── subscription.service.ts
│   │   │   │   └── grace-period.service.ts
│   │   │   ├── entities/
│   │   │   │   ├── subscription.entity.ts
│   │   │   │   └── subscription-log.entity.ts
│   │   │   ├── enums/
│   │   │   │   └── subscription-status.enum.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   │
│   ├── audit/
│   │   ├── src/
│   │   │   ├── audit.module.ts
│   │   │   ├── services/
│   │   │   │   └── audit.service.ts
│   │   │   ├── entities/
│   │   │   │   ├── audit-log.entity.ts
│   │   │   │   ├── action-log.entity.ts
│   │   │   │   └── login-log.entity.ts
│   │   │   ├── interceptors/
│   │   │   │   └── audit.interceptor.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   │
│   ├── notifications/
│   │   ├── src/
│   │   │   ├── notifications.module.ts
│   │   │   ├── services/
│   │   │   │   ├── sms.service.ts
│   │   │   │   ├── email.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── templates/
│   │   │   │   ├── sms/
│   │   │   │   └── email/
│   │   │   ├── interfaces/
│   │   │   │   └── notification.interface.ts
│   │   │   └── index.ts
│   │   ├── project.json
│   │   └── tsconfig.lib.json
│   │
│   └── core/
│       ├── src/
│       │   ├── constants/
│       │   │   ├── modules.constant.ts
│       │   │   ├── forms.constant.ts
│       │   │   └── permissions.constant.ts
│       │   ├── utils/
│       │   │   ├── branch-context.util.ts
│       │   │   ├── sql-state.util.ts
│       │   │   └── date.util.ts
│       │   ├── interfaces/
│       │   │   ├── user-context.interface.ts
│       │   │   └── module-permission.interface.ts
│       │   └── index.ts
│       ├── project.json
│       └── tsconfig.lib.json
```
