import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import { useEffect, useState } from "react";
import { AppContext } from "./context";
import { CookiesProvider, Cookies, useCookies } from "react-cookie";
import { connectWeb3Metamask } from "./web3_functions";
import detectEthereumProvider from "@metamask/detect-provider";
import Admin from "./Components/Admin";
function App() {
  // cookies for user details
  const [cookie, setCookie] = useCookies();
  //save state of login
  // set login to true if value in cookie is one else login will set to false
  const [status, setStatus] = useState({
    login: cookie.login == "1" ? true : false,
    msg: "",
  });

  const [contractInstance, setContract] = useState(null);
  const [accounts, setAccounts] = useState();
  useEffect(() => {
    setStatus({ ...status, login: cookie.login == "1" ? true : false });
    async function connect() {
      const provider = await detectEthereumProvider();
      try {
        if (provider) {
          console.log("Metamask found");
          let { accounts, instance } = await connectWeb3Metamask(provider);
          setAccounts(accounts);
          setContract(instance);
        } else {
          alert(`Metamask not found. Install metamask!!`);
        }
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if (error.code != -32002) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
        }
        console.log(error);
      }
    }
    setTimeout(connect, 1500);
  }, []);

  return (
    //setting context to save login details
    <div className=''>
      {
        contractInstance == null ?
        <div>
          <h1>Loading</h1>
        </div>:
        <AppContext.Provider value={{ status, setStatus }}>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Home contractInstance={contractInstance} account={accounts[0].toLowerCase()}/>} />
            <Route path="/login" element={<Login contractInstance={contractInstance} account={accounts[0].toLowerCase()}/>} />
            <Route path="/signup" element={<SignUp contractInstance={contractInstance} account={accounts[0].toLowerCase()}/>} />
            <Route path="/admin" element={<Admin contractInstance={contractInstance} account={accounts[0].toLowerCase()}/>}/>
          </Routes>
        </CookiesProvider>
      </AppContext.Provider>}
    </div>
  );
}

export default App;
