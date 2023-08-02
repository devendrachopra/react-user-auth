import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import config from "../../Config/config";
import { useNavigate } from "react-router-dom";
const RegisterUser = () =>{
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate()
    const onSubmit = (data,event) =>{
        event.preventDefault();
        let new_user  = true;
        let registerUser = JSON.parse(localStorage.getItem('registerdUser'));
        if(registerUser)
        {
          if(registerUser.mobile === data.mobileNumber)
          {
            new_user = false
          }
          else{
            new_user = true
          }
        }
    
        let user = {
            mobile : data?.mobileNumber,
            name : '',
            email : '',
            address : '',
            date_of_birth : '',
            otp : config.otp,
            is_new_user : new_user,
            is_logged_in : false
        }

        localStorage.setItem("registerdUser",JSON.stringify(user))
        toast.success('Otp send on registerd mobile number or use otp 123456!', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        navigate('/verify-otp')
    }

    const numberOnly = (event)  => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            event.preventDefault();
        }
      }

    return (
        <div className="card m-3">
        <h5 className="card-header">Registration Form</h5>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                id="mobile-number"
                type="text"
                placeholder="Enter mobile number"
                className="form-control"
                maxLength="10"
                onKeyPress={numberOnly}
                {...register("mobileNumber",{required : 'Mobile Number is required',maxLength : {
                    value : 10,
                    message : 'Mobile number should be 10 digits.'
                }})}
              />
              {errors.mobileNumber && errors.mobileNumber.message ? <div className="text-danger validation-error">{errors.mobileNumber.message}</div> : ''}
            </div>
            <div className="text-center">
              <button className="btn btn-primary mr-1" type="submit">Register</button>
              <button className="btn btn-secondary"   onClick={() => reset()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default RegisterUser;