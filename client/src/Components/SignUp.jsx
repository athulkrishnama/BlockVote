import React, { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCookies } from "react-cookie";

function SignUp() {
  const navigate = useNavigate();

  // loginstatus context to save login details
  // {login:true, msg:''}
  const loginStatus = useContext(AppContext);

  // usestate to store data of input fileds
  const [user, setUser] = useState({ name: "", email: "", password: "" ,metaid:""});

  // cookie to save user details
  const [cookie, setCookie] = useCookies(["user"]);

  // handle funtion to update data in usestate on change of the data in input field
  // [name]: value update the key value pair
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // signup function to post data to backend
  const SignUp = () => {
    // check wheather inputs are empty
    if (user.name == "" || user.email == "" || user.password == "" || user.metaid=="") {
      loginStatus.setStatus({
        ...loginStatus.status,
        msg: "field should not be empty",
      });
    } else {
      axios.post("signup", user).then(() => {
        navigate("/");
        setCookie("login", 1);
        setCookie("name", user.name);
        setCookie("email", user.email);
        setCookie("metaid", user.metaid)
        loginStatus.setStatus({ msg:'', login: true });
      }).catch((e)=>{
        loginStatus.setStatus({...loginStatus.status, msg:e.response.data.message})
      })
    }

  };
  useEffect(() => {
    loginStatus.setStatus({...loginStatus.status, msg:''})
  }, [])
  
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
              autoComplete="off"
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
              autoComplete="off"
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
          <div className="inputfield">
            <label htmlFor="">MetaMask ID</label>
            <input
              value={user.metaid}
              type="text"
              name="metaid"
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
