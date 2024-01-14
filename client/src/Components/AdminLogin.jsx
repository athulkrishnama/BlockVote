import React,{useState} from 'react'
import axios from '../axios';

function AdminLogin(props) {
    const [user, setUser] = useState({ email: "", password: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
      const logIn = ()=>{
        if(user.email=='' || user.password == ''){
          console.log('fields empty')
        }
        else{
          axios.post('/adminlogin', user).then(()=>{
            
            props.setLogin(true)
          })
        }
      }
  return (
    <div className="loginContainer">
    <div className="login">
      <h2>Admin Login</h2>
      <div className="inputfield">
        <label htmlFor="">Email</label>
        <input
          value={user.name}
          type="email"
          name="email"
          onChange={handleChange}
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
        />
      </div>
      <div className="loginBtn">
        <button onClick={logIn}>Login</button>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin