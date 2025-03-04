import { useParams } from "react-router-dom";
import "../css/adminProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
    const [loginInfo, setLoginInfo] = useState({});
    const { gmail } = useParams();
    const api = `http://localhost:3000/employeeLogin/?gmail=${gmail}`


    useEffect(() => {
        axios.get(api).then(res => {
            setLoginInfo(res.data[0])
        })
    }, [gmail]);


    return (
        (loginInfo &&
            <div className="admin-container">


                {console.log(loginInfo.img)}
                <div className="profile-content">
                    <div className="profile-card">
                        <img src='https://mir-s3-cdn-cf.behance.net/user/276/f8af4d127902381.5d52dd88b0f06.png' alt="Admin" className="admin-image" />
                        <h2 className="admin-name">{loginInfo.name}</h2>
                        <p className="admin-role">Administrator</p>
                    </div>

                    {/* Profile Details */}
                    <div className="profile-details">
                        <h3>Profile Details</h3>
                        <div><p><b>Email:</b> {loginInfo.gmail}</p></div>
                        <div><p><b>Phone:</b> {loginInfo.phone}</p></div>
                        <div><p><b>Address:</b> {loginInfo.address}</p></div>
                        <div><p><b>Department:</b> {loginInfo.department}</p></div>
                        <div><p><b>Joining Date:</b> {loginInfo.date}</p></div>

                        <h3>Bio</h3>
                        <div>
                            {loginInfo.bio}
                        </div>
                        <h3>Social Links</h3>
                        <div>
                            <b>LinkedIn:</b> {loginInfo.linkedin}
                        </div>
                        <div>
                            <b>GitHub :</b>  {loginInfo.git}
                        </div>

                    </div>
                </div>
            </div>
        )
    );
};

export default AdminProfile;
