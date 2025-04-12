import signupImg from '../../assets/signupImg.png'
import Styles from './login.module.css'
import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const[formData,setFormData]=useState({
        email:'',
        password:''
    })

    const [passwordVisible, setPasswordVisible]=useState(false);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
  
        if (!formData.email || !formData.password) {
            toast.error("Please enter both username and password");
            setLoading(false);
            return;
        }
  
        try {
            const result = await axios.post("http://localhost:4000/api/auth/login", formData);
            console.log("API Response:", result.data);
  
            if (result.data.success) {
                toast.success("Login successful");
                localStorage.setItem("token", result.data.token); // Store token
                setTimeout(() => {
                    navigate("/dashboard"); // Redirect to dashboard
                }, 1500);
            } else {
                toast.error(result.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
  
        setLoading(false);
    };


  return (
    <div className={Styles.frame}>
        <img className={Styles.img} alt="Image" src={signupImg} />
        <div className={Styles.textWrapper}>Sign in</div>
          <form className={Styles.div3} onSubmit={handleSubmit}>

          <input type="email" placeholder="email" className={Styles.inputField1} 
       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
       value={formData.email}
       required
      />
      <div className={Styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className={Styles.inputField2}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    value={formData.password}
                                    required
          />
          <span
            className={Styles.togglePassword}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            👁️
          </span>
        </div> 
        <button type='submit' className={Styles.divWrapper2}>
                     {loading ? "Logging in..." : "Log In"}
                </button>
          </form>
          <div className={Styles.autoLayout3}>
               <div className={Styles.dontHaveAn}>Don&#39;t have an account?</div>
               <NavLink to ="/">
                   <div className={Styles.textWrapper6}>Sign up</div></NavLink>
               </div>
       
    </div>
  )
}

export default Login
