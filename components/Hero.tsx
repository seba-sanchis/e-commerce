import { getContentByTag } from "@/lib/actions/content.actions";
import Image from "next/image";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export default async function Hero() {
  const hero = await getContentByTag("banner");

  return (
    <section className="bg-primary-gray pt-12 pb-6 md:py-0">
      <div className="flex flex-col md:flex-row justify-center items-center w-full h-96  px-4 py-8 md:p-0 max-w-[980px] rounded mx-auto">
        <div className="flex flex-col justify-center items-center md:items-start mb-2 md:mb-0 md:gap-3.5 md:max-w-[33%]">
          <h2 className="text-3xl md:text-5xl font-semibold text-center md:text-left">
            {hero?.title}
          </h2>
          <h3 className="text-lg md:text-xl text-center md:text-left">
            {hero?.subtitle}
          </h3>
          <Link
            href={hero?.url}
            className="group flex justify-center items-center text-lg md:text-xl text-tertiary-blue"
          >
            <span className="group-hover:underline">Ver más</span>{" "}
            <FaAngleRight size={20} />
          </Link>
        </div>
        <div className="flex justify-center items-center flex-1">
          <Image
            src={hero?.image}
            alt="advertising hero"
            width={500}
            height={313}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
