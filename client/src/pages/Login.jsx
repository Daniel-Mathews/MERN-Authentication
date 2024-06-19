import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom' //To redirect user to another page


//UseState is an inbuilt way to track the data entered into the input box and store in object
//We can also set data to the data parameter using useState
import { useState } from 'react'

//Importing axios: Can handle http requests
import axios from 'axios'

//Function which returns the html described within to the App.jsx when the login route is called.
export default function login() {
  const navigate = useNavigate();

  //Object with two parameters: email and password. To store the input data.
  const [data, setData]= useState({
    email: '',
    password:'',
  })

  //e is an event. The default action is prevented.
  const loginUser = async (e) =>{
    e.preventDefault();
    //Structure the data into a variable
    const{email, password} = data;

    try{

      const {data}= await axios.post('/login', {
        email, password
      })
      //If error is returned by function in authcontrollers
      if(data.error){
        toast.error(data.error)
      }
      else{
        //Reset the data to empty object
        setData({})

        toast.success('Login successful!');
        //If login is successful, navigate to dashboard or similar page.
        navigate('/dashboard')
        //window.location.reload();
        
      }

    }catch(error){
        console.log(error);
    }
  }

  return (
    <div>
        <form onSubmit={loginUser}>
        <label>Email</label>
        <input type="email" placeholder='Enter email: ' value={data.email} onChange={(e)=>setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder='Enter password: ' value={data.password} onChange={(e)=>setData({...data, password: e.target.value})}/>

        <button type="submit">Login</button>
        </form>
    </div>
  )
}
