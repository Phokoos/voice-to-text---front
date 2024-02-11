import { useContext, useState } from "react";
import AuthContext from "../../components/Auth/AuthContext";
import css from "./Login.module.css";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { Navigate } from "react-router-dom";
import { fetchAuth } from "../../api/auth";

const Login = () => {
  // Оголошує ід для інпутів
  const loginInputId = nanoid();
  const emailInputId = nanoid();
  const passwordInputId = nanoid();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  // const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSend = async (e) => {
    e.preventDefault();
    console.log("Login: ", login);
    console.log("Email: ", email);
    console.log("Password: ", password);

    await fetchAuth({ login, password });

    setIsAuthenticated(true);
    return <Navigate to={"/"} replace />;
  };

  return (
    <div className={css.container}>
      <form onSubmit={loginSend} className={css.form}>
        <div className="input_block">
          <label htmlFor={loginInputId} className="label">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter login"
            name="login"
            className="input"
            value={login}
            id={loginInputId}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="input_block">
          <label htmlFor={emailInputId} className="label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            className="input"
            value={email}
            id={emailInputId}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input_block">
          <label htmlFor={passwordInputId} className="label">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            className="input"
            value={password}
            id={passwordInputId}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={clsx("btn primary", css.btn)}>
          Log in
        </button>
      </form>
      {/*<button type="button" onClick={btnLogInHandler}>*/}
      {/*  Log in*/}
      {/*</button>*/}
    </div>
  );
};

export default Login;
