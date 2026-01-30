import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Company } from '@kormo-erp/database';

@Injectable()
export class CompanyRepository extends Repository<Company> {
    constructor(private dataSource: DataSource) {
        super(Company, dataSource.createEntityManager());
    }
}
