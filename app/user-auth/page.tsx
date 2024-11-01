'use client'

import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUP";
import UserLogin from "../_components/UserLogin";
import { useEffect, useState } from "react";
import { handleRenderSignupPage } from "../_components/CustomerHeader";
import { useRouter } from "next/navigation";

const Auth = () => {

    const [signup, setSignup] = useState(false);
    
    return (<div>
        <CustomerHeader />
        {/* <h1 className="text-5xl text-ce">User Sign-Up</h1> */}
        {
            signup ?
                <UserSignUp />
                :
                <UserLogin />
        }
        <div className="text-center text-xl">
            <button
                className="border py-2 px-3 rounded-lg"
                onClick={() => setSignup(!signup)}>
                {
                    signup ?
                        'already have an account. Login'
                        :
                        "Don't have an account. SignUp"
                }
            </button>
        </div>
        <Footer />

    </div>)
}

export default Auth;