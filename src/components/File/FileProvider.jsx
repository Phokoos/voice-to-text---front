import { useState } from "react";
import FileContext from "./FileContext";

export default function FileProvider({ children }) {
  const [homeFileData, setHomeFileData] = useState(false);
  const [homeLoader, setHomeLoader] = useState(false);

  const value = { homeFileData, setHomeFileData, homeLoader, setHomeLoader };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
}
