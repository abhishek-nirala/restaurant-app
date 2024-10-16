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
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    interface ApiResponse {
        result: RestaurantsDetails; 
        success: boolean;
    }
    interface RestaurantsDetails {
        email: string;
        "first name": string;
        "last name": string;
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
        if (!firstName || !lastName || !email || !password || !c_password || !city || !contact) {
            setError(true)
            return false;
        } else {
            setError(false);
        }

        // return false;
        console.log(firstName, lastName, email, password, c_password, city, contact)
        const response = await fetch("http://localhost:3000/api/restaurant", {
            method: "POST",
            body: JSON.stringify({ email, firstName, lastName, password, c_password, city, contact })
        })
        const data: ApiResponse = await response.json();
        console.log(data);

        if (data.success) {
            const { result } = data as { result: RestaurantsDetails };
            delete result.password;
            localStorage.setItem("restaurantDetails", JSON.stringify(result))
            router.push('/dashboard')
        }
    }

    return (
        
        <div className=''>
            +
            <h1 className='text-2xl wrapper '>SignUP</h1>
            <div className="wrapper flex gap-8 flex-col w-56">

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="email" name='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && !email && <span className='text-red-500'>email is required</span>}

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' name='firstName' type="text" placeholder='Enter first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {error && !firstName && <span className='text-red-500'>first name is required</span>}

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="text" placeholder='Enter last name' name='last' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {error && !lastName && <span className='text-red-500'>last name is required</span>}

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="password" placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError  && <span className='text-red-500'>Password and confirm password not matched</span>}
                {error && !password && <span className='text-red-500'>password is required</span>}


                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="password" placeholder='Confirm Password' value={c_password} onChange={(e) => setC_Password(e.target.value)} />
                {error && !c_password && <span className='text-red-500'>confirm password is required</span>}

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="text" placeholder='Enter City' name='city' value={city} onChange={(e) => setCity(e.target.value)} />
                {error && !city && <span className='text-red-500'>city is required</span>}

                <input className='m-2 text-xl p-2 w-96  border border-black rounded ' type="number" placeholder='Contact Number' name='contact' value={contact} onChange={(e) => setContact(e.target.value)} />
                {error && !contact && <span className='text-red-500'>contact is required</span>}

                <button className='m-2 text-xl p-1  border border-black rounded' onClick={handleSignup}>SignUP</button>
            </div>
        </div>

    )
}

export default SignUp