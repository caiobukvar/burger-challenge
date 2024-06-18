/* eslint-disable react/jsx-no-undef */
import Header from "./components/Header";
import Banner from "./components/Banner";
import MenuSearchInput from "./components/MenuSearchInput";
import MenuNavigation from "./components/MenuNavigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Banner />

      <div className="flex flex-col w-full p-4">
        <MenuSearchInput />
        <MenuNavigation />
        {/* full menu */}
      </div>
    </main>
  );
}
