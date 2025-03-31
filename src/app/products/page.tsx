'use client'
 
import ListProducts from "../ui/products/ListProducts"

export default function Home() {

/*
  const imgTromp = 'https://plus.unsplash.com/premium_photo-1661698822695-3ef59d5718dc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const imgBebolo ='https://plus.unsplash.com/premium_photo-1679811671315-9e7160cfef7a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  const MyImage = ({ imgSrc }: { imgSrc: string })  => {
    return (
      <img
        src={imgSrc}
        width={540}
        alt="Imagen de Unsplash"
      />
    );
  };

  return (
    <div>
    <h1>list products</h1>
    <MyImage imgSrc={imgTromp}/>
    <MyImage imgSrc={imgBebolo}/>
    
    </div>
  );
  */

  

  return (
    <div>
    <h1>List Products</h1>
    <ListProducts/>
  
    </div>
  );
}