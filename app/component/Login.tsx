import React from 'react'

const Login = () => {
  return (
    <div className='m-3'> <h1 className='text-3xl'>Login</h1>
      <div className=" flex gap-8 flex-col justify-center w-56">
        <input className='m-2 p-2  text-xl w-96 border-b border-black rounded ' type="text" placeholder='Enter email'/>
        <input className='m-2 p-2 text-xl w-96 border-b border-black rounded ' type="password" placeholder='Enter Password'/>
        <button className='m-2 text-xl p-1  border border-black rounded' >Login</button>
      </div>
    </div>
  )
}

export default Login