import { PrimaryButton } from "./comman/Button/PrimaryButton";



function Header() {
    return (    
        <header className="max-container flex">
            <div className="xl:ml-[167px] ml-[50px] mt-[57px] ">
                <img className="max-w-[131px] h-[86px]" src="../assets/img/logo1.png" />
            </div>
            <div className="mt-[106px] ml-[22px] text-[#3A3A3A] font-[calibri]">
                <ul className="flex gap-[31px] font-[400] text-[16px] leading-[19.53px] ">
                    <li className="group flex items-center gap-[5px]">
                        <span className="cursor-pointer">Our Courses</span>
                        <img className="w-[6px] h-[6px]" src="../assets/img/Vector 1.png"/>
                    </li>
                    <li>Testimonial</li>
                    <li>Blogs</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="mt-[94px] ml-[136px] font-[calibri] font-[700] text-[18px]">
                <PrimaryButton name="Register" className="max-w-[139px] h-[42px] py-[10px] px-[39px]" />
                <PrimaryButton name="Login" className="max-w-[186px] h-[42px] py-[10px] px-[39px] ml-[20px] " />
            </div>

            <img className="ml-[31px] mt-[42px] w-[136px] h-[105px]" src="../assets/img/logo2.png" />

        </header>
    );
}

export default Header;
