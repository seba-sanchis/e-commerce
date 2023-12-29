import { Content } from "@/types";
import { getContentByTag } from "@/lib/actions/content.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const organization = await getContentByTag("organization");

  const socialMedia = await getContentByTag("social-media");

  return (
    <footer className="w-full bg-primary-gray">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[980px] my-3 mx-auto px-4 gap-4 text-sm">
        <div className="flex flex-col md:flex-row items-center md:gap-4">
          <Link href={organization.url} className="navbar_link">
            <Image src={organization.image} alt="logo" width={40} height={40} />{" "}
          </Link>
          <Link href="/" className="navbar_link">
            Terminos y condiciones
          </Link>
          <Link href="/" className="navbar_link">
            Aviso de privacidad
          </Link>
          <Link href="/" className="navbar_link">
            Ayuda
          </Link>
        </div>
        <div className="flex gap-4">
          {socialMedia.map((social: Content) => (
            <Link href={social?.url} key={social?.title}>
              <i
                className={`fi fi-brands-${social?.title} icon cursor-pointer text-primary-black/80 hover:text-primary-black`}
              ></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
