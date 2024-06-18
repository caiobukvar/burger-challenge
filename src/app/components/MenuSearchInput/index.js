import Image from "next/image";
import SearchIcon from "@/assets/images/search-icon.svg";

export default function MenuSearchInput() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        name="search-menu"
        id="search-menu"
        placeholder="Search menu items"
        className="w-full pl-10 pr-4 py-2 border border-[#8A94A4] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Image
        src={SearchIcon}
        alt="search"
        className="absolute left-1 top-1/2 transform -translate-y-1/2 pointer-events-none"
        width={40}
        height={40}
      />
    </div>
  );
}
