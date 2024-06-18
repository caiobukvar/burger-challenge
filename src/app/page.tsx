import Image from "next/image";
import Header from "./components/Header";
import BannerSmall from "@/assets/images/banner-small.png";
import BannerLarge from "@/assets/images/banner-large.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="relative w-full h-64">
        <picture>
          <source srcSet={BannerLarge.src} media="(min-width: 1024px)" />
          <img
            src={BannerSmall.src}
            alt="Banner"
            className="w-full h-[150px]"
          />
        </picture>
      </div>
    </main>
  );
}
