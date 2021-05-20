export interface Product {
  item: string;
  quantity: string;
}

export interface Recipe {
  id?: string;
  video?: string;
  image?: string;
  title: string;
  userId: string;
  userName?: string;
  description: string;
  steps: string[];
  products: Product[];
}
