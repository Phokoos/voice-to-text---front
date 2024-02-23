import { useState } from "react";
import FileContext from "./FileContext";

export default function FileProvider({ children }) {
  const [homeFileData, setHomeFileData] = useState(false);
  const [homeLoader, setHomeLoader] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  const value = {
    homeFileData,
    setHomeFileData,
    homeLoader,
    setHomeLoader,
    isOnline,
    setIsOnline,
    showNavigation,
    setShowNavigation,
  };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}
