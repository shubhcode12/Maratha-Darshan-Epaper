import React, { useState } from "react";
import TextInput from "../TextInput";

function Login({ login, register }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginBtnPress = async () => {
    setLoading(true);
    try {
      await login(email, pass);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const registerBtnPress = async () => {
    setLoading(true);
    try {
      await register(email, pass);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div className="login-card-content">
        <h1>Admin login</h1>
        <TextInput label="Email id" id="email" name="email" onChangeValue={setEmail} />
        <TextInput label="Password" id="pass" name="pass" onChangeValue={setPass} type="password" />
        {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}
        <div className="card-action">
          <button className={`btn${loading ? " loading" : ""}`} onClick={loginBtnPress} disabled={loading}>
            Login
          </button>
          <button className={`btn${loading ? " loading" : ""}`} onClick={registerBtnPress} disabled={loading}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
