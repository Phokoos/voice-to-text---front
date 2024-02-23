import css from "./ReportModal.module.css";
import { useEffect } from "react";

function ProgressBar({ progress }) {
  return (
    <div className={css.progress_block}>
      <div
        className={css.progress_dott}
        style={{ left: `calc(${progress * 100}% - 10px)` }}
      />
    </div>
  );
}

const Modal = ({ show, closeModal, data }) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  console.log(data);

  if (!show) {
    return null;
  }

  return (
    <>
      <div className={css.overlay} onClick={closeModal} />
      <div className={css.modal}>
        <h2 className={css.title}>Report</h2>
        <div>
          <p className={css.entities}>
            Entities: <span>{data.entities}</span>
          </p>
          <ul className={css.list}>
            <li className={css.item}>
              <nobr>Confidence: {data.confidence * 100}%</nobr>
              <ProgressBar progress={data.confidence} />
            </li>
            <li className={css.item}>
              <nobr>Sentiment: {data.sentiment * 100}%</nobr>
              <ProgressBar progress={data.sentiment} />
            </li>
            <li className={css.item}>
              <nobr>Risk: {data.risk * 100}%</nobr>
              <ProgressBar progress={data.risk} />
            </li>
          </ul>
          <ul className={css.conversation_list}>
            {data.conversation.transcript.map((elem) => {
              return (
                <li className={css.conversation_item}>
                  <span>{elem.speaker}</span>: {elem.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Modal;
