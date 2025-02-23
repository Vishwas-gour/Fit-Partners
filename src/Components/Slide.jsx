/* eslint-disable react/no-unknown-property */
import './css/slide.css'
import Carousel from 'react-bootstrap/Carousel';
function Slide() {

    const style = {
        textShadow:"0px 0px 4px  rgba(255, 255, 255, 0.5)",
    }
    return (
        <div className='slidebar'>
            <Carousel black>
                <Carousel.Item>
                    <img src="https://www.asianfootwears.com/_next/image?url=https%3A%2F%2Fcdn.asianlive.in%2Fdigital-website%2FWebsite-Banner_49647051138533264652.jpg&w=3840&q=75" alt="" />
                    <Carousel.Caption>
                        <h2 style={style}>Running Shoes</h2>
                        <h4 style={style}>Designed for forward motion activities like jogging and running</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://www.asianfootwears.com/_next/image?url=https%3A%2F%2Fcdn.asianlive.in%2Fdigital-website%2FHerobanner-Desktop_17996442942381882304.jpg&w=3840&q=75" alt="" />

                    <Carousel.Caption>
                        <h2 style={style}>Cross Training Shoes </h2>
                        <h4 style={style}>Versatile athletic shoes suitable for a mix of activities, from gym workouts to light sports. </h4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://www.asianfootwears.com/_next/image?url=https%3A%2F%2Fcdn.asianlive.in%2Fdigital-website%2FHerobanner-Desktop-new-launch_66594349059286605822.jpg&w=3840&q=75" alt="" />
                    <Carousel.Caption>
                        <h2 style={{...style, color:"white"}}>Basketball Shoes</h2>
                        <p4 style={{...style, color:"white"}}>
                            These shoes feature high-top designs to provide extra ankle support.
                        </p4>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://www.asianfootwears.com/_next/image?url=https%3A%2F%2Fs3-ap-southeast-1.amazonaws.com%2Fasianapp%2Fdigital-website%2FClogs_Hero%20Banner_D_10835864319244847339.png&w=3840&q=75" alt="" srcset="" />
                    <Carousel.Caption>
                        <h2 style={{...style, color:"white"}}>Comfortable Fit</h2>
                        <h4 style={{...style, color:"white"}}>
                            Crocs: Known for their lightweight, durable, and waterproof designs.
                        </h4>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

    )
}

export default Slide
