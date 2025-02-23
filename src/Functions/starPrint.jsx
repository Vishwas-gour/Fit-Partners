import { FaRegStar } from "react-icons/fa6";
import { TbNumber0, TbNumber1, TbNumber2, TbNumber3, TbNumber4, TbNumber5 } from "react-icons/tb";
import { LuStarOff } from "react-icons/lu";
import { RiMessengerLine } from "react-icons/ri";
import { FaRegStarHalf } from "react-icons/fa6";


function numbLogos(nStar) {
    switch (nStar) {
        case 1: return <TbNumber1 />;
        case 2: return <TbNumber2 />;
        case 3: return <TbNumber3 />;
        case 4: return <TbNumber4 />;
        case 5: return <TbNumber5 />;
        default: return <TbNumber0 />;
    }
}

function returnNStar(nStar = 4) {
    return [...Array(nStar)].map((_, i) => <FaRegStar key={i} />)
}

// return 1 digit after point

function returnAvgStar(nStar, maxStar) {
    let accurate = (nStar / maxStar) * 5;// in float
    accurate = parseFloat(accurate).toFixed(1);
    // true when acurate will be in  decimal
    // let check = (accurate !== parseInt(accurate)) ? (true) : (false);
    let pointNumb = (accurate) ? (Math.floor((accurate * 10) % 10)) : (0);

    let avgStar = Math.floor((nStar / maxStar) * 5);
    if (avgStar) {
        return (
            <>
                {accurate}
                {[...Array(avgStar)].map((val, i) => <FaRegStar s key={i} />)}
                {(pointNumb > 0) ? (<FaRegStarHalf />) : (<></>)}

            </>
        )
    }
    else return <LuStarOff />
}

function starPrintForReviews(nStar) {
    let numbLogo = numbLogos(nStar);
    let printStar = returnNStar(nStar);
    return (
        <div className='star' >
            {numbLogo}
            {nStar == 0 ? (<><LuStarOff /></>) : (<><div>{printStar}</div></>)}
        </div>
    )
}
function starPrintForCard(numberOfReviews, totalStar) {
    let avgStar = returnAvgStar(totalStar, numberOfReviews * 5);
    return (
        <div className='star' >
            <div>{numbLogos(numberOfReviews)} <RiMessengerLine /></div>
            <div>{avgStar}</div>

        </div>
    )
}

function otpGenerator(len) {
    let otp = ""
    for (let i = 0; i < len; i++) {
        otp += Math.trunc(Math.random() * 10);
    }
    console.log(`%c${"warning"}`, 'color: red');
    console.log(`Do not share OTP to anyone: %c${otp}`, 'color: orange');
    return otp;
}

function limitTheLength(data, length) {
    if ( data && data.length > length) {
        return data.substring(0, length) + "...";
    }
    return data;
}


export { limitTheLength, starPrintForReviews, starPrintForCard, otpGenerator };