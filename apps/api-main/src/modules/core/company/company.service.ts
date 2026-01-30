import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepository: CompanyRepository) { }
}
