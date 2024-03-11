import { PrimaryButton } from "./comman/Button/PrimaryButton";



function Header() {
    return (
        <header className="container flex max-w-[1500px] mx-auto">
            <div className="ml-[167px] mt-[57px] lg:ml-[90px] md:ml-[20px] sm:ml-[20px] sm:mt-[65px]">
                <img className="w-[131px] h-[86px] sm:w-[90px] sm:h-[75px]" src="../assets/img/logo1.png" />
            </div>
            <div className="mt-[106px] ml-[22px]">
                <ul className="flex gap-[31px] font-[400] text-[16px] leading-[19.53px] lg:gap-[20px] md:text-[12px] md:gap-[12px] sm:text-[10px] sm:gap-[12px]">
                    <li className="relative group">
                        <span className="cursor-pointer">Our Courses</span>
                        <ul className="absolute left-0 mt-1 hidden group-hover:block bg-white shadow-md py-2 px-3 rounded-md">
                            <li>Course 1</li>
                            <li>Course 2</li>
                            <li>Course 3</li>
                        </ul>
                    </li>
                    <li>Testimonial</li>
                    <li>Blogs</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="mt-[94px] ml-[136px] xl:ml-[60px] xl:mx-auto lg:ml-[15px] md:ml-[10px] sm:ml-[10px]">
                <PrimaryButton name="Register" className="w-[139px] h-[42px] py-[10px] px-[38px] lg:w-[100px] lg:px-[18px] md:w-[70px] md:px-[10px] md:text-[10px] sm:w-[70px] sm:px-[8px] sm:text-[10px]" />
                <PrimaryButton name="Login" className="w-[186px] h-[42px] py-[10px] px-[38px] ml-[10px] lg:w-[130px] md:ml-[10px] md:w-[90px] md:px-[10px] md:text-[10px] sm:w-[90px] sm:px-[8px] sm:text-[10px] sm:ml-[5px]" />
            </div>
            <div className="ml-[31px] mt-[42px] sm:mt-[55px]">
                <img className="w-[136px] h-[105px] md:w-[110px] md:h-[95px] sm:w-[80px] sm:h-[85px]" src="../assets/img/logo2.png" />
            </div>
        </header>
    );
}

export default Header;
