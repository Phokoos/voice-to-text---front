import { useContext, useState } from "react";
import AudioContext from "./AudioContext";
import { useDropzone } from "react-dropzone";
import css from "./audio.module.css";
import { postOneTranscriptions } from "../../api/model";
import File from "../File/File";
import clsx from "clsx";
import { json } from "react-router-dom";
import Loader from "../Loader/Loader";
import FileContext from "../File/FileContext";

export function UploadAudio() {
  const { onDrop, audioFile, setAudioFile } = useContext(AudioContext);
  const { homeFileData, setHomeFileData, homeLoader, setHomeLoader } =
    useContext(FileContext);
  // const [loader, setLoader] = useState(false);

  const onClickSendAudio = async () => {
    setHomeLoader(true);
    setHomeFileData(false);
    const responseReq = await postOneTranscriptions(audioFile);
    setHomeFileData(responseReq);
    setAudioFile(false);
    setHomeLoader(false);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {homeLoader ? (
        <Loader />
      ) : (
        <>
          <div className={css.drop_container} {...getRootProps()}>
            {audioFile ? (
              <p>{audioFile.name}</p>
            ) : (
              <>
                <input {...getInputProps()} />
                <p>Drug and drop audio</p>
              </>
            )}
          </div>
          {audioFile ? (
            <button
              type="button"
              className={clsx("btn", "primary")}
              onClick={onClickSendAudio}
            >
              Submit
            </button>
          ) : (
            <h3 className={css.choose_file}>Please choose file</h3>
          )}
        </>
      )}

      {homeFileData && (
        <File
          filename={homeFileData.results[0].filename}
          transcript={JSON.parse(homeFileData.results[0].transcript)}
          id={homeFileData.results[0].id}
        />
      )}
    </>
  );
}

export default UploadAudio;
