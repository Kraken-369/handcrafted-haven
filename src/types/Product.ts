export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  categoryId: string;
  artisanId: string;
};

export type NewProduct = Omit<Product, '_id'>;
