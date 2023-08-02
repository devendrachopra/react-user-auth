import React from "react";
import { Outlet, NavLink,Link } from "react-router-dom";
const Dashboard = () => {
  
    const logout = () =>
    {
      let user = JSON.parse(localStorage.getItem('registerdUser'))
      user.is_logged_in = false;
      localStorage.setItem('registerdUser',JSON.stringify(user))
    }

    return (
        <>
         <div className="text-center">
            <NavLink style={({ isActive }) => {
                    return {
                        textDecoration: isActive ? "underline" : "",
                    };
                }} className="default-btn add_btn_art" to="/dashboard/my-dashboard">
                My Dashboard
            </NavLink>
            <NavLink style={({ isActive }) => {
                    return {
                        textDecoration: isActive ? "underline" : "",
                        marginLeft : '15px'
                    };
                }} className="default-btn add_btn_art" to="/dashboard/edit-profile">
                Edit Profile
            </NavLink>
            <Link style={{marginLeft : "15px"}} className="default-btn add_btn_art" to="/" onClick={()=>logout()}>
                Logout
            </Link>
        </div>
        <Outlet></Outlet>
        </>
       
    )
}

export default Dashboard;