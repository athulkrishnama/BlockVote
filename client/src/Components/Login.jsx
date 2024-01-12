import React, { useContext } from "react";
import { AppContest } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const loginstatus = useContext(AppContest);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const logIn = () => {};
  const navigate = useNavigate()
  return (
    <div className="loginContainer">
        <div className="login">
          <div className="inputfield">
            <label htmlFor="">Email</label>
            <input
              value={user.name}
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">Password</label>
            <input
              value={user.password}
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="loginBtn">
            <button onClick={logIn}>Login</button>
            <button onClick={()=>navigate('/signup')}>Create Account</button>
          </div>
          {user.error && <p>Something went wrong</p>}
        </div>
    </div>
  );
}

export default Login;
