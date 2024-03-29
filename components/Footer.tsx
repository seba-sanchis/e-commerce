import { Content } from "@/types";
import { getContentByTag } from "@/lib/actions/content.actions";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default async function Footer() {
  const organization = await getContentByTag("organization");

  const socialMedia = await getContentByTag("social-media");

  return (
    <footer className="w-full bg-primary-gray">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[980px] my-3 mx-auto px-4 gap-4 text-sm">
        <div className="flex flex-col md:flex-row items-center md:gap-4">
          <Link
            href={organization.url}
            aria-label={organization.title}
            className="navbar_link"
          >
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
            <Link
              href={social?.url}
              aria-label={social?.title}
              key={social?.title}
              className="cursor-pointer text-primary-black/80 hover:text-primary-black"
            >
              {social?.title === "facebook" ? (
                <FaFacebook size={20} />
              ) : social.title === "instagram" ? (
                <FaInstagram size={20} />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
