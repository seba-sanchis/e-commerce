import { getProductsBySales } from "@/lib/actions/product.actions";
import { Slider } from ".";

export default async function Bestsellers() {
  const response = await getProductsBySales();

  const data = await JSON.parse(JSON.stringify(response));

  return (
    <section className="py-10">
      <div className="flex flex-col w-full max-w-[980px] rounded mx-auto relative overflow-hidden">
        <div className="text-xl font-semibold mb-4">Productos más vendidos</div>
        <Slider products={data} />
      </div>
    </section>
  );
}
