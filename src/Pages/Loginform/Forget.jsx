import { message, Modal } from 'antd';
import { useState } from "react";
import { otpGenerator } from "../../Functions/starPrint";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forget() {

    const [visibleReque, setVisibleReque] = useState(true);
    const [visibleOtp, setVisibleOtp] = useState(false);
    const [visibleNewField, setVisibleNewField] = useState(false);

    const [otp, setOtp] = useState({ "inputOtp": "", "sendedOtp": "" });
    const [formInfo, setFormInfo] = useState({ "gmail": "", "password": "", "passwordcnf": "" })
    const loginInfoApi = `http://localhost:3000/loginInfo`;

    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        setFormInfo(pre => ({ ...pre, [name]: value }));
    }
    function checkOtp() {
        if (otp.inputOtp == otp.sendedOtp) {
            setVisibleOtp(false);
            setVisibleNewField(true)
        } else {
            message.error("invalide OTP")
        }
    }

    async function checkVelidation() {
        const userApi = `${loginInfoApi}/?gmail=${formInfo.gmail}`
        const res = await axios.get(userApi);
        if (res.data.length === 0) {
            // -------> Check isUser have account 

            Modal.confirm({
                title:"you don,t have an account, create new one",
                onOk() {
                    navigate('/signUp')
                }
            });
            return;
        }
        else if (!formInfo.gmail) {
            message.error("All fields are mandatory. Please fill them out!");
            return;
        }
        message.success("Verification code sended to your gmail")
        setOtp(pre => ({ ...pre, "sendedOtp": otpGenerator(4) }))
        setVisibleReque(false)
        setVisibleOtp(true)
    }
    function otpSet(e) {
        let value = e.target.value;
        setOtp(pre => ({ ...pre, "inputOtp": value }))
    }
    async function checkPassword() {
        if (formInfo.password != formInfo.passwordcnf) {
            message.error("passwords are not matching")
            return;
        }
        else {
            // ==================[PASSWORD UPDATED]==================
            let api = `http://localhost:3000/loginInfo/?gmail=${formInfo.gmail}`;
            const res = await axios.get(api);
            const id = res.data[0].id;
            let apiId = `http://localhost:3000/loginInfo/${id}`;

            // eslint-disable-next-line no-unused-vars
            axios.patch(apiId, { password: formInfo.password }).then(res => {
                message.success("Password succesfuly updated")
            });

            navigate('/login')
        }
    }

    return (
        <div className="login_container">
            <div className="login_form" id="login_page">
                <form onSubmit={handleSubmit}>
                    <h3>Forgot Password</h3>

                    <div className="input_box">
                        <label htmlFor="gmail">Email</label>
                        <input type="gmail" id="gmail" name="gmail" placeholder="Enter email address" value={formInfo.gmail} onChange={handleInput} />
                    </div>

                    {(visibleReque &&
                        <>
                            <button onClick={checkVelidation}>Request OTP</button>
                        </>
                    )}

                    {(visibleOtp &&

                        <div className='otp-login'>
                            <input className="otpInput" type="text" maxLength="4" placeholder='Enter OTP' value={otp.inputOtp} onChange={(e) => otpSet(e)} />
                            <button onClick={checkOtp}>Verify OTP</button>
                        </div>
                    )}
                    {(visibleNewField) ? (
                        <>
                            <div className="input_box">
                                <div className="forget-password">   <label htmlFor="password">Password</label>   </div>
                                <input type="password" id="password" name="password" placeholder="Create new password" onChange={handleInput} />
                            </div>
                            <div className="input_box">
                                <input type="password" id="password" name="passwordcnf" placeholder="Confirn new password" onChange={handleInput} />
                            </div>
                            <button onClick={checkPassword}>Update Password</button>
                        </>
                    ) : (<> </>)}



                </form>
            </div>
        </div>
    );
}

export default Forget