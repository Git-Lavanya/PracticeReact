import React from "react";
import Login from "./Login";
import Register from "./Register";
import Calc from "./calc";
import { Type } from "./Typewriting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context";

function App() {
  const [authContext, setAuthContext] = React.useState("");
  const setTokens = (data) => {
    setAuthContext(data);
  };
  return (
    <AuthContext.Provider value={{ authContext, setAuthContext: setTokens }}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/calculator" element={<Calc />} exact />
          <Route path="/Type" element={<Type />} exact />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
