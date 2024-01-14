import React, { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home(props) {
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
    <div className="home">
      <nav>
        <h1>Election Name </h1>
        <div>
          <button onClick={()=>{
          setCookie('login')
          status.setStatus({...status.status, login:false})
          navigate('/login')
                }}>Logout</button>
        </div>
      </nav>
      <div className="homeBody">
        <table>
          <tr>
            <th>Name</th>
            <td>{cookie.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{cookie.email}</td>
          </tr>
          <tr>
            <th>Metamask ID</th>
            <td>{cookie.metaid}</td>
          </tr>
        </table>
      </div>
      
      
    </div>
  );
}

export default Home;
