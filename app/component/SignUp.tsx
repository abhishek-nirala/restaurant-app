import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'


const SignUp = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setC_Password] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')

    interface ApiResponse {
        result: Response; // Change 'any' to the appropriate type for 'result'
        success: boolean;
        password : string;
      }
      

    const handleSignup = async () => {
        console.log(firstName, lastName, email, password, c_password, city, contact)
        const response= await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ firstName, lastName, email, password, c_password, city, contact })
        })
        const data:ApiResponse = await response.json();
        console.log(data);

        if(data.success) {
            const {result} = data;
            delete result.password;
            localStorage.setItem("restaurantDetails" , JSON.stringify(result))
            router.push('/dashboard')
        }
    } 

    return (
        <div className=''>
            <h1 className='text-2xl wrapper '>SignUP</h1>
            <div className="wrapper flex gap-8 flex-col w-56">
                <form action="" method="post"></form>

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="email" name='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' name='first name' type="text" placeholder='Enter first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="text" placeholder='Enter last name' name='last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="password" placeholder='Confirm Password' value={c_password} onChange={(e) => setC_Password(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="text" placeholder='Enter City' name='city' value={city} onChange={(e) => setCity(e.target.value)} />

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="number" placeholder='Contact Number' name='contact' value={contact} onChange={(e) => setContact(e.target.value)} />

                <button className='m-2 text-xl p-1  border border-black rounded' onClick={handleSignup}>SignUP</button>
            </div>
        </div>

    )
}

export default SignUp