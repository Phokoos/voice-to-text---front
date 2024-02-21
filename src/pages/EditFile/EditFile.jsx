import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTranscriptionById } from "../../api/model";
import Loader from "../../components/Loader/Loader";
import css from "./EditFile.module.css";

const EditFile = () => {
  const { fileId } = useParams();
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    async function fetchOneFile() {
      try {
        setIsLoading(true);
        const responseReq = await fetchTranscriptionById(fileId);
        setData(responseReq);
        setTextareaValue(responseReq.transcript.text);
        setIsLoading(false);
      } catch (error) {
        console.log("Error in Edit File fetchOneFile(): ", error);
      }
    }

    fetchOneFile();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data && (
            <div className={css.container}>
              <h2 className={css.title}>{data.filename}</h2>
              <form>
                <textarea
                  className={css.textarea}
                  value={textareaValue}
                  onChange={(event) => {
                    setTextareaValue(event.target.value);
                  }}
                ></textarea>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditFile;
