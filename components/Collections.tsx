import Image from "next/image";
import Link from "next/link";

// import { cards } from "@/constants";
import { getContentByTag } from "@/lib/actions/content.actions";
import { Content } from "@/types";

export default async function Collections() {
  const engagement = await getContentByTag("category");

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[980px] px-4 md:px-0 mx-auto gap-3">
        {engagement.map((item: Content) => (
          <div
            key={item.title}
            className="relative w-full md:w-[484px] h-[336px]]"
          >
            <Image src={item.image} alt="engagement" width={484} height={336} />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end items-center p-6 text-white">
              <h4 className="font-semibold text-3xl">{item.title}</h4>
              <h5 className="text-lg text-center text-white">
                {item.subtitle}
              </h5>

              <Link href={item.url}>
                <div className="group flex items-center mt-3.5">
                  <span className="group-hover:underline">Ver más</span>
                  <i className="fi fi-rr-angle-small-right flex"></i>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
