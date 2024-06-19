"use client";
import Image from "next/image";
import Burgers from "@/assets/images/nav-burger.png";
import Drinks from "@/assets/images/nav-drinks.png";
import Desserts from "@/assets/images/nav-desserts.png";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMenuTab } from "@/store/reducers/menuTabReducer";
import { RootState } from "@/store/store";
import { MenuProps } from "@/types/types";
import { useRef } from "react";

const MenuNavigation: React.FC<MenuProps> = ({ venue }) => {
  const currentTab = useSelector((state: RootState) => state.currentMenuTab);
  const dispatch = useDispatch();

  const { primaryColour }: any = venue?.webSettings;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-row justify-center px-4 py-5 gap-3 items-center max-w-[375px] ">
      <button
        className="flex flex-col items-center p-2 border-b-2 border-transparent"
        style={
          currentTab.currentMenuTab === "burgers"
            ? { borderColor: primaryColour }
            : {}
        }
        onClick={() => {
          dispatch(setCurrentMenuTab("burgers"));
          scrollToSection("burgers");
        }}
      >
        <div
          className="rounded-full p-[2px] border-2 border-transparent"
          style={
            currentTab.currentMenuTab === "burgers"
              ? { borderColor: primaryColour }
              : {}
          }
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
        className="flex flex-col items-center p-2 border-b-2 border-transparent"
        style={
          currentTab.currentMenuTab === "drinks"
            ? { borderColor: primaryColour }
            : {}
        }
        onClick={() => {
          dispatch(setCurrentMenuTab("drinks"));
          scrollToSection("drinks");
        }}
      >
        <div
          className="rounded-full p-[2px] border-2 border-transparent"
          style={
            currentTab.currentMenuTab === "drinks"
              ? { borderColor: primaryColour }
              : {}
          }
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
        className="flex flex-col items-center p-2 border-b-2 border-transparent"
        style={
          currentTab.currentMenuTab === "desserts"
            ? { borderColor: primaryColour }
            : {}
        }
        onClick={() => {
          dispatch(setCurrentMenuTab("desserts"));
          scrollToSection("desserts");
        }}
      >
        <div
          className="rounded-full p-[2px] border-2 border-transparent"
          style={
            currentTab.currentMenuTab === "desserts"
              ? { borderColor: primaryColour }
              : {}
          }
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
};

export default MenuNavigation;
