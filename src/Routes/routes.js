
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
const createRoutes = () =>(
    <Router> 
        <Routes>
            <Route path='/'  element={<App/>} >
                <Route path="" element={<Navigate replace to={'/register'}/>}/>
                <Route path='/register' element={<RegisterUser />}/>
                <Route path='/verify-otp' element={<VerifyOtp/>} />
            </Route>
        </Routes>
    </Router>
)

export default createRoutes;