import UploadAudio from "../../components/Audio/UploadAudio";
import AudioPlayer from "../../components/Audio/AudioPlayer";
import css from "./Home.module.css";

const Home = () => {
  return (
    <div className={css.home}>
      <UploadAudio />
      <AudioPlayer />
    </div>
  );
};

export default Home;
