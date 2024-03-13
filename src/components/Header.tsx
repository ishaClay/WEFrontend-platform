import { PrimaryButton } from "./comman/Button/PrimaryButton";



function Header() {
    return (
        <header className="container flex">
            <div className="ml-[167px] mt-[57px] ">
                <img className="w-[131px] h-[86px]" src="../assets/img/logo1.png" />
            </div>
            <div className="mt-[106px] ml-[22px] text-[#3A3A3A] font-[calibri]">
                <ul className="flex gap-[31px] font-[400] text-[16px] leading-[19.53px] ">
                    <li className="relative group">
                        <span className="cursor-pointer">Our Courses</span>
                    </li>
                    <li>Testimonial</li>
                    <li>Blogs</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="mt-[94px] ml-[136px] font-[calibri] font-[700] text-[18px]">
                <PrimaryButton name="Register" className="w-[139px] h-[42px] py-[10px] px-[39px]" />
                <PrimaryButton name="Login" className="w-[186px] h-[42px] py-[10px] px-[39px] ml-[20px] " />
            </div>

            <img className="ml-[31px] mt-[42px] w-[136px] h-[105px]" src="../assets/img/logo2.png" />

        </header>
    );
}

export default Header;
