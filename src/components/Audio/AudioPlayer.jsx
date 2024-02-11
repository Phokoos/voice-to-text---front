import { useContext } from "react";
import AudioContext from "./AudioContext";
import H5AudioPlayer from "react-h5-audio-player";
import css from "./audio.module.css";

const AudioPlayer = () => {
  const { audioFile } = useContext(AudioContext);

  return audioFile ? (
    <div className={css.player_container}>
      <H5AudioPlayer src={audioFile} />
    </div>
  ) : null;
};

export default AudioPlayer;
