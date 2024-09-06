import PropTypes from "prop-types";
import { Card, Alert } from "flowbite-react";
import { AuthForm } from "../../../components/Organism/AuthForm";
import illustration from "../../../assets/register.png";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const RegisterPageView = ({
  error,
  email,
  password,
  username,
  handlePasswordChange,
  handleEmailChange,
  handleUsernameChange,
  handleSubmit,
  handleGoogleSuccess,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <img
            src={illustration}
            alt="Register Illustration"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <Card className="shadow-none h-[500px]">
            <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
            {error && (
              <Alert color="failure" className="mb-4">
                {error}
              </Alert>
            )}
            <AuthForm
              email={email}
              username={username}
              password={password}
              handleEmailChange={handleEmailChange}
              handleUsernameChange={handleUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleSubmit={handleSubmit}
            />
          </Card>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              width="310px"
              text="Sign up with Google"
              onSuccess={(credentialResponse) => {
                return handleGoogleSuccess(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterPageView.propTypes = {
  error: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

RegisterPageView.defaultProps = {
  error: "",
};

export default RegisterPageView;
