import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPageView from "./view";
import { postGoogleAuth, postLogin } from "../../../utils/api";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailUsernameChange = (e) => {
    setEmailOrUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await postLogin(emailOrUsername, password);

      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleGoogleAuth = async (credential) => {
    try {
      const response = await postGoogleAuth(credential);

      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSuccess = (response) => {
    handleGoogleAuth(response.credential);
  };

  return (
    <LoginPageView
      handleGoogleSuccess={handleGoogleSuccess}
      error={error}
      emailOrUsername={emailOrUsername}
      password={password}
      handleEmailOrUsernameChange={handleEmailUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
