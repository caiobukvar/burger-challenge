"use client";
/* eslint-disable react/jsx-no-undef */
import Header from "../components/Header";
import MenuSearchInput from "../components/MenuSearchInput";
import MenuNavigation from "../components/MenuNavigation";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { Venue } from "@/types/types";

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
    <main className="flex min-h-screen flex-col">
      <Header venue={venueData} />

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

      <div className="flex flex-col w-full p-4">
        <MenuSearchInput />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {venueData && <MenuNavigation venue={venueData} />}
        {venueData && <Menu venue={venueData} />}
      </div>
    </main>
  );
}
