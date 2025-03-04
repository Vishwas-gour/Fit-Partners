import { useNavigate } from "react-router-dom"

import '../css/whoLogin.css'
function WhoLogin() {

    const naviate = useNavigate();
    function navigateTo(path) {
        naviate(`/login/${path}`)
    }
    return (


        <>

            <div className="whologin">
                <h2>Select Login Type</h2>
                <div className="buttons">
                    <button onClick={() => navigateTo("employeeLogin ")} className="login-btn .employee-btn">Employee Login</button>
                    <button onClick={() => navigateTo("userLogin")} className="login-btn user-btn ">User Login</button>
                </div>
            </div>

        </>
        
    )
}

export default WhoLogin