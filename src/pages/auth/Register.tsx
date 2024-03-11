import RegisterButton from "@/components/comman/Button/RegisterButton";
import Logo from "@/components/comman/logo/Logo";

function Register() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		cssEase: "linear",
	};

	return (
		<div className="container flex mx-auto">
			<div className="relative">
				<img className="w-[694px]" src="../assets/img/Image.png" />
				<img
					className="absolute top-[142px] left-[160px]"
					src="../assets/img/Multipurpose.png"
				/>
				<img
					className="absolute top-[363px] left-[240px] w-[318px] h-[496px]"
					src="../assets/img/pngwing.png"
				/>
			</div>

			<div className="w-[694px]">
				<div className="flex justify-end">
					<label>
						Already have an account?<a className="text-[#042937]">Sign In</a>
					</label>
				</div>
				<div className="w-[505px] h-[450px] relative mt-[142px] ml-[91px]">
					<h3>Choose your role...</h3>
					<img
						className="absolute right-0 top-[15px]"
						src="../assets/img/pngwing 25.png"
					/>
					<p className="mb-0">Hey there! Ready to start your adventure?</p>
					<img className="" src="../assets/img/Line 23.png" />
					<p className="w-[446px] h-[40px] text-[16px] font-[400]">
						Just click on your role “Company or Trainer” and let's drive into
						your journey!
					</p>
					<div>
						<RegisterButton />
					</div>
				</div>

				<div className="ml-[116px] flex gap-x-[40px]">
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

				<div className="w-[296px] h-[30px] font-[400] text-[12px] mt-[154px] ml-[180px]">
					<label>
						Protected by reCAPTCHA and subject to the Skillnet{" "}
						<a className="text-[#042937]">Privacy Policy</a> and{" "}
						<a className="text-[#042937]">Terms of Service.</a>
					</label>
				</div>
			</div>
		</div>
	);
}

export default Register;
