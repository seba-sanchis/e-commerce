import Image from "next/image";
import Link from "next/link";

import { cards } from "@/constants";

export default function Categories() {
  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[980px] px-4 md:px-0 mx-auto gap-3">
        {cards.map((category) => (
          <div key={category.name}>
            {/* <div className="absolute flex flex-col items-center justify-center w-[485px] h-[336px] px-4">
              <h4 className="font-semibold text-[40px] text-primary-gray">
                {category.name}
              </h4>
              <h5 className="mt-5 text-[17px] text-center text-primary-gray">
                {category.description}
              </h5>
              <Link
                href={category.link}
                className="group flex items-center mt-3.5 text-[17px] text-white"
              >
                <span className="group-hover:underline">Ver más</span>
                <i className="fi fi-rr-angle-small-right flex"></i>
              </Link>
            </div> */}

            <div className="flex justify-center items-center rounded-r overflow-hidden">
              <Image
                src={category.url}
                alt="category"
                width={485}
                height={395}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
