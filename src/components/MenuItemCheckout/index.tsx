import { RootState } from "@/store/store";
import { MenuItemCheckoutProps } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "../CloseButton";
import MinusBtn from "@/assets/images/minusButton.svg";
import PlusBtn from "@/assets/images/plusButton.svg";
import { useState } from "react";
import { setSelectedItem } from "@/store/reducers/menuItemCheckoutReducer";
import { setIsMenuCheckoutOpen } from "@/store/reducers/menuCheckoutReducer";

const MenuItemCheckout: React.FC<MenuItemCheckoutProps> = ({
  venue,
  selectedItem,
}) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen
  );
  const [desiredAmount, setDesiredAmount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});
  const dispatch = useDispatch();

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

  const handleClose = () => {
    dispatch(setSelectedItem(null));
    dispatch(setIsMenuCheckoutOpen(false));
  };

  return (
    <Dialog.Root open={isCheckoutOpen.isMenuCheckoutOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:bg-black/65 z-40" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg w-full h-full md:h-auto md:max-w-[480px] overflow-y-auto relative">
            <CloseButton
              color={venue?.webSettings.primaryColour || "#000"}
              onClick={handleClose}
              className="absolute top-2 right-2"
            />

            {selectedItem.images && selectedItem.images.length > 0 && (
              <div>
                {selectedItem.images.map((object) => (
                  <div
                    key={object.id}
                    style={{
                      backgroundImage: `url(${object.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                    className="object-cover w-full h-64"
                  />
                ))}
              </div>
            )}

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
                  <div key={modifier.id}>
                    <div className="p-4">
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
                  </div>
                ))}
              </div>
            )}

            <div className="flex w-full flex-col items-center p-4 gap-[10px]">
              <div className="flex gap-4">
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
                className="py-1 px-6 rounded-[40px] text-[18px]
                  text-white w-full font-[400]"
                style={{ backgroundColor: venue?.webSettings.primaryColour }}
              >
                Add to order • R$
                {(selectedItem.price * desiredAmount).toFixed(2)}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemCheckout;
