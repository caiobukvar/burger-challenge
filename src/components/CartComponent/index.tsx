import { RootState } from "@/store/store";
import * as Dialog from "@radix-ui/react-dialog";
import { useSelector } from "react-redux";
import CloseButton from "../CloseButton";
import { CartComponentProps, Venue } from "@/types/types";
import CloseIcon from "@/assets/images/close-icon.svg";
import Image from "next/image";
import MinusBtn from "@/assets/images/minusButton.svg";
import PlusBtn from "@/assets/images/plusButton.svg";

const CartComponent: React.FC<CartComponentProps> = ({
  venue,
  onClose,
  cartItems,
}) => {
  const isCartOpen = useSelector(
    (state: RootState) => state.isCartOpen.isCartOpen
  );
  console.log("cartItems on checkout", cartItems);

  const calculateFinalPrice = () => {
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice.toFixed(2);
  };

  return (
    <Dialog.Root open={isCartOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 md:hidden" />
        <Dialog.Content className="fixed inset-0 flex flex-col items-center z-50 bg-[#F8F9FA] ">
          <div className="flex h-[64px] justify-center w-full items-center bg-white border-b-[1px]">
            <p className="text-[18px] font-[500]">Basket</p>
          </div>
          <Dialog.Close
            color={venue?.webSettings.primaryColour || "#000"}
            onClick={onClose}
            className="absolute top-4 right-0 w-8 h-8 z-60"
          >
            <Image src={CloseIcon} alt="close" />
          </Dialog.Close>

          <div className="bg-white w-full flex flex-col gap-2 ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex p-4 border-b-[1px] border-[#DADADA]"
              >
                <div className="flex flex-col w-full">
                  <div className="flex w-full justify-between text-[#121212]">
                    <p className="font-[400] text-[16px]">{item.name}</p>
                    <p className="font-[500] text-[16px]">
                      R${item.price.toFixed(2)}
                    </p>
                  </div>
                  {item.modifiers && Object.keys(item.modifiers).length > 0 && (
                    <div>
                      {Object.values(item.modifiers).map((modifier) => (
                        <div
                          key={modifier.id}
                          className="text-[14px] text-gray-600"
                        >
                          <p>
                            {modifier.selectedItem.name} (+R$
                            {modifier.selectedItem.price.toFixed(2)})
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4 mt-2">
                    <button
                      // onClick={() => handleCart("minus")}
                      className="flex items-center justify-center size-5 rounded-full bg-[#DADADA]"
                    >
                      <Image src={MinusBtn} alt="minus" height={8} width={8} />
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      // onClick={() => handleCart("plus")}
                      className="flex items-center justify-center size-5 rounded-full bg-[#4F372F]"
                    >
                      <Image src={PlusBtn} alt="plus" height={8} width={8} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col w-full px-4  ">
            <div className="flex justify-between w-full py-4">
              <p className="text-[#121212]">Sub total</p>
              <p className="text-[#121212] font-[500]">
                R${calculateFinalPrice()}
              </p>
            </div>
            <div className="flex justify-between w-full py-3 border-t-[1px] border-[#DADADA]">
              <p className="text-[#121212] text-[24px] font-[300]">Total:</p>
              <p className="text-[#121212]  text-[24px] font-[700]">
                R${calculateFinalPrice()}
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default CartComponent;
