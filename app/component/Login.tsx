import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const handleLogIn = () => {
    console.log(password, email)

    if (!email || !password) {
      setError(true);
      // return false;
    } else {
      setError(false)
    }
  }

  return (
    <div className='m-3'> <h1 className='text-3xl'>Login</h1>
      <div className=" flex gap-8 flex-col justify-center w-56">

        <input className='m-2 p-2  text-xl w-96 border-b border-black rounded ' type="text" placeholder='Enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        {error && !email && <span className='text-red-500'
        >Enter a valid email</span>}


        <input className='m-2 p-2 text-xl w-96 border-b border-black rounded ' type="password" placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        {error && !password && <span className='text-red-500'
        >Enter a valid password</span>}

        <button onClick={() => { handleLogIn() }} className='m-2 text-xl p-1  border border-black rounded' >Login</button>

      </div>
    </div >
  )
}

export default Login