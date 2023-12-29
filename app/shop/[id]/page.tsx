import { ProductCard } from "@/components";
import { collections } from "@/constants";
import { getProductsBySearch } from "@/lib/actions/product.actions";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getProductsBySearch(params.id);

  const products = response.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.name === product.name)
  );

  const collection = collections.find(
    (collection) =>
      collection.url.substring(collection.url.lastIndexOf("/") + 1) ===
      params.id
  );

  return (
    <div className="flex justify-center w-full grow">
      <div className="flex flex-col flex-grow w-full max-w-[980px] mb-8">
        <section className="flex flex-col">
          <div className="pt-14 pb-5">
            <h1 className="text-center text-5xl leading-[1.05] font-semibold">
              {collection ? collection.name : "Resultado de búsqueda"}
            </h1>
          </div>
          <div className="flex justify-center flex-wrap flex-1 gap-2 md:gap-4">
            {collection
              ? products.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))
              : response.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
          </div>
        </section>
      </div>
    </div>
  );
}
