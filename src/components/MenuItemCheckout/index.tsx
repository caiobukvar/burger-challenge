import { setIsMenuCheckoutOpen } from "@/store/reducers/menuCheckoutReducer";
import { RootState } from "@/store/store";
import { MenuProps } from "@/types/types";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "../CloseIcon";

const MenuItemCheckout: React.FC<MenuProps> = ({ venue }) => {
  const isCheckoutOpen = useSelector(
    (state: RootState) => state.isMenuCheckoutOpen
  );

  const bgColor = venue?.webSettings.primaryColour;
  console.log(bgColor);

  return (
    <Dialog.Root open={isCheckoutOpen.isMenuCheckoutOpen}>
      <Dialog.Overlay className="fixed inset-0 bg-white" />
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 flex flex-col  ">
          <Image src="" alt="item image" className="w-auto" height={265} />

          <div>
            <p className="text-2xl">title</p>
            <p className="text-xl">description</p>
          </div>
          <div>
            <p className="text-2xl">Choose your size</p>
            <p className="text-xl">Select 1 option</p>

            {/* checkbox de um map com 1 2 3 carnes + valor */}
          </div>

          <div className="flex w-full flex-col items-center">
            <div className="flex gap-4">
              <button>-</button>
              <p>qte</p>
              <button>+</button>
            </div>

            <button
              className="py-1 px-6 rounded-[40px]"
              style={{ backgroundColor: bgColor }}
            >
              Add to order IMAGEM PONTO R$valor
            </button>
          </div>
          <CloseIcon color={bgColor || "#000"} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default MenuItemCheckout;
