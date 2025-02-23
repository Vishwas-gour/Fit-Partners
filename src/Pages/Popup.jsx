import { useEffect } from 'react'
import "./css/popup.css"
import { useState } from 'react'
import loading from '../img/loadign.gif'
import succesfuly from '../img/submited.gif'
function Popup() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 4000);
    },[]);
    return (
        <div className='payment-loader'>
            <div className='select-payment-mode'>
                {(isLoading) ? (<img src={loading} height="100" alt="" />
                ) :  (<img src={succesfuly} height="200" alt="" />
                )}
            </div>
        </div>
    )
}

export default Popup