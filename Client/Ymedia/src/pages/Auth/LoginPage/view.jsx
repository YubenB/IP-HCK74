import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import { AuthForm } from "../../../components/Organism/AuthForm";
import illustration from "../../../assets/login.png";
import { Card, Alert } from "flowbite-react";
import { Link } from "react-router-dom";


// emailOrUsername={emailOrUsername}
// password={password}
// handleEmailOrUsernameChange={handleEmailUsernameChange}
// handlePasswordChange={handlePasswordChange}
// handleSubmit={handleSubmit}

const LoginPageView = ({
  handleGoogleSuccess,
  emailOrUsername,
  password,
  handleEmailOrUsernameChange,
  handlePasswordChange,
  handleSubmit,
  error,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-10">
          <img
            src={illustration}
            alt="Login Illustration"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <Card className="shadow-none h-[500px]">
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
            {error && (
              <Alert color="failure" className="mb-4">
                {error}
              </Alert>
            )}
            <AuthForm
              emailOrUsername={emailOrUsername}
              password={password}
              handleEmailOrUsernameChange={handleEmailOrUsernameChange}
              handlePasswordChange={handlePasswordChange}
              handleSubmit={handleSubmit}
            />
          </Card>
          <div className="flex justify-center mt-4">
            <GoogleLogin
              width="310px"
              text="Sign in with Google"
              onSuccess={(credentialResponse) => {
                return handleGoogleSuccess(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-600 hover:underline">
              Don&apos;t have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginPageView.propTypes = {
  emailOrUsername: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleEmailOrUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleGoogleSuccess: PropTypes.func.isRequired,
};

LoginPageView.defaultProps = {
  error: "",
};

export default LoginPageView;
