import { useContext, useEffect, useRef, useState } from "react";
import AudioContext from "./AudioContext";
import { useDropzone } from "react-dropzone";
import css from "./audio.module.css";
import {
  fetchAllModels,
  fetchTranscriptionById,
  postOneTranscriptions,
} from "../../api/model";
import File from "../File/File";
import clsx from "clsx";
import { json } from "react-router-dom";
import Loader from "../Loader/Loader";
import FileContext from "../File/FileContext";
import { ThreeCircles } from "react-loader-spinner";

export function UploadAudio() {
  const { onDrop, audioFile, setAudioFile } = useContext(AudioContext);
  const {
    homeFileData,
    setHomeFileData,
    homeLoader,
    setHomeLoader,
    showNavigation,
    setShowNavigation,
  } = useContext(FileContext);
  const [modelsList, setModelsList] = useState();
  const modelSelectRef = useRef(null);
  const [tramscribtionId, setTramscribtionId] = useState(null);
  const [condition, setCondition] = useState(true);
  const [renderFile, setRenderFile] = useState(false);
  const [pingCheker, setPingCheker] = useState(true);
  const [localLoader, setLocalLoader] = useState(false);

  useEffect(() => {
    setPingCheker(!pingCheker);
    const fetchModels = async () => {
      setHomeLoader(true);
      const models = await fetchAllModels();
      setModelsList(models);
      setHomeLoader(false);
    };
    fetchModels();
  }, []);

  const requestData = async (id) => {
    const response = await fetchTranscriptionById(id); // ваш запит
    const data = response;

    console.log(response.progress);

    setHomeFileData(data);
    setPingCheker(!pingCheker);

    // оновлюємо умову в залежності від даних
    if (response.progress === 100) {
      // ваша умова
      setCondition(true);
      setLocalLoader(false);
      setShowNavigation(true);
    }
    console.log(data);
    if (data.transcript !== null) {
      setRenderFile(true);
    }
  };

  // слідкуємо за змінами умови
  useEffect(() => {
    if (!condition) {
      const timer = setTimeout(() => requestData(tramscribtionId), 5000); // запит кожні 5 секунд

      return () => clearTimeout(timer); // очищуємо таймер при розмонтуванні
    }
  }, [condition, pingCheker]);

  const onClickSendAudio = async () => {
    const indexOfModel = modelSelectRef.current.value;

    setHomeLoader(true);
    setLocalLoader(true);
    setHomeFileData(false);
    setRenderFile(false);
    setCondition(true);
    setShowNavigation(false);
    const responseReq = await postOneTranscriptions(audioFile, indexOfModel);
    requestData(responseReq[0].id);
    setTramscribtionId(responseReq[0].id);
    setCondition(false);
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
          {localLoader ? (
            <>
              <br />
              <h3 style={{ color: "#001D38" }}>Please wait</h3>
              <br />
              <ThreeCircles height="100" width="100" color="#001D38" />
              {renderFile && (
                <h3 style={{ color: "#001D38" }}>
                  Progress {homeFileData.progress} %
                </h3>
              )}
            </>
          ) : (
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
          )}

          {audioFile && (
            <>
              <button
                type="button"
                className={clsx("btn", "primary")}
                style={{ marginBottom: "10px" }}
                onClick={onClickSendAudio}
              >
                Submit
              </button>
              <select ref={modelSelectRef}>
                {modelsList.map((option, index) => (
                  <option key={index} value={index}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
        </>
      )}

      {renderFile && (
        <File
          filename={homeFileData.filename}
          transcript={homeFileData.transcript}
          id={homeFileData.id}
          model_name={homeFileData.model_name}
        />
      )}
    </>
  );
}

export default UploadAudio;
