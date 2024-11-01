import { useState } from "react"
import { UserData } from "./UserSignUP"
import { useRouter } from "next/navigation"
const UserLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState<string>('')
    const router = useRouter();

    const handleUserLogin = async () => {
        // console.log(email, password);

        const response = await fetch("http://localhost:3000/api/user/login", {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        const data: UserData = await response.json();
        if (data.success) {
            const { result } = data;
            delete result.password
            localStorage.setItem('user', JSON.stringify(result))
            router.push('/')
        } else {
            alert("something went wrong! Please enter correct credentials")
        }


    }

    return (<>
        <div className=" h-[400px] flex ">

            <div className="w-[50%] grid place-items-center">
                <h1 className="text-5xl">Login</h1>
            </div>

            <div className="grid place-items-center ">
                <div className="">

                    <div>
                        <input
                            type="text"
                            className="text-black text-2xl m-3 p-1 rounded-md"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className="text-black text-2xl m-3 p-1 rounded-md"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="m-3">
                        <button
                            className="border p-2 text-xl rounded-lg"
                            onClick={handleUserLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default UserLogin;