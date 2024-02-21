import css from "./History.module.css";
import { useEffect, useRef, useState } from "react";
import { fetchAllTranscriptions } from "../../api/model";
import File from "../../components/File/File";
import { Audio } from "react-loader-spinner";
import Loader from "../../components/Loader/Loader";

const History = () => {
  const [loader, setLoader] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchMyAPI = async () => {
      setLoader(true);
      let fetchedData = await fetchAllTranscriptions();
      setData(fetchedData);
      setLoader(false);
    };

    fetchMyAPI();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {!data ? (
            <h3>No data!</h3>
          ) : (
            <ul>
              {data.map((element) => (
                <li key={element.id} id={element.id}>
                  <File
                    id={element.id}
                    filename={element.filename}
                    transcript={element.transcript}
                    deleteShow={true}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default History;
