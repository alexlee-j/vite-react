import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeMode } from "@/redux/modules/themeSlice";
import SunCalc from "suncalc";
import { SUNCALC_COORDINATES } from "@/constant";

const useDarkTheme = (userChoose: boolean, themeMode: string) => {
  const dispatchDarkMode = useDispatch();
  const times = SunCalc.getTimes(
    new Date(),
    SUNCALC_COORDINATES.lat,
    SUNCALC_COORDINATES.lon
  );
  const inNight = new Date() > times.sunset || new Date() < times.sunrise;

  useEffect(() => {
    const handleDarkTheme = () => {
      if (userChoose) return;
      if (themeMode === "light" && inNight) {
        dispatchDarkMode(changeMode({ mode: "dark" }));
      } else if (themeMode === "dark" && !inNight) {
        dispatchDarkMode(changeMode({ mode: "light" }));
      }
    };

    window.addEventListener("mousemove", handleDarkTheme);
    window.addEventListener("keydown", handleDarkTheme);

    return () => {
      window.removeEventListener("mousemove", handleDarkTheme);
      window.removeEventListener("keydown", handleDarkTheme);
    };
  }, [userChoose, themeMode, inNight, dispatchDarkMode]);
};

export { useDarkTheme };
