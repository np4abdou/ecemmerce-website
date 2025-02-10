export interface Order {
  id?: number;
  productId: number;
  productName: string;
  size: string;
  fullName: string;
  phone: string;
  city: string;
  price: number;
  date: string;
}

export interface D1Response {
  success: boolean;
  errors?: Array<{
    code: number;
    message: string;
  }>;
  messages: string[];
  result: any[];
}