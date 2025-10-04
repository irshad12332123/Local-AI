import React from 'react'
import { useAuth } from '../context/authProvider'
import CustomButtton from '../components/CustomButtton';
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();
  const handleLogin = () =>{
    logout();
    navigate("/login", { replace: true });
  }
  const { user, logout} = useAuth();
  console.log("USER FROM HOME: ", user)
  return (
    <div className='bg-gray-600'>
      <h1>Welcome {user?.userName}</h1>
      <CustomButtton handleClick={handleLogin} value='LOGOUT'/>
    </div>
  )
}

export default Home 
