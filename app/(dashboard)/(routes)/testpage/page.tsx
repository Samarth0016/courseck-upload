import Image from "next/image";

export default function TestPage() {
  return (
    <Image
      src="https://utfs.io/f/5WDeuq4dmhC5ybPmaRZLozHxmpv6Xa5GV7MjJBIshl4gcF9i"
      width={500}
      height={300}
      alt="Uploaded Image"
      unoptimized // 🚀 Bypass Next.js' optimization
    />
  );
}