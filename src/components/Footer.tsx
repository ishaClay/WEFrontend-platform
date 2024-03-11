import React from 'react';

function Footer() {
    return (
        <footer className='absolute w-[1575px] h-[300px] bg-[#71B2C9] top-[4683px] left-[56px] '>
            <div className='w-[1162px] h-[440px] bg-[#002A3A] absolute top-[-140px] left-[200px] rounded-tl-[20px] rounded-tr-[20px] '>
                <div>
                    <img className='absolute top-[59px] left-[29px]' src='../assets/img/network-group.png' />
                    <div className=' absolute h-[1px] top-[180px] left-[35px] w-[950px] bg-[#FFFFFF]'></div>
                    <ul className='absolute right-[52px] top-[38px] text-white flex flex-col justify-center gap-y-[3px]'>
                        <a>Our Courses</a>
                        <a>Membership</a>
                        <a>Testimonial</a>
                        <a>News</a>
                        <a>Contact Us</a>
                    </ul>

                    <div className='text-white absolute left-[350px] top-[350px]'>
                        <ul className='no-underline'>

                            © County Wexford Chamber 2023. All Rights Reserved.

                        </ul>

                        <div className='flex gap-[18.27px] justify-center'>
                            <i className="fa-brands fa-x-twitter" />
                            <i className="fa-brands fa-instagram" />
                            <i className="fa-brands fa-facebook-f" />
                            <i className="fa-brands fa-youtube" />
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;