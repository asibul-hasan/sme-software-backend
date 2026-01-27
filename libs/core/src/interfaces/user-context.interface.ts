export interface IUserContext {
    id: number;
    email: string;
    company_id: number;
    designation_id: number;
    branch_ids: number[];
    is_active: boolean;
}