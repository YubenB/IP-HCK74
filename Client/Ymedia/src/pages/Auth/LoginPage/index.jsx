import { useState } from "react";
import LoginPageView from "./view";
import { postLogin } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const fetchPostLogin = async () => {
    try {
      const response = await postLogin(emailOrUsername, password);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        nav("/");
      } else {
        setError("Unexpected error occured. Please try again");
      }
    } catch (error) {
      console.log(error, "????");
      setError(error.response.data.message);
      console.log(setError, "<><>");
    }
  };

  const handleEmailOrUsernameChange = (e) => {
    setEmailOrUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPostLogin();
  };

  return (
    <LoginPageView
      error={error}
      emailOrUsername={emailOrUsername}
      password={password}
      handleEmailOrUsernameChange={handleEmailOrUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
