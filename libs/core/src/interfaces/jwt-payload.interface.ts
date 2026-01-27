export interface IJwtPayload {
    sub: number; // user id
    email: string;
    company_id: number;
    designation_id: number;
    branch_ids: number[];
}