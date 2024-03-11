import { ChangeEvent, useState } from 'react';
// import Slider from 'react-slick/lib/slider';
import { Link } from 'react-router-dom';
import IngSection from '@/components/comman/section/IngSection';
import Logo from '@/components/comman/logo/Logo';
import Slider from 'react-slick';

function Company() {

    const [isOpen, setIsOpen] = useState(false);
    const [otp, setOTP] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleOTPChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOTP(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log('Entered OTP:', otp);

        setIsOpen(false);
    };



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear"
    };

    return (
        <div className='container  mx-auto  flex'>
            <IngSection />

            <div className='w-[694px]'>
                <div className='flex justify-end'>
                    <label>Already have an account?<a className='text-[#042937]'>Sign In</a></label>
                </div>
                <div className='w-[500px] h-[400px] relative mt-[142px] ml-[91px]'>
                    <h3>Secure your berth & set sail</h3>
                    <img className='absolute right-0 top-[15px]' src='../assets/img/pngwing 25.png' />
                    <img className='' src='../assets/img/Line 23.png' />
                    <p className='w-[530px] h-[80px] text-[16px] font-[400]'>Enter your company name eamil and set a password to anchor your details. submit to receive  an OTP, steering you towards the next leg of your sustainable journey.</p>
                    <label>Company name</label>
                    <input className='w-[500px] h-[46px] border solid 1.5px' />
                    <label>Email</label>
                    <input className='w-[500px] h-[46px] border solid 1.5px' />

                    <div className='flex flex-wrap gap-x-[20px]'>
                        <label className='w-[250px]'>Set a password</label>
                        <label>confirm Password</label>
                        <input className='w-[240px] h-[46px] border solid 1.5px' />

                        <input className='w-[240px] h-[46px] border solid 1.5px' />
                    </div>


                </div>

                <div className='ml-[100px] flex gap-x-[40px]'>

                    <Link to="/otp">
                        <button onClick={togglePopup} className='w-[480px] h-[48px] bg-[#00778B] rounded-[4px] text-white'>Get OTP</button>
                    </Link>

                    {isOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg">
                                <p>Enter OTP:</p>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={handleOTPChange}
                                        className="mt-2 px-4 py-2 border border-gray-300 rounded w-full"
                                        placeholder="Enter OTP"
                                        required
                                    />
                                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                        Submit
                                    </button>
                                    <button onClick={togglePopup} className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded">
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                </div>

                <div className='ml-[116px] mt-[150px] flex gap-x-[40px]'>
                    <Logo />
                    {/* <Slider className='w-[381px] h-[44px]' {...settings} >
                        <div>
                            <span>“Small choices, big impact. Ripples of eco-friendly actions shape a sustainable future”</span>
                        </div>
                        <div>
                            <span>“Small choices, big impact. Ripples of eco-friendly actions shape a sustainable future”</span>
                        </div>
                        <div>
                            <span>“Small choices, big impact. Ripples of eco-friendly actions shape a sustainable future”</span>
                        </div>
                    </Slider> */}

                </div>

                <div className='w-[296px] h-[30px] font-[400] text-[12px] mt-[100px] ml-[180px]'>
                    <label>Protected by reCAPTCHA and subject to the Skillnet <a className='text-[#042937]'>Privacy Policy</a> and <a className='text-[#042937]'>Terms of Service.</a></label>
                </div>



            </div>

        </div>
    );
}

export default Company;