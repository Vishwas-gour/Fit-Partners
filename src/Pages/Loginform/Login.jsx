import axios from 'axios';
import '../css/login.css';
import '../css/admin.css';
import { useEffect, useState } from 'react';
import { otpGenerator } from '../../Functions/starPrint';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { currentUserInfo } from '../../Redux/CartSlice'
import { message, Modal } from 'antd';


function LoginForm() {
  const dispatch = useDispatch();

  const [formInfo, setFormInfo] = useState({ "gmail": "", "password": "" });

  const [otp, setOtp] = useState({ "inputOtp": "", "sendedOtp": "" });
  const [users, setUsers] = useState(null);
  const [showLoginOrOTP, setShowLoginOrOTP] = useState(true);
  const navigate = useNavigate();
  const usersApi = `http://localhost:3000/loginInfo`

  function loadUserInfo() {
    axios.get(usersApi).then((res) => {
      setUsers(res.data)
    }).catch(err => {
      console.log(err);
    })
  }


  useEffect(() => {
    loadUserInfo();
  }, [])
  function handleSubmit(e) {
    e.preventDefault();
  }

  async function checkVelidation() {
    const userAPI = `http://localhost:3000/loginInfo/?gmail=${formInfo.gmail}`
    const res = await axios.get(userAPI);
    if (!formInfo.gmail || !formInfo.password) {
      message.warning("all fielt are mendotary");
      return;
    }
    else if (users) {
      const check = users.some((key) => formInfo.gmail === key.gmail)
      if (!check) {

        Modal.confirm({
          title:"you don,t have an account, create new one",
          onOk() {
              navigate('/signUp')
          },
      });
 return;
      } else {
        
        // ==> check password
        if (res.data[0].password != formInfo.password) {
          message.error("wrong password");
          return;
        }

        message.success("Verification code sended to your gmail")
      }
    }
    setShowLoginOrOTP(false);
    setOtp(pre => ({ ...pre, "sendedOtp": otpGenerator(4) }))
  }

  function otpSet(e) {
    let value = e.target.value;
    setOtp(pre => ({ ...pre, "inputOtp": value }))
  }

  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFormInfo(pre => ({ ...pre, [name]: value }));
  }

  async function checkOtp() {
    if (otp.inputOtp == otp.sendedOtp) {
      // set info to currentUserInfo
      const userAPI = `http://localhost:3000/loginInfo/?gmail=${formInfo.gmail}`
      const res = await axios.get(userAPI);

      dispatch(currentUserInfo(res.data[0]));
      message.success("login succesfuly")
      navigate('/home');
    } else {
      message.error("wrong otp try again")
    }
  }

  return (
    <div className="login_container">
      <div className="login_form" id="login_page">
        <form onSubmit={handleSubmit}>
          <h3>Log in with</h3>
          <div className="login_option">
            <div className="option">
              <a href="https://workspace.google.com/intl/en-US/gmail/">
                <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo.png" alt="Google" />
                <span>Google</span>
              </a>
            </div>
            <div className="option">
              <a href="#">
                <img src="https://w7.pngwing.com/pngs/27/996/png-transparent-apple-logo-apple-logo-white-heart-logo.png" alt="Apple" />
                <span>Apple</span>
              </a>
            </div>
          </div>
          <p className="separator"> <span >or</span> </p>
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="text" id="gmail" name="gmail" placeholder="Enter email address"
              onChange={(e) => handleInput(e)} value={formInfo.gmail} /> </div>
          <div className="input_box">
            <div className="forget-password">   <label htmlFor="password">Password</label>   <a href="#" onClick={() => navigate('/forget')}>Forgot Password?</a>   </div>
            <input type="password" id="password" name="password" placeholder="Enter your password"
              onChange={(e) => handleInput(e)} value={formInfo.password} />
          </div>

          {(showLoginOrOTP) ? (<button onClick={(e) => checkVelidation(e)}>Request OTP</button>) :
            (
              <div className='otp-login'>
                <input className="otpInput" type="text" maxLength="4" placeholder='Enter OTP' value={otp.inputOtp} onChange={(e) => otpSet(e)} />
                <button onClick={checkOtp}>Login</button>
              </div>
            )}
          <p className="sign_up">
            Don&apos;t have an account? <a href="#" onClick={() => navigate('/signUp')}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;