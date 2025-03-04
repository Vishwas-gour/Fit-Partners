import { useState } from "react";
import { otpGenerator } from "../../Functions/starPrint";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { message, Modal } from "antd";
function LoginForm() {
  const { login } = useParams();
  console.log(login)

  const navigate = useNavigate();
  const [showLoginOrOTP, setShowLoginOrOTP] = useState(true);
  const [otp, setOtp] = useState({ "inputOtp": "", "sendedOtp": "" });
  const [formInfo, setFormInfo] = useState({ "name": "", "address": "", "gmail": "", "password": "", "passwordcnf": "" });
  const loginInfoApi = `http://localhost:3000/${login}`;



  function handleInput(e) {
    let name = e.target.name.toLowerCase();
    let value = e.target.value.toLowerCase();
    setFormInfo(pre => ({ ...pre, [name]: value }));
  }

  function checkOtp() {
    if (otp.inputOtp == otp.sendedOtp) {
      // ---------> Because I dont'w want to store passwordcnf in  
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      delete formInfo.passwordcnf;
      axios.post(loginInfoApi, { ...formInfo, date: currentDate })
      message.success("Account succesfuly created")
      navigate(`/login/${login}`);
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
          navigate(`/login/${login}`)
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

          {(login == "employeeLogin") ?
            (<>
              <div className="input_box">
                <div className="phone">   <label htmlFor="phone">Phone</label>  </div>
                <input type="text" id="phone" name="phone" placeholder="Enter Phone Number" onChange={handleInput} />
              </div>
              <div className="input_box">
                <div className="img">   <label htmlFor="img">Phone</label>  </div>
                <input type="text" id="img" name="img" placeholder="Image url" onChange={handleInput} />
              </div>

              <div className="input_box">
                <div className="department">
                  <label htmlFor="department">Department</label>
                </div>
                <select id="department" name="department" onChange={handleInput}>
                  <option value="">Select Department</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>


              <h1>Social Link</h1>
              <div className="input_box">
                <div className="git">   <label htmlFor="git">Git URL</label>  </div>
                <input type="text" id="git" name="git" placeholder="Your git Profile" onChange={handleInput} />
              </div>
              <div className="input_box">
                <div className="linkedin">   <label htmlFor="linkedin">Linkedin URL</label>  </div>
                <input type="text" id="linkedin" name="linkedin" placeholder="Your linkedin" onChange={handleInput} />
              </div>
              <div className="input_box">
                <div className="bio">   <label htmlFor="bio">Bio</label>  </div>
                <input type="text" id="bio" name="bio" placeholder="Your bio here" onChange={handleInput} />
              </div>
           
            </>)
            : (<></>)}




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
