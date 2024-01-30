import React, { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCookies } from "react-cookie";

 function SignUp({account}) {
  const navigate = useNavigate();

  // loginstatus context to save login details
  // {login:true, msg:''}
  const loginStatus = useContext(AppContext);

  // usestate to store data of input fileds
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    metaid: account
  });

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
    if (
      user.name == "" ||
      user.email == "" ||
      user.password == "" ||
      user.metaid == ""
    ) {
      loginStatus.setStatus({
        ...loginStatus.status,
        msg: "field should not be empty",
      });
    } else {
      axios
        .post("signup", user)
        .then(() => {
          navigate("/");
          setCookie("login", 1);
          setCookie("name", user.name);
          setCookie("email", user.email);
          setCookie("metaid", user.metaid);
          loginStatus.setStatus({ msg: "", login: true });
        })
        .catch((e) => {
          loginStatus.setStatus({
            ...loginStatus.status,
            msg: e.response.data.message,
          });
        });
    }
  };

  // change metaid in form when metaid changed in metamask wallet
  const handleAccountChanged = (accounts) => {
    handleChange({ target: { name: "metaid", value: accounts[0] } });
  };


  useEffect(() => {
    loginStatus.setStatus({ ...loginStatus.status, msg: "" });

    //listener for account change
    window.ethereum.on("accountsChanged", handleAccountChanged);
    return () => {
    //remove lister on unmount
      window.ethereum.off("accountsChanged", handleAccountChanged);
    };
  }, [user]);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center full-page row container-fluid">
        <div className="login col-md-3 shadow-lg rounded-3 p-3 pt-4">
          <div className="mb-3 form-floating">
            <input
              value={user.email}
              type="email"
              name="email"
              onChange={handleChange}
              required
              autoComplete="off"
              className="form-control"
              placeholder="Email"
            />
            <label htmlFor="" className="form-label" >Email</label>
          </div>
          <div className="mb-3 form-floating">
            <input
              value={user.name}
              type="text"
              name="name"
              onChange={handleChange}
              required
              autoComplete="off"
              className="form-control"
              placeholder="Username"
            />
            <label htmlFor="" className="form-label">UserName</label>
          </div>
          <div className="mb-3 form-floating">
            <input
              value={user.password}
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="" className="form-label">Password</label>
          </div>
          <div className="mb-3 form-floating">
            <input
              value={user.metaid}
              type="text"
              name="metaid"
              onChange={handleChange}
              required
              disabled
              className="form-control"
              placeholder="metaid"
            />
            <p className="text-secondary mt-1">Changing metamask id on metamask wallet will reflect here</p>
            <label htmlFor="" className="form-label">MetaMask ID</label>
          </div>
          <div className="row">
            <button className="btn btn-primary col-auto ms-3" onClick={SignUp}>Sign Up</button>
            <button className="btn btn-outline-primary col-auto ms-auto me-3" onClick={() => navigate("/login")}>
              Already Have Account
            </button>
          </div>
          <p className="text-danger m-3">{loginStatus.status.msg}</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
