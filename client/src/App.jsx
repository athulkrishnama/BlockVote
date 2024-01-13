import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";
import { AppContext } from "./context";
import {CookiesProvider, Cookies, useCookies} from "react-cookie";
function App() {

  // cookies for user details
  const [cookie, setCookie] = useCookies();
    //save state of login
    // set login to true if value in cookie is one else login will set to false
    const [status, setStatus] = useState({ login: cookie.login=='1'?true:false, msg: "" });
  useEffect(() => {
    
    setStatus({...status, login:cookie.login=='1'?true:false})
  }, [])
  
  return (
    //setting context to save login details
    <AppContext.Provider value={{ status, setStatus }}>
      <CookiesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </CookiesProvider>
    </AppContext.Provider>
  );
}

export default App;
