import React, { useContext } from "react";
import { AppContest } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const loginstatus = useContext(AppContest);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const SignUp = () => {};
  const navigate = useNavigate();
  return (
    <div>
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
            <label htmlFor="">UserName</label>
            <input
              value={user.password}
              type="text"
              name="name"
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
            <button onClick={SignUp}>Sign Up</button>
            <button onClick={() => navigate("/login")}>
              Already Have Account
            </button>
          </div>
          {user.error && <p>Something went wrong</p>}
        </div>
      </div>
      );
    </div>
  );
}

export default SignUp;
