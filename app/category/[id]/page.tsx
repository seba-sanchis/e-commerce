import { Product } from "@/components";
import { features } from "@/constants";
import { getProductsByCategory } from "@/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getProductsByCategory(params.id);

  const products = response.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.name === product.name)
  );

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] mb-8">
        <section className="flex flex-col">
          <div className="pt-[66px] pb-[74px]">
            <h1 className="text-center text-5xl leading-[1.05] font-semibold">
              {
                features.find(
                  (feature) =>
                    feature.url.substring(feature.url.lastIndexOf("/") + 1) ===
                    params.id
                )?.name
              }
            </h1>
          </div>
          <div className="flex flex-wrap flex-1 gap-5">
            {products.map((product) => (
              <Product product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
