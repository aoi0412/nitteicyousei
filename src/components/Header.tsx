import { appColor } from "../types/color";

const Header = () => {
  return (
    <div
      style={{
        backgroundColor: appColor.main,
        height: 60,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
      }}
    >
      <h1 style={{ height: 52 }}>logo</h1>
    </div>
  );
};

export default Header;
