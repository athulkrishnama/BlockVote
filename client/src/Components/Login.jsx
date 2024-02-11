import React, { useContext } from "react";
import { AppContext } from "../context";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import { useCookies } from "react-cookie";

function Login() {

  //context of loginstatus {login, msg}
  const status = useContext(AppContext);

  //for navigation to create account
  const navigate = useNavigate();

  //state for user 
  const [user, setUser] = useState({ email: "", password: "" });

  // cookie to store details of logined user
  const [cookie, setCookie] = useCookies(['user'])

    // store election details
    const [ElectionDetails, setElectionDetails] = useState({})

    // function to fetch election details
  
    const getElectionDetails = ()=>{
      axios.get("/getElectionDetails").then((data)=>{
        setElectionDetails(data.data)
      })
    }
  

  //function to handle change data in the input field 
  // data is updated in the user usestate
  // [name]:value update the key value pair
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Login function
  // context status will be set to login true after successful login
  const logIn = () => {
    // check fields are isempty
    if (user.email == "" || user.password == "") {
      status.setStatus({ ...status.status, msg: "field should not be empty" });
    } else {
      axios
        .post("/login", user)
        .then((data) => {
          status.setStatus({ ...status.status, login: true });
          const userData = data.data.user;
          navigate("/");
          setCookie("login", 1);
          setCookie("name", userData.name);
          setCookie("email", userData.email);
          setCookie("metaid", userData.metaid)
          status.setStatus({ msg:'', login: true });
        })
        // if login failed set msg to status context
        .catch((e) => {
          status.setStatus({...status.status, msg:e.response.data.message})
        });
    }
  };
useEffect(() => {
 getElectionDetails()
}, [])

  
  return (
    !ElectionDetails.election?
    <div className="">
      <h1 className="">Election not yet Declared </h1>
      <h3>Contact Your Admin</h3>
    </div>:
    <div className="d-flex align-items-center justify-content-center full-page row container-fluid">
      <div className="login col-md-3 shadow-lg rounded-3 p-3 pt-4">
        <div className="mb-3 form-floating">
          <input
            value={user.name}
            type="email"
            name="email"
            onChange={handleChange}
            autoComplete="off"
            className="form-control"
            placeholder="Email"
          />
          <label htmlFor="" className="form-label">Email</label>
        </div>
        <div className="mb-3 form-floating">
          <input
            value={user.password}
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            placeholder="Password"         
          />
          <label htmlFor="" className="form-label">Password</label>
        </div>
        <div className="row">
          <button className="col-auto btn btn-primary ms-3" onClick={logIn}>Login</button>
          <button className="col-auto btn btn-outline-primary ms-auto me-3" onClick={() => navigate("/signup")}>Create Account</button>
        </div>
        {status.status.msg && <p className="text-danger mt-3">{status.status.msg}</p>}
      </div>
    </div>
  );
}

export default Login;
