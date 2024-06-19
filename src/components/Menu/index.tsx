"use client";
import {
  Menu as MenuType,
  MenuProps,
  SectionState,
  Section,
} from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChevronUp from "../ChevronUp";
import ChevronDown from "../ChevronDown";
import "@/app/globals.css";

const Menu: React.FC<MenuProps> = ({ venue }) => {
  const [menuData, setMenuData] = useState<MenuType | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: number]: boolean }>(
    {}
  );
  const bgColor = venue?.webSettings.primaryColour;

  useEffect(() => {
    const fetchVenueData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://cdn-dev.preoday.com/challenge/menu`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuData(data);

        const initialOpenSections: { [key: string]: boolean } = {};
        data.sections.forEach((section: Section) => {
          initialOpenSections[section.id] = true;
        });
        setOpenSections(initialOpenSections);
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

  const toggleSection = (sectionId: number) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {menuData && (
        <div>
          {menuData.sections.map((section) => (
            <section key={section.id} className="flex flex-col gap-8">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex justify-between h-[72px] items-center w-full"
              >
                <p className="font-[500] text-[24px] text-[#121212]">
                  {section.name}
                </p>
                {openSections[section.id] ? (
                  <ChevronUp color={bgColor} />
                ) : (
                  <ChevronDown color={bgColor} />
                )}
              </button>
              {openSections[section.id] && (
                <div className="flex flex-col gap-8">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between w-full gap-4 max-h-[84px]"
                    >
                      <div className="min-h-full ">
                        <p className="font-[500] text-[16px] text-[#121212]">
                          {item.name}
                        </p>
                        <p className="font-[300] text-[16px] text-[#464646] line-clamp-2 leading-[18.75px]">
                          {item.description}
                        </p>
                        <p className="font-[500] text-[16px] text-[#464646]">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex min-w-32 max-h-[84px] justify-center items-center">
                        {item.images && (
                          <div>
                            {item.images.map((image, index) => (
                              <Image
                                src={image.image}
                                key={index}
                                alt={image.image}
                                width={128}
                                height={84}
                                className="rounded-[4px]"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
