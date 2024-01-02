import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/assets/waitindicator.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain animate-spin"
      />
    </div>
  );
}
