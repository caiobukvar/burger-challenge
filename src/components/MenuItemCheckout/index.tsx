import { RootState } from "@/store/store";
import { MenuItemCheckoutProps } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useSelector } from "react-redux";
import CloseButton from "../CloseButton";

const MenuItemCheckout: React.FC<MenuItemCheckoutProps> = ({
  venue,
  selectedItem,
}) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen
  );

  console.log("selectedItem", selectedItem);

  return (
    <Dialog.Root open={isCheckoutOpen.isMenuCheckoutOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-white" />
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 flex flex-col  ">
          {selectedItem.images && selectedItem.images.length > 0 && (
            <div>
              {selectedItem.images.map((object) => (
                <div
                  style={{
                    backgroundImage: `url(${object.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                  key={object.id}
                  className="rounded-md object-cover w-full h-64"
                />
              ))}
            </div>
          )}

          <div className="">
            <div className="p-4">
              <p className="text-[#121212] text-[24px] font-[700]">
                {selectedItem.name}
              </p>
              {selectedItem.description && (
                <p className="text-[#464646] text-[16px] leading-[18.75px]">
                  {selectedItem.description}
                </p>
              )}
            </div>

            <div className="flex flex-col bg-[#F8F9FA] p-4">
              <p className="text-[#464646] text-[16px] font-[700]">
                Choose your size
              </p>
              <p className="text-[#464646] text-[16px] font-[400]">
                Select 1 option
              </p>

              {/* {selectedItem.modifiers?.map((modifier) => {
                <p>aa</p>;
              })} */}
            </div>

            <div className="flex w-full flex-col items-center p-4">
              <div className="flex gap-4">
                <button>-</button>
                <p>qte</p>
                <button>+</button>
              </div>

              <button
                className="py-1 px-6 rounded-[40px text-[18px] text-white rounded-[40px] w-full"
                style={{ backgroundColor: venue?.webSettings.primaryColour }}
              >
                Add to order • R${selectedItem.price.toFixed(2)}
              </button>
            </div>
            <CloseButton color={venue?.webSettings.primaryColour || "#000"} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemCheckout;
