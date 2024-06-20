import { RootState } from "@/store/store";
import { MenuItemCheckoutProps } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useSelector } from "react-redux";
import CloseButton from "../CloseButton";
import MinusBtn from "@/assets/images/minusButton.svg";
import PlusBtn from "@/assets/images/plusButton.svg";
import { useState } from "react";

const MenuItemCheckout: React.FC<MenuItemCheckoutProps> = ({
  venue,
  selectedItem,
}) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen
  );
  const [desiredAmount, setDesiredAmount] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});

  const handleAmount = (type: string) => {
    if (type === "minus") {
      setDesiredAmount(desiredAmount <= 0 ? 0 : desiredAmount - 1);
    }
    if (type === "plus") {
      setDesiredAmount(desiredAmount + 1);
    }
  };

  const handleRadioChange = (modifierId: number, itemId: number) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [modifierId]: itemId,
    }));
  };
  console.log(selectedItem.modifiers?.map((modifier) => console.log(modifier)));

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

            {selectedItem.modifiers && (
              <div className="flex flex-col bg-[#F8F9FA]">
                {selectedItem.modifiers.map((modifier) => (
                  <>
                    <div key={modifier.id} className="p-4">
                      <p className="text-[#464646] text-[16px] font-[700]">
                        {modifier.name}
                      </p>
                      <p className="text-[#464646] text-[16px] font-[400]">
                        Select 1 option
                      </p>
                    </div>

                    <div className="bg-white px-4">
                      {modifier.items.map((item) => (
                        <label
                          key={item.id}
                          onClick={() =>
                            handleRadioChange(modifier.id, item.id)
                          }
                          className="flex w-full justify-between items-center cursor-pointer"
                        >
                          <div className="flex flex-col items-start justify-center h-[72px] gap-1">
                            <p className="text-[#121212] font-[500]">
                              {item.name}
                            </p>
                            <p className="text-[#464646]">
                              R${item.price.toFixed(2)}
                            </p>
                          </div>
                          <input
                            type="radio"
                            name={`modifier-${modifier.id}`}
                            value={item.id}
                            checked={selectedOptions[modifier.id] === item.id}
                            className="round-checkbox"
                            readOnly
                          />
                        </label>
                      ))}
                    </div>
                  </>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col items-center p-4 gap-[10px]">
              <div className="flex gap-4 ">
                <button
                  onClick={() => handleAmount("minus")}
                  className="flex items-center justify-center size-8 rounded-full bg-[#DADADA]"
                >
                  <Image src={MinusBtn} alt="minus" />
                </button>
                <p className="font-bold self-center text-[24px] h-[32px]">
                  {desiredAmount}
                </p>
                <button
                  onClick={() => handleAmount("plus")}
                  className="flex items-center justify-center size-8 rounded-full bg-[#4F372F]"
                >
                  <Image src={PlusBtn} alt="plus" />
                </button>
              </div>

              <button
                className="py-1 px-6 rounded-[40px text-[18px]
                text-white rounded-[40px] w-full font-[400]"
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
