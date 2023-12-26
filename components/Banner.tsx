import { getContentByTag } from "@/lib/actions/content.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Banner() {
  const banner = await getContentByTag("banner");

  return (
    <section className="bg-primary-gray">
      <div className="flex flex-col md:flex-row justify-center items-center w-full h-96  px-4 py-8 md:p-0 max-w-[980px] rounded mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:gap-3.5 md:max-w-[33%]">
          <h2 className="text-3xl md:text-5xl font-semibold text-center md:text-left">
            {banner?.title}
          </h2>
          <h3 className="text-lg md:text-xl text-center md:text-left">
            {banner?.subtitle}
          </h3>
          <Link
            href={banner?.url}
            className="group flex justify-center items-center text-lg md:text-xl text-primary-blue"
          >
            <span className="group-hover:underline">Ver más</span>{" "}
            <i className="fi fi-rr-angle-small-right icon"></i>
          </Link>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src={banner?.image}
            alt="advertising banner"
            width={500}
            height={313}
          />
        </div>
      </div>
    </section>
  );
}
