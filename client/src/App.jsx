import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { useState } from "react";
import { AppContext } from "./context";

function App() {
  //save state of login
  const [status, setStatus] = useState({ login: false, msg: '' });
  return (
    //setting context to save login details 
    <AppContext.Provider value={{ status, setStatus }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
