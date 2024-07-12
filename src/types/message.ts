export interface EmailTemplateType {
    id: number;
    name: string;
    message: string;
    deletedAt?: null;
    createdAt: string;
    updatedAt: string;
    target_audience: TargetAudience;
  }
  export interface TargetAudience {
    id: number;
    name: string;
  }
  