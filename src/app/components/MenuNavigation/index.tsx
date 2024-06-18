"use client";
import Image from "next/image";
import Burgers from "@/assets/images/nav-burger.png";
import Drinks from "@/assets/images/nav-drinks.png";
import Desserts from "@/assets/images/nav-desserts.png";
import { useState } from "react";

export default function MenuNavigation() {
  const [currentMenuTab, setCurrentMenuTab] = useState("burgers");

  return (
    <div className="flex flex-row justify-between px-4 py-5 items-center ">
      <button
        className={`flex flex-col items-center border-b-2 border-transparent ${
          currentMenuTab === "burgers" && "venue webSettings primaryColour"
        }`}
        onClick={() => setCurrentMenuTab("burgers")}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentMenuTab === "burgers" && "venue webSettings primaryColour"
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
        className={`flex flex-col items-center border-b-2 border-transparent ${
          currentMenuTab === "drinks" && "venue webSettings primaryColour"
        }`}
        onClick={() => setCurrentMenuTab("drinks")}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentMenuTab === "drinks" && "venue webSettings primaryColour"
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
        className={`flex flex-col items-center border-b-2 border-transparent ${
          currentMenuTab === "desserts" && "venue webSettings primaryColour"
        }`}
        onClick={() => setCurrentMenuTab("desserts")}
      >
        <div
          className={`rounded-full p-[2px] border-2 border-transparent ${
            currentMenuTab === "desserts" && "venue webSettings primaryColour"
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
