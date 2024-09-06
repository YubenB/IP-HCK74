import PropTypes from "prop-types";
import { Button, Label, TextInput } from "flowbite-react";

export function AuthForm({
  emailOrUsername,
  email,
  password,
  username,
  handleSubmit,
  handleUsernameChange,
  handleEmailOrUsernameChange,
  handleEmailChange,
  handlePasswordChange,
}) {
  const path = window.location.pathname;

  const isLogin = path === "/login";
  const labelText = isLogin ? "Email or Username" : "Email";
  const placeholderText = isLogin
    ? "Write your username or email here"
    : "Write your email here";
  const inputValue = isLogin ? emailOrUsername : email;
  const handleEmailOrUsernameChangeFunc = isLogin
    ? handleEmailOrUsernameChange
    : handleEmailChange;

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <div className="mb-4">
          <Label htmlFor="username" className="mb-2 block">
            Username
          </Label>
          <TextInput
            id="username"
            type="text"
            placeholder="Your_user_name"
            value={username}
            onChange={handleUsernameChange}
            required
            shadow
          />
        </div>
      )}
      <div className="mb-4">
        <Label htmlFor="email" className="mb-2 block">
          {labelText}
        </Label>
        <TextInput
          id="email"
          type="text"
          placeholder={placeholderText}
          value={inputValue}
          onChange={handleEmailOrUsernameChangeFunc}
          required
          shadow
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="password" className="mb-2 block">
          Password
        </Label>
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          value={password}
          onChange={handlePasswordChange}
          required
          shadow
        />
      </div>

      <Button type="submit" color="blue" className="w-full">
        {isLogin ? "Login" : "Register"}
      </Button>
    </form>
  );
}

AuthForm.propTypes = {
  emailOrUsername: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string.isRequired,
  username: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func,
  handleEmailOrUsernameChange: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handlePasswordChange: PropTypes.func.isRequired,
};

AuthForm.defaultProps = {
  username: "",
  emailOrUsername: "",
  email: "",
  handleUsernameChange: () => {},
  handleEmailOrUsernameChange: () => {},
  handleEmailChange: () => {},
};
