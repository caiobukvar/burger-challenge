import { setIsMenuCheckoutOpen } from "@/store/reducers/menuCheckoutReducer";
import { CloseButtonProps } from "@/types/types";
import { useDispatch } from "react-redux";

const CloseButton: React.FC<CloseButtonProps> = ({ color }) => {
  const dispatch = useDispatch();

  const closeMenuItemCheckout = () => {
    dispatch(setIsMenuCheckoutOpen(false));
  };

  return (
    <button
      className="absolute  top-10 right-4 flex items-center justify-center cursor-pointer w-7 h-7 rounded-full bg-white"
      onClick={closeMenuItemCheckout}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: "auto" }}
      >
        <path
          d="M11.7338 0.275313C11.3788 -0.0796359 10.8055 -0.0796359 10.4505 0.275313L6 4.71672L1.54949 0.266212C1.19454 -0.0887372 0.62116 -0.0887372 0.266212 0.266212C-0.0887372 0.62116 -0.0887372 1.19454 0.266212 1.54949L4.71672 6L0.266212 10.4505C-0.0887372 10.8055 -0.0887372 11.3788 0.266212 11.7338C0.62116 12.0887 1.19454 12.0887 1.54949 11.7338L6 7.28328L10.4505 11.7338C10.8055 12.0887 11.3788 12.0887 11.7338 11.7338C12.0887 11.3788 12.0887 10.8055 11.7338 10.4505L7.28328 6L11.7338 1.54949C12.0796 1.20364 12.0796 0.62116 11.7338 0.275313Z"
          fill={color}
        />
      </svg>
    </button>
  );
};

export default CloseButton;
