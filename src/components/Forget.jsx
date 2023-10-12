import { useState } from 'react'
import img from '../images/rbt.png'
import { Link,useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios'
const Forget = () => {
  const location=useLocation();
  const {code}=location.state;
  console.log(code);
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
                <h1 className='md:text-3xl mb-10'>Reset Password...</h1>
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
                          try{
                            const body={email,password,code};
                            const data=await axios.post('https://todobackend-jv3q.onrender.com/cPass',body);
                            console.log(data);
                            if(data.data.msg=='updated'){
                              navigate("/");
                            }
                          }catch(err){
                            console.log(err);alert("something went wrong please try again");
                          }
                        }}
                        className='bg-blue-400 hover:bg-blue-600 p-3 rounded-md w-[300px] font-bold'
                        >Reset</button>  
                        <h1 className='m-2 text-md text-gray-400'><Link to="/"><span className='text-blue-600 underline font-bold'>Login Page</span></Link></h1>
       
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forget