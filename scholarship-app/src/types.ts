export interface ScholarshipFormData {
    title: string;
    description: string;
    amount: number;
    deadline: string; // ISO format
    eligibility_criteria: Record<string, string>;
    details: Record<string, string>;
    provider: string;
}