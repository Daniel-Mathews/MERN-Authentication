import './App.css'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'


//Get each of the main files which are publically displayed before login
import Navbar from './components/Navbar'
import Home from '../src/pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { UserContextProvider } from '../context/userContext'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials= true;

//The return statement of this function is sent to main.jsx 
//This function is mainly to return the page layout and to connect the routes to the files.
function App() {
 

  return (
    <UserContextProvider>
    <Navbar />
    <Toaster position = 'bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
    
    </Routes>
    </UserContextProvider>
  )
}

export default App
