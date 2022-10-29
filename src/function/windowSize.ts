import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { windowSizeAtom } from "../database/recoil";

export const useWindowResize = () => {
  const setWindowSize = useSetRecoilState(windowSizeAtom);
  useEffect(() => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });

    window.addEventListener("resize", function () {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    });
  }, []);
};
