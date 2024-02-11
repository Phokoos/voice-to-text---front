import { useContext } from "react";
import AudioContext from "./AudioContext";
import { useDropzone } from "react-dropzone";
import css from "./audio.module.css";

export function UploadAudio() {
  const { onDrop } = useContext(AudioContext);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={css.drop_container} {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drug and drop audio</p>
    </div>
  );
}

export default UploadAudio;
