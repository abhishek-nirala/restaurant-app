import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter();

  interface ApiRes {
    result: Result;
    login: true;
    success: boolean;
  }
  interface Result {
    email: string;
    password?: string;
  }

  const handleLogIn = async () => {

    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false)
    }
    try {
      const response = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        body: JSON.stringify({ email, password, login: true })
      })
      const data: ApiRes = await response.json()
      
      if (data.success) {
        const { result } = data;
        delete result.password;
        localStorage.setItem("restaurantDetails", JSON.stringify(result))
        router.push("/dashboard");
      } else {
        alert("loggedIn failed")

      }
    } catch (err) {
      console.log("Error while LogIn : ", err);

    }

    // console.log(password, email)
  }

  return (
    <div className='m-3'> <h1 className='text-3xl'>Login</h1>
      <div className=" flex gap-8 flex-col justify-center w-56">

        <input className='m-2 p-2 text-black  text-xl w-96 border-b border-black rounded ' type="text" placeholder='Enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        {error && !email && <span className='text-red-500'
        >Enter a valid email</span>}


        <input className='m-2 p-2 text-black text-xl w-96 border-b border-black rounded ' type="password" placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        {error && !password && <span className='text-red-500'
        >Enter a valid password</span>}

        <button onClick={() => { handleLogIn() }} className='m-2 text-xl p-1  border border-white rounded ' >Login</button>

      </div>
    </div >
  )
}

export default Login