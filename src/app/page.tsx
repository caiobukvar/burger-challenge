"use client";
/* eslint-disable react/jsx-no-undef */
import { CartItem, RootState, Venue } from "@/types/types";
import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import MenuNavigation from "../components/MenuNavigation";
import MenuSearchInput from "../components/MenuSearchInput";
import HeaderMobile from "../components/HeaderMobile";
import HeaderDesktop from "../components/HeaderDesktop";
import { useDispatch, useSelector } from "react-redux";
import CartMobileComponent from "@/components/CartMobileComponent";
import { setIsCartOpen } from "@/store/reducers/cartComponentOpenerReducer";

export default function Home() {
  const [venueData, setVenueData] = useState<Venue | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cartItems = useSelector((state: RootState) => state.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoading(true);
        const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
        const API_URL = "https://cdn-dev.preoday.com/challenge/venue/9";

        const response = await fetch(PROXY_URL + API_URL);
        console.log("Response Status:", response.status);
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

  const openCart = () => {
    dispatch(setIsCartOpen(true));
  };

  const closeCart = () => {
    dispatch(setIsCartOpen(false));
  };

  return (
    <main className="flex min-h-screen flex-col relative bg-[#EEEEEE]">
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

      <div className="flex flex-col w-full max-w-screen-lg self-center bg-[#fff] md:bg-[#EEEEEE] ">
        <MenuSearchInput />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="md:bg-[#F8F9FA] md:px-10 md:py-8 flex justify-between gap-6">
          <div className="md:bg-[#fff] p-4  md:max-w-[600px] md:w-full  md:drop-shadow-lg">
            {venueData && <MenuNavigation venue={venueData} />}
            {venueData && <Menu venue={venueData} />}
          </div>

          <div className="hidden md:flex w-[320px] flex-col shadow-lg h-full">
            <CartMobileComponent
              venue={venueData}
              onClose={closeCart}
              cartItems={cartItems}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-6 bg-[#EEEEEE] md:hidden">
        <button className="text-center text-[#4F372F] bg-white rounded-[8px] w-full underline font-[700]">
          View allergy information
        </button>
      </div>

      {cartItems.length > 0 && (
        <div className="sticky bottom-0 p-4 backdrop-blur-lg backdrop-transparent md:hidden">
          <button
            className="text-center bg-[#4F372F] text-white rounded-[24px] w-full font-[700] h-[48px]"
            onClick={openCart}
          >
            Your basket •{" "}
            {cartItems.length > 1
              ? `${cartItems.length} items`
              : `${cartItems.length} item`}
          </button>
        </div>
      )}
    </main>
  );
}
