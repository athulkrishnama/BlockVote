import React, { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const status = useContext(AppContext);
  const navigate = useNavigate()
 
  // cookie to get user data
  const [cookie, setCookie] = useCookies(['user'])
  useEffect(() => {
    // check user is signed in or not
    !status.status.login?navigate('/login'):null
  
    return () => {
      
    }
  }, [])
  
  return (
    <div>
      <h1>This is a sample home page</h1>
      <h3>You are {status.status.login?'':'not'} logged in</h3>
      <h2>Your name is {cookie.name}</h2>
      <h2>Your email is {cookie.email}</h2>
      <h3>Your metamask id is {cookie.metaid}</h3>
      <button onClick={()=>{
        setCookie('login')
        status.setStatus({...status.status, login:false})
        navigate('/login')
      }}>Logout</button>
    </div>
  );
}

export default Home;
