import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom' //To redirect user to another page

//UseState is an inbuilt way to track the data entered into the input box and store in object
//We can also set data to the data parameter using useState
import { useState } from 'react'

//Function which returns the html described within to the App.jsx when the register route is called.
export default function Register() {
  const navigate = useNavigate();

  //Object with three parameters: name, email and password. To store the input data.
  const [data, setData]= useState({
    name: '',
    email: '',
    password:'',
  })

  //e is an event. The default action is prevented.
  //Register user function is called when the button is clicked.
  const registerUser= async (e) => {
    e.preventDefault();
    //Structure the data into a variable
    const{name, email, password} = data;

    try{

      const {data}= await axios.post('/register', {
        name, email, password
      })
      //If error is returned by function in authcontrollers
      if(data.error){
        toast.error(data.error)
      }
      else{
        //Reset the data to empty object
        setData({})
        toast.success('Registration successful!');
        //They can be sent either to login or home pagen depending on preference
        navigate('/login');
      }

    }catch(error){
        console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder='Enter name: ' value={data.name} onChange={(e)=>setData({...data, name: e.target.value})}/>
        <label>Email</label>
        <input type="email" placeholder='Enter email: ' value={data.email} onChange={(e)=>setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder='Enter password: ' value={data.password} onChange={(e)=>setData({...data, password: e.target.value})}/>

        <button type="submit">Submit</button>
        
      </form>
    </div>
  )
}
