import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./comman/Button/CustomButton";

interface headerProps {
  hasDiffHeader?: boolean;
}

function Header(props: headerProps) {
  const navigate = useNavigate();

  const userData = localStorage?.getItem("user" || "");
  const userToken = userData;
  console.log("userToken", userToken);

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  return (
    // Note : This below code is for backup
    <header
      className={`xl:max-w-[1160px] max-w-full mx-auto xl:px-0 px-5 py-7 ${
        props.hasDiffHeader ? "mx-7" : ""
      }`}
    >
      <div className="flex justify-between">
        <div className="flex items-end">
          <div className={` ${!props.hasDiffHeader ? "xl:mr-7 mr-3" : ""}`}>
            <img
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
              src="../assets/img/logo1.png"
            />
          </div>
          <div className="xl:ml-5 ml-3 text-[#1f1313]">
            <ul className="flex gap-[31px] font-normal text-base leading-5 text-color font-calibri">
              <li className="group flex items-center gap-[5px]">
                <span className="cursor-pointer">Our Courses</span>
                <img
                  className="w-[6px] h-[6px]"
                  src="../assets/img/Vector 1.png"
                />
              </li>
              <li>Testimonial</li>
              <li>Blogs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="flex items-end">
          <div className="font-bold text-lg text-color">
            {userToken ? (
              <PrimaryButton
                onClick={handleLogout}
                name="Logout"
                className="max-w-[186px] h-[42px] py-2.5 px-10 ml-5 primary-background"
              />
            ) : (
              <>
                <PrimaryButton
                  onClick={() => {
                    navigate("/register");
                  }}
                  name="Register"
                  className="xl:px-[39px] px-[30px] py-2 primary-background !font-calibri text-lg font-bold"
                />
                <PrimaryButton
                  onClick={() => {
                    navigate("/auth");
                  }}
                  name="Login"
                  className="xl:px-[73px] px-[45px] ml-5 py-2 primary-background !font-calibri text-lg font-bold"
                />
              </>
            )}
          </div>
          <img className="xl:ml-7 ml-3" src="../assets/img/logo2.png" />
        </div>
      </div>
    </header>
  );
}

export default Header;
