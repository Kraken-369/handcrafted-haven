import Image from "next/image";
import styles from "./ProductDetails.module.css";

interface ProductDetailsProps {
  imageUrl: string;
  imageAlt: string;
  name: string;
  description: string;
  price: number;
  artisanName: string;
  artisanProfileImageUrl?: string;
  artisanBio?: string;
}

function ProductDetails(props: ProductDetailsProps) {
  const {
    imageUrl,
    imageAlt,
    name,
    description,
    price,
    artisanName,
    artisanProfileImageUrl,
    artisanBio,
  } = props;

  return (
    <div className={styles.productDetails}>
      <div className={styles.productImage}>
        <Image src={imageUrl} alt={imageAlt} />
      </div>
      <div className={styles.productInfo}>
        <h2>{name}</h2>
        <p>{description}</p>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
      <div className={styles.artisanInfo}>
        <h3>About the Artisan: {artisanName}</h3>
        {artisanProfileImageUrl && (
          <Image
            src={artisanProfileImageUrl}
            alt={`${artisanName}'s profile`}
            className={styles.artisanImage}
          />
        )}
        {artisanBio && <p>{artisanBio}</p>}
      </div>
    </div>
  );
}

export default ProductDetails;
