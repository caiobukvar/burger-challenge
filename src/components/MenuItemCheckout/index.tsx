import MinusBtn from "@/assets/images/minusButton.svg";
import PlusBtn from "@/assets/images/plusButton.svg";
import {
  addItem,
  updateItemModifiers,
  updateItemPrice,
  updateItemQuantity,
} from "@/store/reducers/cartReducer";
import { RootState } from "@/store/store";
import { CartItem, MenuItemCheckoutProps } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseButton from "../CloseButton";

const MenuItemCheckout: React.FC<MenuItemCheckoutProps> = ({
  venue,
  selectedItem,
  onClose,
}) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen.isMenuCheckoutOpen
  );
  const cart = useSelector((state: RootState) => state.cartItems);
  const [desiredAmount, setDesiredAmount] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number;
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedItem?.modifiers) {
      const initialSelectedOptions = selectedItem?.modifiers.reduce(
        (acc, modifier) => {
          if (modifier.items.length > 0) {
            acc[modifier.id] = modifier.items[0].id;
          }
          return acc;
        },
        {} as { [key: number]: number }
      );
      setSelectedOptions(initialSelectedOptions);
    }
  }, [selectedItem]);

  if (!selectedItem) {
    return null;
  }

  const handleAmount = (type: "minus" | "plus") => {
    if (type === "minus") {
      setDesiredAmount((prev) => Math.max(1, prev - 1));
    } else if (type === "plus") {
      setDesiredAmount((prev) => prev + 1);
    }
  };

  const handleRadioChange = (modifierId: number, itemId: number) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [modifierId]: itemId,
    }));
  };

  const mapSelectedOptionsToFullDetails = () => {
    if (!selectedItem?.modifiers) return {};

    return selectedItem.modifiers.reduce((acc, modifier) => {
      const selectedItemId = selectedOptions[modifier.id];
      const selectedModifierItem = modifier.items.find(
        (item) => item.id === selectedItemId
      );
      if (selectedModifierItem) {
        acc[modifier.id] = {
          ...modifier,
          selectedItem: selectedModifierItem,
        };
      }
      return acc;
    }, {} as { [key: number]: { name: string; selectedItem: { id: number; name: string; price: number } } });
  };

  const calculateTotalPrice = () => {
    let totalPrice = selectedItem.price * desiredAmount;

    if (selectedItem.modifiers) {
      Object.keys(selectedOptions).forEach((modifierIdString) => {
        const modifierId = Number(modifierIdString);
        const modifier = selectedItem.modifiers?.find(
          (m) => m.id === modifierId
        );

        if (modifier) {
          const selectedItem = modifier.items.find(
            (item) => item.id === selectedOptions[modifierId]
          );
          if (selectedItem) {
            totalPrice += selectedItem.price;
          }
        }
      });
    }

    return totalPrice.toFixed(2);
  };

  const handleAddToOrder = () => {
    const totalPriceToAdd = parseFloat(calculateTotalPrice());
    const fullModifiers = mapSelectedOptionsToFullDetails();

    const itemExistsInCart = cart.find(
      (item: CartItem) => item.id === selectedItem.id
    ) as CartItem | undefined;

    if (itemExistsInCart) {
      const updatedQuantity = itemExistsInCart.quantity + desiredAmount;
      const updatedPrice = itemExistsInCart.price + totalPriceToAdd;

      dispatch(
        updateItemQuantity({
          id: selectedItem.id,
          quantity: updatedQuantity,
        })
      );

      dispatch(
        updateItemModifiers({
          id: selectedItem.id,
          modifiers: fullModifiers,
        })
      );

      dispatch(
        updateItemPrice({
          id: selectedItem.id,
          price: updatedPrice,
        })
      );
    } else {
      dispatch(
        addItem({
          id: selectedItem.id,
          name: selectedItem.name,
          price: totalPriceToAdd,
          quantity: desiredAmount,
          modifiers: fullModifiers,
        })
      );
    }

    onClose();
  };

  console.log("selectedItem", selectedItem);
  return (
    <Dialog.Root open={isCheckoutOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:bg-black/65 z-40" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg w-full h-full md:h-auto md:max-w-[480px] overflow-y-auto relative">
            <CloseButton
              color={venue?.webSettings.primaryColour || "#000"}
              onClick={onClose}
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
                onClick={handleAddToOrder}
                className="py-1 px-6 rounded-[40px] text-[18px] text-white w-full font-[400]"
                style={{ backgroundColor: venue?.webSettings.primaryColour }}
              >
                Add to order • R${calculateTotalPrice()}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemCheckout;
