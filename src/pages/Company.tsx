import Logo from "@/components/comman/logo/Logo";
import Slider from "react-slick";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

function Company() {
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
    <>
      <Header />
      <div className="flex">
        <img src="../assets/img/Group 1000001826.png" />

        <div className="w-[694px]">
          <div className="flex justify-end">
            <label>
              Already have an account?
              <a className="text-[#042937]">Sign In</a>
            </label>
          </div>
          <div className="w-[500px] h-[400px] relative mt-[142px] ml-[91px]">
            <h3>Secure your berth & set sail</h3>
            <img
              className="absolute right-0 top-[15px]"
              src="../assets/img/pngwing 25.png"
            />
            <img className="" src="../assets/img/Line 23.png" />
            <p className="w-[530px] h-[80px] text-[16px] font-[400]">
              Enter your company name eamil and set a password to anchor your
              details. submit to receive an OTP, steering you towards the next
              leg of your sustainable journey.
            </p>
            <label>Company name</label>
            <input className="w-[500px] h-[46px] border solid 1.5px" />
            <label>Email</label>
            <input className="w-[500px] h-[46px] border solid 1.5px" />

            <div className="flex flex-wrap gap-x-[20px]">
              <label className="w-[250px]">Set a password</label>
              <label>confirm Password</label>
              <input className="w-[240px] h-[46px] border solid 1.5px" />

              <input className="w-[240px] h-[46px] border solid 1.5px" />
            </div>
          </div>

          <div className="ml-[100px] flex gap-x-[40px]">
            <button className="w-[480px] h-[48px] bg-[#00778B] rounded-[4px] text-white">
              Get OTP
            </button>
          </div>

          <div className="ml-[116px] mt-[150px] flex gap-x-[40px]">
            <Logo />
            <Slider className="w-[381px] h-[44px]" {...settings}>
              <div>
                <span>
                  “Small choices, big impact. Ripples of eco-friendly actions
                  shape a sustainable future”
                </span>
              </div>
              <div>
                <span>
                  “Small choices, big impact. Ripples of eco-friendly actions
                  shape a sustainable future”
                </span>
              </div>
              <div>
                <span>
                  “Small choices, big impact. Ripples of eco-friendly actions
                  shape a sustainable future”
                </span>
              </div>
            </Slider>
          </div>

          <div className="w-[296px] h-[30px] font-[400] text-[12px] mt-[100px] ml-[180px]">
            <label>
              Protected by reCAPTCHA and subject to the Skillnet{" "}
              <Link to="/privacypolicy" className="text-[#042937]">
                Privacy Policy{" "}
              </Link>{" "}
              and{" "}
              <Link to={"/termsofservices"} className="text-[#042937]">
                Terms of Service.
              </Link>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Company;
