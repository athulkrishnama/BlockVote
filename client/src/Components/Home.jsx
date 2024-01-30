import React, { useContext, useEffect , useState} from "react";
import { AppContext } from "../context";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
const web3 = new Web3(window.ethereum);
function Home(props) {
  const status = useContext(AppContext);
  const navigate = useNavigate()
 
  // cookie to get user data
  const [cookie, setCookie] = useCookies(['user'])

  //useState to store current metamask account address
  const [account, setAccount] = useState('')

  const handleAccountChanged = (accounts)=>{
    console.log( accounts)
    setAccount('')
  }
  useEffect(() => {
    // check user is signed in or not
    !status.status.login?navigate('/login'):null
    web3.eth.getAccounts().then((data)=>setAccount(data[0].toLowerCase()))
    
    //change account when account changed in metamask wallet
    if(web3){
      window.ethereum.on('accountsChanged', handleAccountChanged)
    }
    return () => {
      window.ethereum.off('accountsChanged', handleAccountChanged)
      
    }
  }, [account])
  
  return (
    <div className="d-flex flex-column container-fluid">
      <nav className="navbar navbar-expanded-md bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand fs-1 fw-bold">Election Name </h1>
          <div className="navbarNav">
            <button
            className="btn btn-primary "
            onClick={()=>{
            setCookie('login')
            status.setStatus({...status.status, login:false})
            navigate('/login')
                  }}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="">
        <table className="col-3">
          <tbody>
            <tr>
              <th >Name</th>
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
          </tbody>
        </table>
          <p className="text-danger" >{account!=cookie.metaid?"Your registered Id doesnt match with current account":null}</p>

       
      </div>
      
      
    </div>
  );
}

export default Home;
