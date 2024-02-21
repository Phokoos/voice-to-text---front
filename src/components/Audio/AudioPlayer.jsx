import { useContext } from "react";
import AudioContext from "./AudioContext";
import H5AudioPlayer from "react-h5-audio-player";
import css from "./audio.module.css";

const AudioPlayer = ({ audioFile }) => {
  // const { audioFile } = useContext(AudioContext);

  return audioFile ? (
    <div className={css.player_container}>
      <H5AudioPlayer src={URL.createObjectURL(audioFile)} />
    </div>
  ) : null;
};

export default AudioPlayer;
