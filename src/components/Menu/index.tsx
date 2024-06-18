import { MenuProps, Venue } from "@/types/types";

const Menu: React.FC<MenuProps> = ({ venue }) => {
  return (
    <div>
      <div>burgers</div>
      <div>drinks</div>
      <div>desserts</div>
    </div>
  );
};

export default Menu;
