import { useState } from "react";
import { otpGenerator } from "../../Functions/starPrint";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from "antd";
function LoginForm() {
  const navigate = useNavigate();
  const [showLoginOrOTP, setShowLoginOrOTP] = useState(true);
  const [otp, setOtp] = useState({ "inputOtp": "", "sendedOtp": "" });
  const [formInfo, setFormInfo] = useState({ "name": "", "address": "", "gmail": "", "password": "", "passwordcnf": "" });
  const loginInfoApi = `http://localhost:3000/loginInfo`;

  function handleInput(e) {
    let name = e.target.name.toLowerCase();
    let value = e.target.value.toLowerCase();
    setFormInfo(pre => ({ ...pre, [name]: value }));
  }

  function checkOtp() {
    if (otp.inputOtp == otp.sendedOtp) {
      // ---------> Because I dont'w want to store passwordcnf in   
      delete formInfo.passwordcnf;
      axios.post(loginInfoApi,  formInfo)
      message.success("Account succesfuly created")
      navigate('/login');
    } else {
      message.error("wrong otp try again")
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  async function checkVelidation() {
    const userApi = `${loginInfoApi}/?gmail=${formInfo.gmail}`
    const res = await axios.get(userApi);
    if (res.data.length > 0) {
      // -------> Check isUser have account 
      Modal.confirm({
        title: "you have already an acount try to login",
        onOk() {
          navigate('/login')
        }
    });
      return;
    }
    else if (!formInfo.name || !formInfo.address || !formInfo.gmail || !formInfo.password || !formInfo.passwordcnf) {
      console.log(formInfo)
      message.warning("all fields are mendotary");
      return;
    } else if (formInfo.passwordcnf !== formInfo.password) {
      message.error("passwords are not matching")
      return;
    }
    message.success("Verification code sended to your gmail")
    setShowLoginOrOTP(false);
    setOtp(pre => ({ ...pre, "sendedOtp": otpGenerator(4) }))
  }


  function otpSet(e) {
    let value = e.target.value;
    setOtp(pre => ({ ...pre, "inputOtp": value }))
  }

  return (
    <div className="login_container">
      <div className="login_form" id="login_page">
        <form onSubmit={handleSubmit}>
          <h3>Sign up with</h3>
          <div className="input_box">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter Full Name" onChange={handleInput} />
          </div>
          <div className="input_box">
            <label htmlFor="gmail">Email</label>
            <input type="gmail" id="gmail" name="gmail" placeholder="Enter email address" onChange={handleInput} />
          </div>
          <div className="input_box">
            <div className="address">   <label htmlFor="address">Address</label>  </div>
            <input type="text" id="address" name="address" placeholder="Enter Address" onChange={handleInput} />
          </div>
          <div className="input_box">
            <div className="forget-password">   <label htmlFor="password">Password</label>   </div>
            <input type="password" id="password" name="password" placeholder="Create password" onChange={handleInput} />
          </div>
          <div className="input_box">
            <input type="password" id="password" name="passwordcnf" placeholder="Confirn password" onChange={handleInput} />
          </div>
          {(showLoginOrOTP) ? (<button onClick={(e) => checkVelidation(e)}>Request OTP</button>) :
            (
              <div className='otp-login'>
                <input className="otpInput" type="text" maxLength="4" placeholder='Enter OTP' value={otp.inputOtp} onChange={(e) => otpSet(e)} />
                <button onClick={checkOtp}>Create Account</button>
              </div>
            )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
