"use client";
import Image from "next/image";
import Burgers from "@/assets/images/nav-burger.png";
import Drinks from "@/assets/images/nav-drinks.png";
import Desserts from "@/assets/images/nav-desserts.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMenuTab } from "@/app/store/reducers/menuTabReducer";
import { RootState } from "@/app/store/store";

export default function MenuNavigation() {
  const currentTab = useSelector((state: RootState) => state.currentMenuTab);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row justify-center px-4 py-5 gap-3 items-center max-w-[375px] ">
      <button
        className={`flex flex-col items-center p-2 border-b-2 border-transparent ${
          currentTab.currentMenuTab === "burgers" &&
          "venue webSettings primaryColour"
        }`}
        onClick={() => dispatch(setCurrentMenuTab("burgers"))}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentTab.currentMenuTab === "burgers" &&
            "venue webSettings primaryColour"
          }`}
        >
          <Image
            src={Burgers}
            alt="burgers"
            width={74}
            height={74}
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center items-center h-[62px]">
          <p>Burgers</p>
        </div>
      </button>

      <button
        className={`flex flex-col items-center p-2 border-b-2 border-transparent ${
          currentTab.currentMenuTab === "drinks" &&
          "venue webSettings primaryColour"
        }`}
        onClick={() => dispatch(setCurrentMenuTab("drinks"))}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentTab.currentMenuTab === "drinks" &&
            "venue webSettings primaryColour"
          }`}
        >
          <Image
            src={Drinks}
            alt="drinks"
            width={74}
            height={74}
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center items-center h-[62px]">
          <p>Drinks</p>
        </div>
      </button>

      <button
        className={`flex flex-col items-center p-2 border-b-2 border-transparent ${
          currentTab.currentMenuTab === "desserts" &&
          "venue webSettings primaryColour"
        }`}
        onClick={() => dispatch(setCurrentMenuTab("desserts"))}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentTab.currentMenuTab === "desserts" &&
            "venue webSettings primaryColour"
          }`}
        >
          <Image
            src={Desserts}
            alt="desserts"
            width={74}
            height={74}
            className="rounded-full"
          />
        </div>
        <div className="flex justify-center items-center h-[62px]">
          <p>Desserts</p>
        </div>
      </button>
    </div>
  );
}
