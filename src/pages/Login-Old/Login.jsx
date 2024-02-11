import { Navigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../../components/LoginForm-Old/LoginForm";

export const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleSubmit = async (values) => {
    // const response = await FakeAPI.login(values);
    setLoginSuccess(true);
  };

  if (loginSuccess) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <h1>Login page</h1>
      <LoginForm />
    </>
  );
};
