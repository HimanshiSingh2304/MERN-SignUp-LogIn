import React from 'react'
import Styles from './signup.module.css'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {NavLink} from "react-router-dom"
import signupImg from '../../assets/signupImg.png'
import {toast} from 'react-toastify';
import axios from "axios";

const SignUp = () => {
    const [formData ,setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',       
     })
     const [passwordStrength, setPasswordStrength] = useState('');
 
     const [error,setError] =useState('');
     const navigate = useNavigate()
 
     const handleSubmit = async(e) =>{
         e.preventDefault();
         try {
             const result = await axios.post("https://mern-signup-login-oe9w.onrender.com/api/auth/signup", formData);
             
     
             if (result.data.success) { 
                 toast.success("Registration Successful"); 
                 localStorage.setItem("token", result.data.token);
                 setTimeout(() => {
                     navigate("/login");  
                 }, 1500);
             } else {
                 setError(result.data.message);
                 toast.error(result.data.message);  
             }
         } catch (error) {
             console.error("Signup Error:", error.response ? error.response.data : error.message);
             toast.error(error.response?.data?.message || "Something went wrong");
         }
     };
     const checkPasswordStrength = (value) => {
        const strength = {
          weak: /(?=.{6,})/,
          medium: /^(?=.*[a-z])(?=.*\d)(?=.{8,})/,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        };
      
        if (strength.strong.test(value)) {
          setPasswordStrength('strong');
        } else if (strength.medium.test(value)) {
          setPasswordStrength('medium');
        } else {
          setPasswordStrength('weak');
        }
      };
  return (
    <div className={Styles.frame}>
       <img src={signupImg}  className={Styles.img} alt="Image" />
       <h1>Sign Up Form</h1>
        <form className={Styles.div} onSubmit={handleSubmit}>
        <div className={Styles.div2}>
            <div className={Styles.textWrapper}>Create an account</div>
                <NavLink to ="/login"> <div className={Styles.textWrapper2}>Sign in instead</div></NavLink>
            </div><br /><br />
      
           <div className={Styles.section}>
               <div className={Styles.label}>Name</div>
                    <input type="text" className={Styles.textField}
                        onChange={(e) => setFormData((prev)=>{
                            return{
                              ...prev,
                              name:e.target.value
                                }
                             })}
                             value={formData.name}/>
            </div><br />
            <div className={Styles.section}>
                <div className={Styles.label}>Email</div>
                    <input type="text" className={Styles.textField}
                        onChange={(e) => setFormData((prev)=>{
                            return{
                                ...prev,
                                email:e.target.value
                                }
                            })}
                            value={formData.email}/>
            </div><br />
            <div className={Styles.section}>
        <div className={Styles.label}>Password</div>
        <input
          type="password"
          className={Styles.textField}
          onChange={(e) => {
            const value = e.target.value;
            setFormData((prev) => ({
              ...prev,
              password: value
            }));
            checkPasswordStrength(value);
          }}
          value={formData.password}
        />
        <p
          style={{
            color:
              passwordStrength === 'strong'
                ? 'green'
                : passwordStrength === 'medium'
                ? 'orange'
                : 'red',
            marginTop: '0.5rem'
          }}
        >
    {passwordStrength}
        </p>
      </div>
      <br />
            <div className={Styles.section}>
                <div className={Styles.label}>Confirm Password</div>
                   <input type="password" className={Styles.textField}
                        onChange={(e) => setFormData((prev)=>{
                            return{
                                ...prev,
                                confirmPassword:e.target.value
                                }
                            })}
                            value={formData.confirmPassword}/>
            </div>
            
            <button type="submit" onClick={handleSubmit} className={Styles.button}>Create an Account</button>
            </form>
      
    </div>
  )
}

export default SignUp
