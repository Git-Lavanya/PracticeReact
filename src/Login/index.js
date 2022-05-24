import React from "react";
import { AuthContext } from "../context";
const Login = () => {
  const { authContext } = React.useContext(AuthContext);
  const { username, password } = authContext;
  const [authDetails, setAuthDetails] = React.useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {
    if (authDetails.username === username && authDetails.password === password) {
      alert("successfully login");
    } else {
      alert("username and password is not correct");
    }
  };
  return (
    <div className="login-box">
      <label>Username</label>
      <input type="text" onChange={(e) => setAuthDetails({ ...authDetails, username: e.target.value })} />
      <label>Password</label>
      <input type="text" onChange={(e) => setAuthDetails({ ...authDetails, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
export default Login;
