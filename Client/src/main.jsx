import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignUp from './pages/SignUp/SignUp.jsx'
import LogIn from './pages/Login/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer
position="top-center"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    <Routes>
      <Route path ='/' element={<SignUp/>}/>
      <Route path ='/login' element={<LogIn/>}/>
      <Route path ='/dashboard' element={<Dashboard/>}/>

        
     
    </Routes>
    </BrowserRouter>

  </StrictMode>,
)
