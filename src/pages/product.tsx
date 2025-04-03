import React from "react";
import Image from "next/image";

// This component will hold the product description, the artisan information and the image of the product

function Product() {
  return (
    <div>
      <div>
        <Image />
      </div>
      <div className="product-description"></div>
      <div className="information"></div>
    </div>
  );
}

export default Product;
