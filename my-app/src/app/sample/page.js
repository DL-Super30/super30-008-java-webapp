'use client'
import  { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

    const router = useRouter();

    const [details, setDetails] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess,setShowSuccess] = useState(false);
    const [showError,setShowError] = useState(false);


    useEffect(() => {
        dataFromApi();
    }, [])

    const dataFromApi = async () => {
        try {
            const response = await fetch("http://localhost:3001/loginData");
            const data = await response.json()
            setDetails(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const validate = () =>{
        const validUser = details.find( (ele) => ele.username == username && ele.password == password )
        if(validUser){
            console.log("successfully login !!!")
            // alert("successfully login !!");
            toast.success('Succesfully Login !', {
                position: "top-right",
                autoClose: 1800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
            setUsername("")
            setPassword("")
            // setShowSuccess(true)
            setTimeout(() =>{
            router.push('/dashboard')

            },2000)
            
        }
        else{
            console.log("incorrect password !!")
            setUsername("")
            setPassword("")
            // alert("invalid details")
            // setShowError(true)
            toast.error('Invalid username or Password ', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });
        }
    }

    const handleEnter = (e) =>{
        if(e.key == 'Enter'){
            alert("succesfully")
        }
    }



    return (
        <div className="w-full h-svh  flex">
            <div className="w-6/12 h-svh  border-green-500">
                <img className="m-auto mt-20" src="https://crm.skillcapital.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fskillcapital.41121682.png&w=640&q=75"></img>
                <div className="w-[65%] h-[65%] border-2 border-gray-200 rounded-lg m-auto mt-10 p-8">
                    <label>User Name</label><br></br>
                    <input className="w-full p-2 border-2 border-gray-200 rounded-md mb-5 outline-none" value={username} onChange={e => setUsername(e.target.value)}></input>
                    <label>Password</label><br></br>
                    <input className="w-full p-2 border-2 border-gray-200 rounded-md mb-6 outline-none" type="password" value={password} onChange={f => setPassword(f.target.value)}></input>
                    <button className="w-full p-2 border-2 border-gray-200 rounded-md mb-6 outline-none text-white loginclr" onClick={validate} onKeyDown={(e) =>handleEnter(e)}>Login</button>
                    <input className="scale-150" type="checkbox"></input>
                    <label className="ml-4">Remember Me</label><br></br>
                    <h3 className="mt-28 ml-28 text-gray-400">©2024, All rights reserved</h3><br></br>


                </div>
            </div>
            <div className="w-1/2 h-svh">
                <div className="h-[26.5%] ">
                    <p className="text-3xl font-bold text-center fontcolor mt-10">Seamlessly manage all learner data <br></br> in a unified platform.</p>
                    <p className="text-lg text-center fontcol">Centralize customer data effortlessly. Streamline communication, <br></br> sales, and support for seamless growth.</p>
                </div>
                <div className="h-[68%] background-img"></div>
            </div>
            {
                showSuccess && ( <div className="w-1/4 h-20 bg-white border-t-4 absolute top-[77%] border-green-400 rounded-lg "> sucessfully login</div>)
            }
            {
                showError && (<div className="w-1/4 h-20 bg-white border-t-4 absolute top-[77%] border-red-400 rounded-lg ml-[200px]"> 
                <h1>Invalid Details</h1>
                <button className="w-36 p-1 bg-red-400 text-white" onClick={() => setShowError(false)}>Retry</button>
                </div> )
            }
                    <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
        </div>
    )
}