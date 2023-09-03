import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-primary-gray">
      <div className="flex justify-center items-center w-full h-96 max-w-[980px] rounded mx-auto">
        <div className="flex flex-col justify-center items-center flex-1 gap-3.5">
          <h2 className="text-5xl font-semibold">Pool Inverter</h2>
          <h3 className="text-xl text-center">
            Climatizá el agua de tu piscina ahorrando energía.
          </h3>
          <Link
            href="/piscinas/climatizacion"
            className="group flex items-center text-xl text-primary-blue"
          >
           <span className="group-hover:underline">Ver más</span> <i className="fi fi-rr-angle-small-right icon"></i>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src="/assets/banner_1.png"
            alt="advertising banner"
            width={392}
            height={355}
          />
        </div>
      </div>
    </section>
  );
}
