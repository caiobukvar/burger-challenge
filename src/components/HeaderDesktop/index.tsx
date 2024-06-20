import { MenuProps } from "@/types/types";

const HeaderDesktop: React.FC<MenuProps> = ({ venue }) => {
  const bgColor = venue?.webSettings?.navBackgroundColour;

  return (
    <div
      className="hidden items-center min-w-full
      h-16 text-white md:flex justify-center"
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      <div>
        <p className="font-[20px] w-[232px] text-center">MENU</p>
      </div>
      <div>
        <p className="font-[20px] w-[232px] text-center">ENTRAR</p>
      </div>
      <div>
        <p className="font-[20px] w-[232px] text-center">CONTATO</p>
      </div>
    </div>
  );
};

export default HeaderDesktop;
