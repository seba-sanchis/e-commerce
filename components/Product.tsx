import Image from "next/image";
import Link from "next/link";

interface Product {
  product: {
    name: string;
    image: string;
    desc: string;
    price: number;
  };
}

export default function Product({ product }: Product) {
  return (
    <Link
      href={`/product/${product.name.replace(/\s+/g, '-')}`}
      className="group flex flex-col w-[230px] rounded bg-white cursor-pointer"
    >
      <div className="flex flex-contain rounded-t overflow-hidden">
        <Image src={product.image} alt="product image" width={230} height={230} />
      </div>
      <div className="flex flex-col p-4 gap-2">
        <div className="text-sm font-semibold line-clamp-2">{product.name}</div>
        <div>
          {product.price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </div>
        <div className="text-sm text-primary-blue group-hover:text-secondary-blue transition-colors">
          Ver producto
        </div>
      </div>
    </Link>
  );
}
