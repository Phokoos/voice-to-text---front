import React, { useState } from "react";
import AudioContext from "./AudioContext";

export default function AudioProvider({ children }) {
  const [audioFile, setAudioFile] = useState();

  const onDrop = (acceptedFiles) => {
    // setAudioFile(URL.createObjectURL(acceptedFiles[0]));
    setAudioFile(acceptedFiles[0]);
  };

  const value = { audioFile, onDrop, setAudioFile };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}
