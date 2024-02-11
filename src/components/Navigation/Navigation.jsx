import { Link, Outlet, useMatch } from "react-router-dom";
import css from "./Navigation.module.css";
import { useContext } from "react";
import AuthContext from "../Auth/AuthContext";
import clsx from "clsx";

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
  const btnLogOutHandler = (e) => {
    e.preventDefault();
    console.log(isAuthenticated);
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav className={css.nav}>
        <div className={css.links}>
          <CustomLink to="/" className="item" activeClassName="active">
            Home
          </CustomLink>
          <CustomLink to="/second" className="item" activeClassName="active">
            Second page
          </CustomLink>
        </div>
        <button
          type="button"
          className={clsx("btn secondary", css.btn)}
          onClick={btnLogOutHandler}
        >
          Log&nbsp;out
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default NavigationTop;
