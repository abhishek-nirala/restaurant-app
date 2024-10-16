"use client"

import React, { useState } from 'react'
import Login from '../component/Login'
import SignUp from '../component/SignUp'
import Header from '../component/Header'
import Footer from '../component/Footer'

const Register = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className='text-center'>
      <Header/> 
      <h1 className='text-3xl'>Register</h1>
      {
        login ? <Login  /> : <SignUp />
      }

      <div className="btn">
        <button onClick={() => { setLogin(!login) }} className='m-2 text-xl p-1  border border-black rounded'>
          {login ? "Do not have an account?SignUp" : "Already have na account?LoginUp"}
        </button>
      </div>
      <Footer/>
    </div>

  )
}

export default Register