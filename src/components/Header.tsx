import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./comman/Button/CustomButton";

interface headerProps {
  hasDiffHeader?: any;
}

function Header(props: headerProps) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
console.log(props,"props++")
  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };
 
  return (
    // Note : This below code is for backup
    <header className={` max-container flex  ${props.hasDiffHeader ? 'mx-30' : ''}`}>
      <div className={` ${!props.hasDiffHeader ? 'mx-30' : ''} mt-[57px] 2xl:ml-[167px] xl:ml-[100px] ml-[50px]`}>
    {/* <header className={` max-container flex`}>
      <div className={`ml-30 mt-[57px] 2xl:ml-[167px] xl:ml-[100px]`}> */}
        <img
          onClick={() => {
            navigate("/");
          }}
          className="max-w-[131px] h-[86px] cursor-pointer"
          src="../assets/img/logo1.png"
        />
      </div>
      <div className="mt-[106px] ml-[22px] text-[#1f1313]">
        <ul className="flex gap-[31px] font-[400] text-[16px] leading-[19.53px] text-color">
          <li className="group flex items-center gap-[5px]">
            <span className="cursor-pointer">Our Courses</span>
            <img className="w-[6px] h-[6px]" src="../assets/img/Vector 1.png" />
          </li>
          <li>Testimonial</li>
          <li>Blogs</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="mt-[94px] xl:ml-[136px] ml-[20px] font-[700] text-[18px] text-color">
      

        {token ? (
          <PrimaryButton
            onClick={handleLogout}
            name="Logout"
            className="max-w-[186px] h-[42px] py-[10px] px-[39px] ml-[20px] primary-background"
          />
        ) : (
         <>
          <PrimaryButton
          onClick={() => {
            navigate("/register");
          }}
          name="Register" 
          className="xl:max-w-[139px] max-w-[129px] h-[42px] py-[10px] xl:px-[39px] px-[19px] primary-background"
        />
          <PrimaryButton
            onClick={() => {
              navigate("/auth");
            }}
            name="Login"
            className="xl:max-w-[186px] max-w-[110px] h-[42px] py-[10px] xl:px-[39px] px-[19px] ml-[20px] primary-background"
          />
         </>
       
        )}
      </div>     
      <img
        className="ml-[31px] mt-[42px] w-[136px] h-[105px]"
        src="../assets/img/logo2.png"
      />
      
    </header>
  );
}

export default Header;
