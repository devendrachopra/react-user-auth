import React, {useState , useEffect} from "react";
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import config from "../../Config/config";

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [submit,setSubmit] = useState(false)
    const [resendOtp,setResendOtp] = useState(false)
    const [displayTimer,setDisplayTimer] = useState(false)
    const [display,setDisplay] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();
        setSubmit(true)
        if(otp == '' || otp == null || otp == undefined)
        {
            return
        } 

        if(resendOtp)
        {
            toast.error('Otp expired please click on resend otp button to get new otp!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
          return;
        }

        if(otp.length== 6 )
        {
            if(otp == config.otp)
            {
                let registerUser =  JSON.parse(localStorage.getItem('registerdUser'));
                registerUser.is_logged_in = true;
                localStorage.setItem('registerdUser',JSON.stringify(registerUser));

                toast.success('Otp Veify Successfully!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                navigate('/dashboard/my-dashboard')
            }
            else{
                toast.error('Invalid Otp', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    }
    const numberOnly = (event)  => {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
            event.preventDefault();
        }
      }
    useEffect(()=>{
        start(1)
    },[])

    const start = (minute) => {
        setDisplayTimer(true)
        setResendOtp(false)
        let seconds = minute * 60;
        let textSec = '0';
        let statSec = 60;
    
        const prefix = minute < 10 ? '0' : '';
    
        const timer = setInterval(() => {
          seconds--;
          if (statSec != 0) statSec--;
          else statSec = 59;
          if (statSec < 10) {
            textSec = '0' + statSec;
          } else {
            textSec = statSec;
          }
          setDisplay(`${prefix}${Math.floor(seconds / 60)}:${textSec}`);
    
          if (seconds == 0) {
            console.log('finished');
            clearInterval(timer);
            setResendOtp(true)
            setDisplayTimer(false)
          }
        }, 1000);
    }
    

    return (
        <div className="card m-3">
            <h5 className="card-header">Verify otp send on registerd mobile number</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div style={{"display": "flex"}}>
                        <div className="form-group">
                            <label>Enter One Time Password</label>
                            <OtpInput
                                value={otp} 
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props}   onKeyPress={numberOnly}/>}
                                shouldAutoFocus
                                inputType="password"
                            />
                            {(submit && !otp) ? <div className="text-danger">Otp number is required</div> : (submit && otp && otp.length <6) ?<div className="text-danger">Pleas enter complete 6 digit otp</div>: ""}
                        </div>

                        <button className="btn btn-primary" disabled={!resendOtp} style={{marginLeft : "15px", height: "40px",marginTop : "28px"}} onClick={()=>start(1)}>Resend Otp</button>

                        {displayTimer ?<p style={{marginTop : "35px" , marginLeft : "15px"}}>{ display }</p> :""} 
                        
                        </div>

                    <div className="text-center">
                        <button className="btn btn-primary mr-1" type="submit">Verify Otp</button>
                        <button className="btn btn-secondary" type="reset" onClick={()=>setOtp("")}>
                        Clear Otp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
    
  
  


export default VerifyOtp;