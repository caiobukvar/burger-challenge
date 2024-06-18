import Image from "next/image";
import MenuIcon from "@/assets/images/menu-icon.svg";

export default function Header() {
  return (
    <div className="flex justify-between px-4 items-center min-w-full h-16 bg-[#4F372F] text-white">
      <div className="size-[28px]" />

      <div>
        <p className="font-medium">Menu</p>
      </div>

      <button className="flex justify-center items-center size-7">
        <Image src={MenuIcon} width={16} height={16} alt="menu icon" />
      </button>
    </div>
  );
}
