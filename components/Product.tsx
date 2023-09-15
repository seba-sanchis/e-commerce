import Image from "next/image";
import Link from "next/link";

import { Product } from "@/common.types";

export default function Product({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.name.replace(/\s+/g, "-")}`}
      className="group flex flex-col w-[230px] rounded-2xl bg-primary-gray cursor-pointer"
    >
      <div className="flex flex-contain rounded-2xl-t overflow-hidden">
        <Image src={product.image} alt={product.sku} width={230} height={230} />
      </div>
      <div className="flex flex-col p-4 gap-2 text-ellipsis overflow-hidden">
        <div className="text-sm font-semibold line-clamp-2 group-hover:text-tertiary-blue">
          {product.name}
        </div>
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
