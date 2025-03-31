 
// import { ProductsModel } from "@/api/models/productsModel";
import { listProducts ,newProductsType, saveProductsOnMongo } from '@/api/controllers/products';


  async function setProducts(){

  console.log('entra setProducts');

  const allProducts= await listProducts();

  console.log(`allProducts:[ ${allProducts} ]`);

  console.log(`allProducts.data:[ ${allProducts.data} ]`);
  
  console.log(`allProducts.data.length :[ ${allProducts.data.length } ]`);

/*  
    enum:['Clothing & Accessories',
'Jewelry', 'Home Decor' ,'Personal Care', 'Food & Beverages','Stationery & Paper Goods','Toys & Games', 'Artwork & Prints','Leather Goods','Miscellaneous Handmade Item'] , required: true }
 
    status  ["Available", "Out of stock"]

*/ 


if (allProducts.data && allProducts.data.length > 0) {

  console.log('return The products were previously configured');
  return 'The products were previously configured!';
} else {
  console.log('crea myProductsArray');
  const myProductsArray = [{
      name: 'Soapstone sculpture',
      description: 'Soapstone sculpture. Found only in one region of Brazil. Minas Gerais. It is a type of handicraft very well known in Brazil. Ouro Preto, MG - Brazil',
      price: 10,      
      images: 'https://plus.unsplash.com/premium_photo-1679811671315-9e7160cfef7a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Home Decor',
      status: 'Available'
  }, 
  {
    name: 'Christmas doll',
    description: 'Christmas doll Lytham, Lytham St Annes, United Kingdom',
    price: 9,  
    images: 'https://images.unsplash.com/photo-1638228626093-3fccb49743fd?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Home Decor',
    status: 'Available'
} ,
{
  name: 'leather keychain',
  description: 'Handmade leather keychain, crafted with premium materials for durability and style. A practical and elegant accessory for everyday use. Denver, CO, USA',
  price: 10.5,
  images: 'https://images.unsplash.com/photo-1599108859517-0d6aed78ac87?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  category: 'Leather Goods',
  status: 'Available'
} 


  ];

  for (const mm of myProductsArray) {
 
    try {
      const myprod:newProductsType  = {
           category:mm.category,
           description:mm.description,
           images:mm.images,
           name:mm.name,
           price:mm.price,
           status:mm.status
        };        

       await saveProductsOnMongo(myprod);

      console.log(` my prodycto imyprodm;m.name} url image:${myprod.images}`);
    } catch (error) {
      console.error(`Error saving product: ${mm.name}`, error);
    }
  };
}

  
  return 'Products setted!';
};


export async function GET() {
  try {
     await setProducts();
     return Response.json({ message: 'Products seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}