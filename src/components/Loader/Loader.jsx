import css from "./Loader.module.css";
import { Audio, ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className={css.loader_container}>
      <ThreeCircles height="200" width="200" color="#001D38" />
    </div>
  );
};

export default Loader;
