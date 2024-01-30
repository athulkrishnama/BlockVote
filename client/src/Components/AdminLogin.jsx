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
    <div className="d-flex align-items-center justify-content-center full-page row container-fluid">
    <div className="col-4">
      <h2 className='fs-1 fw-bold'>Admin Login</h2>
      <div className="mb-3 form-floating">
        <input
          value={user.name}
          type="email"
          name="email"
          onChange={handleChange}
          autoComplete="off"
          className='form-control'
          placeholder='Email'
        />
        <label htmlFor="" className='form-label'>Email</label>
      </div>
      <div className="mb-3 form-floating">
        <input
          value={user.password}
          type="password"
          name="password"
          onChange={handleChange}
          className='form-control'
          placeholder='Password'
        />
        <label htmlFor="" className='form-label'>Password</label>
      </div>
      <div className="loginBtn">
        <button className='btn btn-primary' onClick={logIn}>Login</button>
      </div>
    </div>
  </div>
  )
}

export default AdminLogin