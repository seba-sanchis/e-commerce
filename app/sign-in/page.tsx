import { SignIn } from "@/components";
import { getProviders } from "next-auth/react";

export default async function Page() {
  const providers = await getProviders();
  console.log(providers);
  return (
    <div className="flex flex-col flex-1 max-w-[980px] w-full mx-auto">
      <h1 className="text-[40px] font-semibold pt-[34px]">
        Iniciá sesión para comprar.
      </h1>
      <div className="flex flex-col items-center grow w-[480px] mt-[72px] mx-auto text-[#494949]">
        <h2 className="text-2xl font-semibold mb-10">Ingresá a la tienda</h2>

        <div className="flex flex-col items-center text-sm gap-2">
          {providers &&
            Object.values(providers).map((provider) => (
              <SignIn id={provider.id} name={provider.name} />
            ))}
        </div>
      </div>
    </div>
  );
}
