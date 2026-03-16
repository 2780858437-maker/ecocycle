
export enum UserRole {
  SUPPLIER = 'SUPPLIER', // 回收站长
  BUYER = 'BUYER',       // 企业采购
  DESIGNER = 'DESIGNER', // 设计师
  NONE = 'NONE'          // 未登录
}

export interface TraceabilityStep {
  date: string;
  action: string;
  location: string;
  operator: string;
  description: string;
}

export interface MaterialInfo {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  origin: string;
  qualityGrade: string;
  images: string[];
  specs: Record<string, string>;
  story?: string;
  supplier: {
    name: string;
    creditScore: number;
    tags: string[];
    performance: string;
  };
  status: 'AVAILABLE' | 'PROCESSING' | 'SOLD';
  traceability: TraceabilityStep[];
}
