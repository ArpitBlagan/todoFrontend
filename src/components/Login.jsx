import { useState } from 'react'
import img from '../images/rbt.png'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const navigate=useNavigate();
    const [email,setE]=useState("");
    const [password,setP]=useState("");
  return (
    <div className='h-screen flex flex-col justify-center align-middle'>
        <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 p-3 items-center'>
            <div className='text-center'>
                <img className='object-contain sm-w-[300px] sm:h-[300px] md:w-[600px] md:h-[500px]' src={img} alt="default" />
            </div>
            <div className='text-center flex flex-col font-mono'>
                <h1 className='md:text-3xl mb-10'>Login...</h1>
                <div className='p-2  rounded-md bg-gray-100 items-center flex flex-col'>
                    <input value={email}
                        onChange={(e)=>{
                            setE(e.target.value);
                        }}
                        className='my-3 bg-gray-300 p-2 w-[300px] h-[50px] rounded-md text-black' 
                        placeholder='Email...'
                    />
                    <input value={password}
                        type='password'
                        onChange={(e)=>{
                            setP(e.target.value);
                        }}
                        className='my-3 bg-gray-300 p-2 w-[300px] h-[50px] rounded-md text-black' 
                        placeholder='Password...'
                    />
                    <button
                        onClick={async(e)=>{
                            e.preventDefault();
                            console.log("clicked..")
                            try{
                                if(!password||!email){
                                    alert('All Fields Required');
                                }
                                const body={email,password};
                                const  data=await axios.post('https://todobackend-jv3q.onrender.com/login',body,{withCredentials:true});
                                console.log(data);
                                if(data.data.msg=='logged In'){
                                    navigate("/main");
                                }
                            }
                            catch(err){
                                console.log(err);
                                setE("");setP("");
                                alert(`Something went wrong ${err?.response?.data?.message}`);
                            }
                        }} 
                        className='bg-blue-400 hover:bg-blue-600 p-3 rounded-md w-[300px] font-bold'>Login</button>                    
                    <h1 className='m-2 text-md text-gray-400'><span className='text-blue-600 underline font-bold cursor-pointer'
                        onClick={async(e)=>{
                            e.preventDefault();
                            try{
                                if(!email){
                                    alert("Please Enter the registered email first");
                                }
                                const body={email};
                                const ff=await axios.post("https://todobackend-jv3q.onrender.com/forget",body,{withCredentials:true});
                                console.log(ff);
                                if(ff.data.msg=='check you email for the code'){
                                    const code=ff.data.code;
                                    navigate("/forget",{state:{code}});
                                }
                            }catch(err){

                                console.log(err);
                            }
                        }}
                        >Forget Password... </span>(Enter email and click on forget password An email with a pin will be send to this email)</h1>
                     <h1 className='m-2 text-md text-gray-400'>Not have a Account <Link to="/reg"><span className='text-blue-600 underline font-bold'>Register   </span></Link></h1>

                </div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default Login