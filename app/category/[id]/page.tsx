import { Product } from "@/components";
import { features } from "@/constants";
import { getProductsBySearch } from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getProductsBySearch(params.id);

  const products = response.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.name === product.name)
  );

  const feature = features.find(
    (feature) =>
      feature.url.substring(feature.url.lastIndexOf("/") + 1) === params.id
  );

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] mb-8">
        <section className="flex flex-col">
          <div className="pt-14 pb-5">
            <h1 className="text-center text-5xl leading-[1.05] font-semibold">
              {feature ? feature.name : "Resultado de búsqueda"}
            </h1>
          </div>
          <div className="flex flex-wrap flex-1 gap-4">
            {products.map((product) => (
              <Product product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
