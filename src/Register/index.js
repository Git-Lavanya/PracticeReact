import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";
const Register = () => {
  const navigate = useNavigate();
  const { setAuthContext } = useContext(AuthContext);
  const [register, setRegister] = React.useState({
    username: "",
    password: "",
  });
  const onRegister = () => {
    setAuthContext(register);
    navigate("/login");
  };
  return (
    <div className="login-box">
      <label>Username</label>
      <input type="text" onChange={(e) => setRegister({ ...register, username: e.target.value })} />
      <label>Password</label>
      <input type="text" onChange={(e) => setRegister({ ...register, password: e.target.value })} />
      <button onClick={onRegister}>Register</button>
    </div>
  );
};
export default Register;
