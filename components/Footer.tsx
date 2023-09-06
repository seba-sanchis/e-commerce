import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-primary-gray">
      <div className="flex justify-between items-center w-full max-w-[980px] my-3 mx-auto text-sm">
        <div className="flex items-center gap-4">
          <Image
            src="/assets/brand-01.png"
            alt="logo"
            width={40}
            height={40}
          />
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
          <i className="fi fi-brands-facebook icon cursor-pointer text-primary-black/80 hover:text-primary-black"></i>
          <i className="fi fi-brands-instagram icon cursor-pointer text-primary-black/80 hover:text-primary-black"></i>
        </div>
      </div>
    </footer>
  );
}
