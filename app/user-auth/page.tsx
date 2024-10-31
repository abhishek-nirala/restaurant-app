'use client'

import { User } from "lucide-react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUP";

const Auth = ()=>{

    return(<div>
        <CustomerHeader/>
        <h1 className="text-5xl text-ce">User Sign-Up</h1>
            <UserSignUp/>
        <Footer/>
    </div>)
}

export default Auth;