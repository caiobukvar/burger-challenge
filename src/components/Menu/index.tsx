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
            <section key={section.id}>
              <div className="flex justify-between h-[28px] items-center">
                <p>{section.name}</p>
                <button onClick={() => toggleSection(section.id)}>
                  {openSections[section.id] ? (
                    <ChevronUp color={bgColor} />
                  ) : (
                    <ChevronDown color={bgColor} />
                  )}
                </button>
              </div>
              {openSections[section.id] && (
                <div>
                  <p>Content for {section.name} goes here</p>
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
