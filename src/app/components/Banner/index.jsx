import BannerSmall from "@/assets/images/banner-small.png";
import BannerLarge from "@/assets/images/banner-large.png";

export default function Banner() {
  return (
    <div className="relative w-full h-[150px]">
      <picture>
        <source srcSet={BannerLarge.src} media="(min-width: 1024px)" />
        <img src={BannerSmall.src} alt="Banner" className="w-full h-[150px]" />
      </picture>
    </div>
  );
}
