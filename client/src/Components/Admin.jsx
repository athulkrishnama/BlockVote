import React, { useEffect, useState } from "react";
import axios from "../axios";
import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";

function Admin(props) {
  const [registerd, setRegistered] = useState(false);
  const [login, setLogin] = useState(false)
  axios.get("/admin").then((data) => {
    setRegistered(data.data.registerd);
  });

  return (
  
      <div>{login?<div>loggedin</div>:!registerd ? <AdminRegister setLogin={setLogin} /> : <AdminLogin setLogin={setLogin}/>}</div>)
}

export default Admin;
