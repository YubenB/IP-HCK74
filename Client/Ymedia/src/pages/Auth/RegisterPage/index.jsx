import { useState } from "react";
import { postRegister } from "../../../utils/api";
import RegisterPageView from "./view";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nav = useNavigate();

  const fetchPostRegister = async () => {
    try {
      const response = await postRegister(email, username, password);
      if (response.status === 200) {
        nav("/login");
      } else {
        setError("Unexpected error occured. Please try again");
      }
    } catch (error) {
      console.log(error, "????");
      setError(error.response.data.message);
      console.log(setError, "<><>");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPostRegister();
  };

  const handleGoogleSuccess = (response) => {
    nav("/");
  };

  return (
    <RegisterPageView
      handleGoogleSuccess={handleGoogleSuccess}
      error={error}
      email={email}
      username={username}
      password={password}
      handleEmailChange={handleEmailChange}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterPage;
