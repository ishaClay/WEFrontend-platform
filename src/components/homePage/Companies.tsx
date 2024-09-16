import { RegisterContext } from "@/context/RegisterContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Companies = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useContext(RegisterContext);
  return (
    <div id="company">
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 md:my-[40px] my-0">
        {/* <p className="button-color text-color inline-block xl:text-2xl text-xl rounded-[6px] font-bold font-abhaya h-[47px] !leading-7 p-[10px]">
          For Companies
        </p> */}
        <div className="lg:w-[70%] sm:w-[90%] w-full m-auto text-center xl:py-0 py-9 text-[#3A3A3A]">
          <h6 className="md:text-4xl sm:text-3xl text-2xl font-medium font-UniNeue md:leading-10 sm:leading-8">
            There’s never been
            <br />
            <span className="font-extrabold">a clear road for you before</span>
          </h6>
          <p className="xl:pt-6 pt-5 xl:text-xl text-lg font-Droid-Regular text-[#000000] font-medium">
            As a mindful, aware business: the goal for greater sustainability
            may always have been clear to you. But between not knowing where you
            even stand now, what actions you should take, and what progress even
            means—it’s a tall demand to expect you to take the steadfast
            journey.
            <br />
            <span className="text-[#75BD43]">
              But with the right support? We’d think it’d be a different story
              for you…
            </span>
          </p>
        </div>
        <Button
          type="button"
          variant={"default"}
          onClick={() => {
            setSelectedRole("company");
            navigate("/register");
          }}
          className="rounded-[4px] flex justify-center items-center text-left gap-[10px] text-lg font-extrabold font-abhaya m-auto w-[278px] sm:h-[59px] h-[44px] bg-[#75BD43] secondary-text md:mt-8 mt-6"
        >
          <div>Register As A Company Now</div>
          <div>
            <img className="" src="../assets/img/Move Right.png" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Companies;
