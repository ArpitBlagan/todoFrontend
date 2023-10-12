import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import todo from '../images/todo.jpg';
import axios from 'axios';

const Main = () => {
    const navigate=useNavigate();
    const [title,setT]=useState("");
    const [description,setD]=useState("");
    const [id,setI]=useState("");
    const[priority,setP]=useState(1);
    const [name,setN]=useState("Add task");
    const [change,setC]=useState("");
    const [tasks,setTT]=useState([]);
    const get=async()=>{
        try{const data=await axios.get('https://todobackend-jv3q.onrender.com/info',{withCredentials:true});
        if(data.data.message=="TokenExpired"){
            alert('Session expired you need to login again');
            navigate("/");
            console.log(data);
        }else{console.log(data.data.data);setTT(data.data.data)}}catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        get();
    },[change]);
  return (
    <div>
        <div className='flex flex-row justify-center align-middle m-3 shadow-lg p-3 font-mono'>
            <img className='h-[40px]' src={todo}/>
            <h1 className='text-md md:text-3xl font-bold flex-1'>ToDo LIST....</h1>
            <button className='w-[100px] font-bold hover:text-2xl'><a href="#about">About</a></button>
            <button
                onClick={async(e)=>{
                    e.preventDefault();
                    const data=await axios.get('https://todobackend-jv3q.onrender.com/logout',{withCredentials:true});
                    console.log(data);
                    navigate("/");
                }} 
                className='w-[100px] font-bold hover:text-2xl'>Logout</button>
        </div>
        <div className='flex flex-row justify-center align-middle font-mono bg-gray-300'>
            <div id="add" className='m-2 p-5 flex flex-col shadow-md'>
                <h1 className='text-md md:text-3xl font-mono font-bold'>Add A Task..</h1>
                <h1 className='text-md font-bold text-black font-mono'>Title*</h1>
                <input value={title}
                        onChange={(e)=>{
                            setT(e.target.value);
                        }}
                        className='font-mono my-3 bg-gray-300 p-2 w-[500px] h-[50px] rounded-md text-black' 
                        placeholder='Title...'
                />
                <h1 className='font-mono text-md font-bold text-black'>Description*</h1>
                <textarea value={description}
                        onChange={(e)=>{
                            setD(e.target.value);
                        }}
                        rows={4}
                        className='font-mono my-3 bg-gray-300 px-2 py-1 w-[500px] h-[100px] rounded-md text-black' 
                        placeholder='Enter description in 100 words...'
                />
                <h1 className='font-mono text-md font-bold text-black'>Priority*</h1>
                <select  className="block w-full px-4 py-2 mt-2 text-wihte bg-gray-300 border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e)=>{setP(e.target.value)}}
                    value={priority}
                >
                    <option value={1}>low</option>
                    <option value={2}>medium</option>
                    <option value={3}>high</option>
                </select>
                <button
                    onClick={async(e)=>{
                        e.preventDefault()
                        if(name=='Add task'){
                        try{
                            if(!title||!description){
                                alert("all fields are required");
                                return ;
                            }
                            const body={title,description,priority};
                            const data=await axios.post('https://todobackend-jv3q.onrender.com/add',body,{withCredentials:true});
                            if(data.data.message=="TokenExpired"){
                                console.log(data);
                                alert('Session expired you need to login again');
                                navigate("/");
                            }
                            else{console.log(data);setC(!change);}
                        }catch(err){console.log(err);alert("something wen wrong please try again later");}}
                        else{
                            try{
                                    if(!title||!description){
                                        alert("all fields are required");
                                    }
                                    const body={title,description,priority,id};
                                    const data=await axios.put('https://todobackend-jv3q.onrender.com/update',body,{withCredentials:true});
                                    if(data.data.message=="TokenExpired"){
                                            alert('Session expired you need to login again');
                                            navigate("/");
                                    }
                                    console.log(data);setC(!change);
                            }catch(err){console.log(err);alert("something wen wrong please try again later");}
                        }
                    }} 
                    className='font-mono bg-blue-400 hover:bg-blue-700 p-2 text-md rounded-md mt-2 font-bold'>{name}
                </button>
                
            </div>
        </div>
        <div className='m-3 p-6 shadow-lg'>
            <h1 className='text-md md:text-3xl font-mono font-bold text-center'>Pending Tasks(IN DESC ORD)...</h1>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-3'>
                    {
                        tasks.map((ele,index)=>{
                            return <div className='shadow-xl p-3' key={index}>
                                    <h1 className='text-md text-center'>{index+1}.<span className='font-bold'>Title:</span>{ele.title}</h1>
                                    <h1 className='font-bold'>Description:</h1>
                                    <p className='text-md my-4'>{ele.description}</p>
                                    <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                                        <button 
                                            onClick={async(e)=>{
                                                e.preventDefault();
                                                setT(ele.title);
                                                setD(ele.description);
                                                setP(ele.priority);
                                                setI(ele._id);
                                                setN('Update task')
                                                const section=document.getElementById('add');
                                                console.log(section);
                                                section.scrollIntoView({ behavior: 'smooth' })
                                                }}
                                            className='rounded p-2 text-md font-bold bg-blue-400 hover:bg-blue-600'>Update
                                        </button>
                                        <button 
                                            onClick={async(e)=>{
                                                e.preventDefault();
                                                try{
                                                    const body={id:ele._id};
                                                    const data=await axios.delete('https://todobackend-jv3q.onrender.com/del',{data:body,withCredentials:true});
                                                    console.log(data);
                                                    if(data.data.message=="TokenExpired"){
                                                        alert('Session expired you need to login again');
                                                    }else{setC(!change);}
                                                }catch(err){
                                                    console.log(err);alert("something wen wrong please try again later");
                                                }
                                            }}
                                            className='rounded p-2 text-md font-bold bg-blue-400 hover:bg-blue-600'>Done/Delete
                                        </button>
                                    </div>
                            </div>
                        })
                    }
            </div>
        </div>
        <div id="about"className=' m-3 p-6 shadow-xl text-center font-mono text-2xl bg-gray-300'>
            <p >*Simple MERN CRUD app where user can do crud operation on tasks.</p>
            <p>*Frontend uses reactjs, react-router-dom, axios etc.</p>
            <p>*Backend uses expressjs, mongoose, jwt, cookie-parser, cors etc.</p>
            <p>Thank you.</p>
        </div>
    </div>
  )
}

export default Main