function Auth() {
	return (
		<div className="container mx-auto flex mt-[26px]">
			<div className="relative">
				<img className="w-[686px] h-[900px]" src="../assets/img/Image.png" />

				<img
					className="absolute top-[137px] left-[220px]  w-[234px] h-[365px]"
					src="../assets/img/pngwing.png"
				/>
				<img
					className="absolute top-[558px] left-[86px] w-[514px] h-[184px]"
					src="../assets/img/Multi.png"
				/>
			</div>
			<div className="relative">
				<ul className="absolute w-[212px] text-[14px] text-[#042937] top-[11px] left-[344px]">
					<li>
						Don’t have an account? <a>Sign Up</a>
					</li>
				</ul>
				<div className="relative LoginBox w-[418px] h-[463px] ml-[120px] mt-[112px] rounded-[10px] shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)] p-[24px]">
					<p className="text-[24px] font-[700] ">Login</p>
					<input
						className="w-[383px] h-[48px] mt-[32px] rounded border-[1px] p-[16px]"
						placeholder="Enter Username"
					/>
					<input
						className="w-[383px] h-[48px] mt-[24px] rounded border-[1px] p-[16px]"
						placeholder="Password"
					/>
					<ul className="mt-[24px]">
						<li>
							<a>Forgot password?</a>
						</li>
					</ul>
					<button className=" bg-primary-button rounded w-[370px] h-[48px] text-white mt-[32px]">
						Login
					</button>

					<div className="absolute top-[350px] left-0 w-full flex items-center justify-center">
						<div className="w-1/3 h-px bg-gray-300"></div>
						<div className="px-4 text-gray-500">or</div>
						<div className="w-1/3 h-px bg-gray-300"></div>
					</div>
					<div className="relative">
						<button className="w-[173px] mt-[50px] h-[48px] rounded shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)]">
							<img
								className="absolute left-[35px] top-[67px]"
								src="../assets/img/googlelogo.png"
							/>
							Google
						</button>
						<button className="w-[173px] ml-[23px] mt-[50px] h-[48px] rounded shadow-[_0px_0px_4px_0px_rgba(0,0,0,0.25)]">
							<img
								className="absolute left-[222px] top-[66px]"
								src="../assets/img/fblogo.png"
							/>
							Facebook
						</button>
					</div>
				</div>

				<div>
					<ul className="w-[370px] h-[30px] text-[12px] font-[400] absolute top-[800px] left-[180px]">
						<li>
							Protected by reCAPTCHA and subject to the Skillnet{" "}
							<a className="text-[#042937] ">Privacy Policy </a> and{" "}
							<a className="text-[#042937] ">Terms of Service.</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Auth;
