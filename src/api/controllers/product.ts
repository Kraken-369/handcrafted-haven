import model from '@/api/models/product';

export const getAllProducts = async () => {
  try {
    return await model.find();
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}) => {
  const { name, description, price, stock, imageUrl } = productData;
  try {
    const newProduct = new model({
      name,
      description,
      price,
      stock,
      imageUrl
    });

    return await newProduct.save();
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};
