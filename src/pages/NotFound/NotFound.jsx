import css from "./NotFound.module.css";
import NavigationTop from "../components/Navigation/Navigation";

const NotFound = () => {
  return (
    <>
      <NavigationTop />
      <div className={css.container}>
        <h2>404 Error</h2>
        <h4>Not Found</h4>
      </div>
    </>
  );
};

export default NotFound;
