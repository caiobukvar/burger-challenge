"use client";
/* eslint-disable react/jsx-no-undef */
import { Venue } from "@/types/types";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import MenuNavigation from "../components/MenuNavigation";
import MenuSearchInput from "../components/MenuSearchInput";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";

export default function Home() {
  const [venueData, setVenueData] = useState<Venue | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cdn-dev.preoday.com/challenge/venue/9`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVenueData(data);
      } catch (error) {
        console.error("Failed to fetch venue data:", error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVenueData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col relative">
      <HeaderMobile venue={venueData} />
      <HeaderDesktop venue={venueData} />

      {venueData && (
        <div
          className="relative w-full h-[150px]"
          style={{
            backgroundImage: `url(${venueData.webSettings.bannerImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      )}

      <div className="flex flex-col w-full p-4 max-w-screen-lg self-center gap-2 ">
        <MenuSearchInput />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="md:bg-[#F8F9FA] md:px-10 md:py-8 flex justify-between gap-6">
          <div className="md:bg-[#fff] p-4  md:max-w-[600px] md:w-full  md:drop-shadow-lg">
            {venueData && <MenuNavigation venue={venueData} />}
            {venueData && <Menu venue={venueData} />}
          </div>

          <div className="hidden md:flex w-[320px] flex-col drop-shadow-lg h-full">
            <div className="bg-[#F8F9FA] h-16 p-4 flex items-center text-[#464646] font-[500] text-[24px]">
              <p>Carrinho</p>
            </div>
            <div className="bg-[#FFFFFF] h-16 p-4 text-[#464646] font-[400] flex items-center">
              <p>Seu carrinho esta vazio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-6 bg-[#EEEEEE] mt-4 md:hidden">
        <button className="text-center text-[#4F372F] bg-white rounded-[8px] w-full underline font-[700]">
          View allergy information
        </button>
      </div>
    </main>
  );
}
