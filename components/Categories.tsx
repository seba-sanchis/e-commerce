import Image from "next/image";
import Link from "next/link";

// import { cards } from "@/constants";
import { getContentByTag } from "@/lib/actions/content.actions";
import { Content } from "@/common.types";

export default async function Categories() {
  const engagement = await getContentByTag("category");
  // const cards = [
  //   {
  //     name: "Ropa",
  //     description: "Comprá la nueva línea.",
  //     link: "/category/ropa",
  //     url: "/assets/category-01.jpg",
  //   },
  //   {
  //     name: "Calzados",
  //     description: "¿Por qué esperar? Date el gusto.",
  //     link: "/category/calzado",
  //     url: "/assets/category-02.jpg",
  //   },
  // ];

  return (
    <section className="mb-8">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-[980px] px-4 md:px-0 mx-auto gap-3">
        {engagement.map((item: Content) => (
          <div key={item?.title}>
            {/* <div className="absolute flex flex-col items-center justify-center w-[485px] h-[336px] px-4">
              <h4 className="font-semibold text-[40px] text-primary-gray">
                {item.title}
              </h4>
              <h5 className="mt-5 text-[17px] text-center text-primary-gray">
                {item.subtitle}
              </h5>
              <Link
                href={item.url}
                className="group flex items-center mt-3.5 text-[17px] text-white"
              >
                <span className="group-hover:underline">Ver más</span>
                <i className="fi fi-rr-angle-small-right flex"></i>
              </Link>
            </div> */}

            <div className="flex justify-center items-center rounded-r overflow-hidden">
              <Image
                src={item?.image}
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
