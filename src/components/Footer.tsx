import {  FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io5";

function Footer() {
	return (
		<footer className=" absolute w-[1500px] h-[300px] bg-[#71B2C9]">
			<div className="w-[1162px] h-[440px] bg-[#002A3A] absolute top-[-140px] left-[165px] rounded-tl-[20px] rounded-tr-[20px] ">
				<div>
					<img
						className="absolute top-[59px] left-[29px]"
						src="../assets/img/network-group.png"
					/>
					<div className=" absolute h-[1px] top-[180px] left-[35px] w-[950px] bg-[#FFFFFF]"></div>
					<ul className="absolute right-[52px] top-[38px] text-white flex flex-col justify-center gap-y-[3px]">
						<a>Our Courses</a>
						<a>Membership</a>
						<a>Testimonial</a>
						<a>News</a>
						<a>Contact Us</a>
					</ul>

					<div className="text-white absolute left-[350px] top-[300px]">
						<ul className="no-underline">
							© County Wexford Chamber 2023. All Rights Reserved.
						</ul>

						<div className="flex gap-[18.27px] justify-center mt-[30px]">
							<FaXTwitter />
							<BsInstagram />
							<FaFacebookF />
							<IoLogoYoutube />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
