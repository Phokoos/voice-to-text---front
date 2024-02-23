import css from "./File.module.css";
import clsx from "clsx";
import {
  deleteTranscriptionById,
  fetchLLMDetailsByFileId,
} from "../../api/model";
import H5AudioPlayer from "react-h5-audio-player";
import { useContext, useRef, useState } from "react";
import FileContext from "./FileContext";
import Modal from "../ReportModal/ReportModal";
import Loader from "../Loader/Loader";

const File = ({ filename, transcript, id, deleteShow = false, model_name }) => {
  const [timeStamps, setTimeStamps] = useState(0); // новий стан для міток часу
  const playerRef = useRef();
  const { isOnline } = useContext(FileContext);
  const [risk, setRisk] = useState("");
  const [reportData, setReportData] = useState(false);
  // FOR MODAL TEST
  const [modalShow, setModalShow] = useState(false);
  const [isLoadingReport, setIsLoadingReport] = useState();
  const closeModal = () => setModalShow(false);
  // FOR MODAL TEST

  const clickDeleteBtn = async (event) => {
    event.preventDefault();
    const { id } = event.target;

    const req = await deleteTranscriptionById(id);

    if (req.ok) {
      event.target.parentNode.parentNode.style.display = "none";
    } else {
      console.log("something went wrong in (clickDeleteBtn()) - History page");
    }
  };
  const handleListen = (e) => {
    const currentTime = Math.floor(e.target.currentTime);
    if (currentTime % 1 === 0) {
      setTimeStamps(currentTime);
    }
  };

  const handleSkipTo = (time) => {
    const player = playerRef.current;

    if (player) {
      player.audio.current.currentTime = time;
      try {
        player.audio.current.play(); // а також await тут
      } catch (err) {
        console.error("Failed to start player ", err);
      }
    }
  };

  let status = "";
  let statusEmoji = "";
  if (risk) {
    if (risk <= 0.33) {
      status = "normal";
      statusEmoji = "👍";
    } else if (risk > 0.33 && risk <= 0.66) {
      status = "warning";
      statusEmoji = `⚠️`;
    } else {
      status = "dangerous";
      statusEmoji = "❗";
    }
  }

  const clickToReceiveDetail = async () => {
    setIsLoadingReport(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const detailData = await fetchLLMDetailsByFileId(id);
    setIsLoadingReport(false);
    setReportData(detailData);
    setModalShow(true);
    // console.log(detailData.risk);
    setRisk(Number(detailData.risk));
  };

  return (
    <>
      <div>
        <Modal show={modalShow} closeModal={closeModal} data={reportData} />
      </div>
      {transcript !== null && (
        <div className={css.block}>
          {isLoadingReport ? (
            <Loader />
          ) : (
            <>
              <div className={css.information}>
                <h3 className={clsx(css.title_name)}>
                  {filename}{" "}
                  <span style={{ fontSize: "30px" }}>
                    {isOnline && statusEmoji}
                  </span>
                </h3>

                {isOnline && (
                  <>
                    {status && (
                      <div
                        className={clsx(css.status_block, {
                          [css.normal]: status === "normal",
                          [css.warning]: status === "warning",
                          [css.dangerous]: status === "dangerous",
                        })}
                      >
                        <p>Risk:</p>
                        {status === "normal" && <p>Normal</p>}
                        {status === "warning" && <p>Warning</p>}
                        {status === "dangerous" && <p>Dangerous</p>}
                      </div>
                    )}

                    <button
                      type="button"
                      className={clsx("btn", "secondary")}
                      onClick={clickToReceiveDetail}
                    >
                      Report
                    </button>
                  </>
                )}
                {deleteShow && (
                  <button
                    type="button"
                    onClick={clickDeleteBtn}
                    id={id}
                    className={clsx("btn", "primary")}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className={css.data}>
                <h3>
                  <strong>Model: {model_name}</strong>
                </h3>
                <p>Transcript: {transcript.text}</p>
              </div>
              <br />
              <div style={{ maxWidth: "100%" }}>
                <H5AudioPlayer
                  ref={playerRef}
                  src={`http://localhost:8000/audiofile?file=${id + "_" + filename}`}
                  onListen={handleListen}
                />
              </div>
              <br />
              <div>
                <h3>Chunks part:</h3>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Timeslot</th>
                        <th>Text</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transcript.chunks.map((chunk) => (
                        <tr key={chunk.timestamp[0]}>
                          <td>
                            <button
                              key={Math.trunc(chunk.timestamp[0])}
                              onClick={() =>
                                handleSkipTo(Math.trunc(chunk.timestamp[0]))
                              }
                              className={clsx("btn", "primary", css.time_btn)}
                            >
                              [{Math.trunc(chunk.timestamp[0])}:
                              {Math.trunc(chunk.timestamp[1])}] Test:{" "}
                            </button>
                          </td>
                          <td className={css.table_text}>
                            {timeStamps >= Math.trunc(chunk.timestamp[0]) &&
                            timeStamps < Math.trunc(chunk.timestamp[1]) ? (
                              <span
                                style={{
                                  color: "#3791E6",
                                  fontWeight: "900",
                                  fontSize: "18px",
                                }}
                              >
                                {chunk.text}
                              </span>
                            ) : (
                              <span>{chunk.text}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default File;
