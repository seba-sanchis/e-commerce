import { getProductsBySales } from "@/lib/actions/product.actions";
import { Product } from ".";
import { Product as Products } from "@/common.types";

export default async function Bestsellers() {
  const response = await getProductsBySales();

  const data = await JSON.parse(JSON.stringify(response));

  return (
    <section className="py-10 ">
      <div className="flex flex-col w-full max-w-[980px] rounded mx-auto">
        <div className="text-xl font-semibold mb-4">Productos más vendidos</div>
        <div className="flex justify-between text-ellipsis overflow-hidden">
          {data.map((product: Products) => (
            <Product key={product.sku} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
