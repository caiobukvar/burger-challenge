/* eslint-disable react-hooks/exhaustive-deps */
import "@/app/globals.css";
import { setIsMenuCheckoutOpen } from "@/store/reducers/menuCheckoutReducer";
import { setSelectedItem } from "@/store/reducers/menuItemCheckoutReducer";
import { RootState } from "@/store/store";
import {
  CartItem,
  MenuItem,
  MenuProps,
  Menu as MenuType,
  Section,
} from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChevronDown from "../ChevronDown";
import ChevronUp from "../ChevronUp";
import MenuItemCheckout from "../MenuItemCheckout";

const Menu: React.FC<MenuProps> = ({ venue }) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen
  );
  const currentTab = useSelector((state: RootState) => state.currentMenuTab);
  const { selectedItem } = useSelector(
    (state: RootState) => state.selectedItem
  );
  const cart = useSelector((state: RootState) => state.cartItems);
  const [menuData, setMenuData] = useState<MenuType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

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

  useEffect(() => {
    if (menuData) {
      setOpenSections((prevOpenSections) => {
        const updatedOpenSections: { [key: string]: boolean } = {
          ...prevOpenSections,
        };
        menuData.sections.forEach((section) => {
          if (currentTab.currentMenuTab === section.name.toLowerCase()) {
            updatedOpenSections[section.id] = true;
          } else {
            updatedOpenSections[section.id] =
              prevOpenSections[section.id] ?? false;
          }
        });
        return updatedOpenSections;
      });
    }
  }, [currentTab.currentMenuTab, menuData]);

  const toggleSection = (sectionId: number) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  const openMenuItemCheckout = (item: MenuItem) => {
    dispatch(setSelectedItem(item));
    dispatch(setIsMenuCheckoutOpen(true));
  };

  const closeMenuItemCheckout = () => {
    dispatch(setSelectedItem(null));
    dispatch(setIsMenuCheckoutOpen(false));
  };

  const getItemInCart = (itemId: number): CartItem | undefined => {
    return cart.cartItems.find((item: CartItem) => item.id === itemId);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {menuData && (
        <div>
          {menuData.sections.map((section) => (
            <section
              key={section.id}
              className="flex flex-col gap-8"
              id={section.name.toLowerCase()}
            >
              <button
                onClick={() => toggleSection(section.id)}
                type="button"
                className="flex justify-between h-[72px] items-end w-full"
              >
                <p className="font-[500] text-[24px] text-[#121212]">
                  {section.name}
                </p>
                {openSections[section.id] ? (
                  <ChevronUp color={venue?.webSettings.primaryColour} />
                ) : (
                  <ChevronDown color={venue?.webSettings.primaryColour} />
                )}
              </button>
              {openSections[section.id] && (
                <div className="flex flex-col gap-8">
                  {section.items.map((item) => {
                    const itemInCart = getItemInCart(item.id);
                    const displayPrice =
                      item.modifiers && item.modifiers.length > 0
                        ? item.modifiers[0].items[0]?.price || item.price
                        : item.price;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className="flex justify-between w-full gap-4 max-h-[84px] text-start"
                        onClick={() => openMenuItemCheckout(item)}
                      >
                        <div className="min-h-full flex items-center gap-4">
                          {itemInCart && (
                            <div className="bg-[#FF0000] text-white rounded-full px-2 py-1 text-sm">
                              {itemInCart.quantity}
                            </div>
                          )}
                          <div>
                            <p className="font-[500] text-[16px] text-[#121212]">
                              {item.name}
                            </p>
                            <p className="font-[300] text-[16px] text-[#464646] line-clamp-2 leading-[18.75px]">
                              {item.description}
                            </p>
                            <p className="font-[500] text-[16px] text-[#464646]">
                              R$ {displayPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex min-w-32 max-h-[84px] justify-center items-center">
                          {item.images && (
                            <div className="w-[128px] h-[84px]">
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
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
      {selectedItem && isCheckoutOpen.isMenuCheckoutOpen && (
        <MenuItemCheckout
          open={isCheckoutOpen.isMenuCheckoutOpen}
          onClose={closeMenuItemCheckout}
          venue={venue}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Menu;
