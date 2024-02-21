import css from "./File.module.css";
import clsx from "clsx";
import { deleteTranscriptionById } from "../../api/model";
import H5AudioPlayer from "react-h5-audio-player";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const File = ({ filename, transcript, id, deleteShow = false }) => {
  const [timeStamps, setTimeStamps] = useState(0); // новий стан для міток часу
  const playerRef = useRef();
  const navigate = useNavigate();
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

  return (
    <div className={css.block}>
      <div className={css.information}>
        <h3 className={css.title_id}>Id: {id}</h3>
        <button type="button" className={clsx("btn", "primary")}>
          Edit
        </button>
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
          <strong>{filename}</strong>
        </h3>
        <p>Transcript: {transcript.text}</p>
      </div>
      <br />
      <div style={{ maxWidth: "100%" }}>
        <H5AudioPlayer
          ref={playerRef}
          src={`http://localhost:8000/audiofile?file=${filename}`}
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
                      {Math.trunc(chunk.timestamp[1])}]
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
    </div>
  );
};

export default File;
