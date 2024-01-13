import React,{useContext} from 'react'
import { AppContext } from '../context'


function Home() {
  const status = useContext(AppContext)
  console.log(status)
  return (
    
    <div>This is an Home Page</div>
  )
}

export default Home