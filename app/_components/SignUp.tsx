import React, { useState } from 'react'
// import { useRouter } from 'next/router'
import { useRouter } from 'next/navigation'


const SignUp = () => {
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setC_Password] = useState('')
    const [city, setCity] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    interface ApiResponse {
        result: RestaurantsDetails; 
        success: boolean;
    }
    interface RestaurantsDetails {
        email: string;
        "first name": string;
        password?: string;
        city: string;
        contact: number;

    }


    const handleSignup = async () => {
        if (password !== c_password) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false)
        }
        if (!name || !email || !password || !c_password || !city || !contact) {
            setError(true)
            return false;
        } else {
            setError(false);
        }

        // return false;
        // console.log(name, email, password, c_password, city, contact)
        const response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, name, password,city, contact })
        })
        const data: ApiResponse = await response.json();
        console.log(data);

        if (data.success) {
            const { result } = data as {result: RestaurantsDetails };
            delete result.password;
            localStorage.setItem("restaurantDetails", JSON.stringify(result))
            router.push('/dashboard')
        }
    }

    return (
        
        <div className='flex justify-center items-center w-full h-screen   '>
            
            <h1 className='text-5xl wrapper w-[50%] h-[100%] flex justify-center items-center'>SignUP</h1>

            <div className="wrapper gap-8 flex-col w-[50%] h-[100%] flex justify-center items-center">

                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded ' type="email" name='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && !email && <span className='text-red-500'>email is required</span>}

                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded '  type="text" name='name' placeholder='Enter Restaurant name' value={name} onChange={(e) => setName(e.target.value)} />
                {error && !name && <span className='text-red-500'>restaurant name is required</span>}

                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded ' type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError  && <span className='text-red-500'>Password and confirm password not matched</span>}
                {error && !password && <span className='text-red-500'>password is required</span>}


                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded ' type="password" placeholder='Confirm Password' value={c_password} onChange={(e) => setC_Password(e.target.value)} />
                {error && !c_password && <span className='text-red-500'>confirm password is required</span>}

                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded ' type="text" placeholder='Enter City' name='city' value={city} onChange={(e) => setCity(e.target.value)} />
                {error && !city && <span className='text-red-500'>city is required</span>}

                <input className='m-2 text-xl text-black p-2 w-96  border border-black rounded ' type="number" placeholder='Contact Number' name='contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                {error && !contact && <span className='text-red-500'>contact is required</span>}

                <button className='m-2 text-xl text-white p-1  border border-white rounded py-1 px-3' onClick={handleSignup}>SignUP</button>
            </div>
        </div>

    )
}

export default SignUp