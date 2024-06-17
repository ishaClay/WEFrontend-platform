import mandatory from "/assets/img/Mandatory.svg";

import { Link } from "react-router-dom";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Input from "../comman/Input/Input";

const RegisterTraineeForm = () => {
  return (
    <>
      <div className="flex justify-end text-color">
        <label>
          Already have an account?{" "}
          <Link to={"/register"} className="font-[700] text-[#042937]">
            Sign In
          </Link>
        </label>
      </div>
      <div className="mb-4 xl:mt-[49px] mt-[40px]">
        <span className="text-[#202020] text-2xl leading-[30px] font-bold drop-shadow-[0px_4px_4px_0px_#00000060] font-calibri">
          Register as
        </span>
        <div className="flex overflow-hidden justify-evenly border-gainsboro-100 border-solid border-[1px] rounded-[5px] w-[328px] h-[42px] text-[18px] leading-[18px] font-normal text-darkslategray-100 mt-[27px] mb-[33px]">
          <button className="w-full">Trainer</button>
          <button className="w-full">company</button>
          <button className="w-full bg-[#73AF26] text-white font-bold">
            Trainee
          </button>
        </div>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-x-8 text-[16px] leading-[19.53px] font-bold">
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              First Name
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              onChange={() => {}}
              onBlur={() => {}}
              value={""}
              className={"!w-full"}
              name="firstName"
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Surname
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="surname"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Gender
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="gender"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Age Range
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="ageRange"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Email
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="emailAddress"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Phone
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="phone"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Current Highest NFQ
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="currentHighestNFQ"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Employment Status
            </label>
            <Input
              label=""
              name="employmentStatus"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Member Company
            </label>
            <Input
              label=""
              name="memberCompany"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Occupational Category
            </label>
            <Input
              label=""
              name="occupationalCategory"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Unemployment Time
            </label>
            <Input
              label=""
              name="unemploymentTime"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              County Of Residence
              <img src={mandatory} className="p-1" />
            </label>
            <Input
              label=""
              name="countyOfResidence"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />

            <ErrorMessage message={""} />
          </div>
          <div className="mb-4 col-span-1">
            <label className="mb-1  text-[#3A3A3A] font-bold flex items-center leading-5 font-calibri text-base">
              Attended Event
            </label>
            <Input
              label=""
              name="attendedEvent"
              value={""}
              className={"!w-full"}
              onChange={() => {}}
              onBlur={() => {}}
            />
          </div>
        </div>
        <button className="xl:mt-12 mt-6 bg-primary-button rounded w-[370px] h-12 text-white border border-solid border-black shadow-[0px_4px_4px_0px_#00000040] m-auto flex justify-center py-3 font-calibri font-bold">
          Submit
        </button>
      </form>
      <p className="xl:mt-[39px] mt-[30px] text-[#898989] text-[12px] leading-[14.65px] w-[296px] text-center font-normal mx-auto">
        Protected by reCAPTCHA and subject to the Skillnet{" "}
        <span className="text-darkslategray-200">Privacy Policy</span> and{" "}
        <span className="text-darkslategray-200">Terms of Service.</span>
      </p>
    </>
  );
};

export default RegisterTraineeForm;
