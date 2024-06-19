import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//Imports react-router-dom (Allows us to use routes within our application)
import { BrowserRouter as Router} from 'react-router-dom'

//Renders contents of App.jsx at the root div described in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
)
