import { Link, Outlet, useMatch } from "react-router-dom";
import css from "./Navigation.module.css";
import { useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import clsx from "clsx";
import FileContext from "../File/FileContext";
// import * as path from "path";

const CustomLink = ({ to, className, activeClassName, ...props }) => {
  const match = useMatch(to);
  return (
    <Link
      to={to}
      className={
        match ? `${css[className]} ${css[activeClassName]}` : css[className]
      }
      {...props}
    />
  );
};
const NavigationTop = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { isOnline, setIsOnline, showNavigation, setShowNavigation } =
    useContext(FileContext);

  const btnLogOutHandler = (e) => {
    e.preventDefault();
    console.log(isAuthenticated);
    setIsAuthenticated(false);
  };

  return (
    <>
      {showNavigation && (
        <nav className={css.nav}>
          <div className={css.links}>
            <CustomLink to="/" className="item" activeClassName="active">
              Home
            </CustomLink>
            <CustomLink to="/history" className="item" activeClassName="active">
              History
            </CustomLink>
            {/*<CustomLink to="/second" className="item" activeClassName="active">*/}
            {/*  Second page*/}
            {/*</CustomLink>*/}
          </div>
          {/*<button*/}
          {/*  type="button"*/}
          {/*  className={clsx("btn secondary", css.btn)}*/}
          {/*  onClick={btnLogOutHandler}*/}
          {/*>*/}
          {/*  Log&nbsp;out*/}
          {/*</button>*/}
          <div className={css.status_container}>
            <div style={{ color: isOnline ? "#6dc46d" : "#ff4545" }}>
              {isOnline ? <p>Online</p> : <p>Offline</p>}
            </div>
            <div
              style={{ backgroundColor: isOnline ? "#6dc46d" : "#ff4545" }}
              className={css.status}
            ></div>
          </div>
        </nav>
      )}

      <Outlet />
    </>
  );
};

export default NavigationTop;
