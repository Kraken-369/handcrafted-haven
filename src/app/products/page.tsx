'use client'
 
import ListProducts from "../ui/products/ListProducts"

export default function Home() {
  

  return (
    <div>
    <h1 className="text-3xl text-center pt-2 font-bold text-primary mb-8">Our Products Page</h1>
    <ListProducts/>
  
    </div>
  );
}