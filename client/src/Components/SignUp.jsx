import React, { useContext } from "react";
import { AppContext } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function SignUp() {
  const navigate = useNavigate();

  // loginstatus context to save login details 
  // {login:true, msg:''}
  const loginStatus = useContext(AppContext);

  // usestate to store data of input fileds
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  // handle funtion to update data in usestate on change of the data in input field
  // [name]: value update the key value pair
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // signup function to post data to backend
  const SignUp = () => {
    // check wheather inputs are empty
    if (user.name == "" || user.email == "" || user.password == "") {
      loginStatus.setStatus({
        ...loginStatus.status,
        msg: "field should not be empty",
      });
    } else {
      axios.post("signup", user).then(() => {
        navigate("/login");
      });
    }
  };
  return (
    <div>
      <div className="loginContainer">
        <div className="login">
          <div className="inputfield">
            <label htmlFor="">Email</label>
            <input
              value={user.email}
              type="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">UserName</label>
            <input
              value={user.name}
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputfield">
            <label htmlFor="">Password</label>
            <input
              value={user.password}
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginBtn">
            <button onClick={SignUp}>Sign Up</button>
            <button onClick={() => navigate("/login")}>
              Already Have Account
            </button>
          </div>
          <p>{loginStatus.status.msg}</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
