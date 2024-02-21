import UploadAudio from "../../components/Audio/UploadAudio";
import AudioPlayer from "../../components/Audio/AudioPlayer";

import css from "./Home.module.css";
import { fetchAllTranscriptions } from "../../api/model";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  // const [data, setData] = useState();
  const [loader, setLoader] = useState(false);

  return (
    <div className={css.home}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <UploadAudio />
        </>
      )}
    </div>
  );
};

export default Home;
