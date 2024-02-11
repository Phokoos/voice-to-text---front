import { Link, Outlet } from "react-router-dom";

export const One = () => {
  return <h4>One</h4>;
};

export const Two = () => {
  return <h4>Two</h4>;
};

export const Three = () => {
  return <h4>Three</h4>;
};

const Group = () => {
  return (
    <>
      <h2>Group</h2>
      <ul>
        <li>
          <Link to="one">One</Link>
        </li>
        <li>
          <Link to="two">Two</Link>
        </li>
        <li>
          <Link to="three">Three</Link>
        </li>
        <Outlet />
      </ul>
    </>
  );
};

export default Group;
