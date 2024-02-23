import { useEffect, useState } from "react";
import { fetchAllTranscriptions } from "../../api/model";
import File from "../../components/File/File";
import Loader from "../../components/Loader/Loader";
import Modal from "../../components/ReportModal/ReportModal";

const History = () => {
  const [loader, setLoader] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchMyAPI = async () => {
      setLoader(true);
      let fetchedData = await fetchAllTranscriptions();
      // console.log(fetchedData);
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
                    model_name={element.model_name}
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
