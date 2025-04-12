import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from './dashboard.module.css'



const Dashboard = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        navigate("/"); 
        return;
      }
  
      const fetchDashboardData = async () => {
        try {
          const res = await fetch("http://localhost:4000/api/user/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
  
          const data = await res.json();
  
          if (res.ok) {
            setName(data.name);
          } else {
            console.error("Dashboard error:", data.message);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
  
      fetchDashboardData();
    }, [navigate]);
  
    // Sign Out
    const handleSignOut = () => {
      localStorage.removeItem("token");
      navigate("/"); 
    };
  
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Welcome, {name || "User"}!</h1>
        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  };
  
export default Dashboard
