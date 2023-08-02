
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate 
  } from 'react-router-dom';
import App from "../App";
import RegisterUser from '../Components/Auth/registerUser';
import VerifyOtp from "../Components/Auth/verifyOtp";
import Dashboard from "../Components/Dashboard/dashboard";
import MyDashboard from '../Components/Dashboard/myDashboard'
import EditProfile from "../Components/Dashboard/editProfile";
const createRoutes = () =>(
    <Router> 
        <Routes>
            <Route path='/' element={<App/>} >
                <Route path="" element={<Navigate replace to={'/register'}/>}/>
                <Route path='/register' element={<RegisterUser />}/>
                <Route path='/verify-otp' element={<VerifyOtp/>} />
                <Route path="/dashboard" element={<Dashboard/>}>
                    <Route path="" element={<Navigate replace to={'/dashboard/my-dashboard'} />} />
                    <Route path="my-dashboard" element={<MyDashboard/>}/>
                    <Route path="edit-profile" element={<EditProfile/>}/>
                </Route>
            </Route>
        </Routes>
    </Router>
)

export default createRoutes;