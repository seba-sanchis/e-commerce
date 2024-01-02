import Image from "next/image";
import Link from "next/link";

import { getContentByTag } from "@/lib/actions/content.actions";
import { Content } from "@/types";
import { FaAngleRight } from "react-icons/fa";

export default async function Collections() {
  const collections = await getContentByTag("category");

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[980px] px-4 md:px-0 mx-auto gap-3">
        {collections.map((collection: Content) => (
          <div
            key={collection.title}
            className="relative max-w-[484px] h-[336px]]"
          >
            <Image
              src={collection.image}
              alt="engagement"
              width={484}
              height={336}
              priority={true}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end items-center p-6 text-white">
              <h4 className="font-semibold text-3xl">{collection.title}</h4>
              <h5 className="text-lg text-center text-white">
                {collection.subtitle}
              </h5>

              <Link href={collection.url}>
                <div className="group flex items-center mt-3.5">
                  <span className="group-hover:underline">Ver más</span>
                  <FaAngleRight size={16} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
