import { SecondaryButton } from "../comman/Button/CustomButton";

const Journey = () => {
  return (
    <div className="flex items-center justify-center xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 relative xl:mt-[59px] my-12 lg:h-[350px] h-full xl:mb-[179px] mb-[80px]">
      <div className="z-50">
        <img
          className="left-24 top-1/2 -translate-y-1/2 md:block hidden xl:w-[400px] w-[350px] absolute"
          src="../assets/img/pngwing 3.png"
        />
      </div>
      <div className="flex items-center justify-end w-full max-w-[1160px] mr-5">
        <div className="border border-solid border-[#B9B9B9] z-10 pl-[300px] py-6 max-w-[843px]">
          <h3 className="text-[32px] text-2xl font-semibold leading-9 text-color font-abhaya tracking-tighter xl:pr-28 pr-20">
            Because with
            <span className="primary-text"> direction</span>,
            <br /> you can purposefully journey there
          </h3>
          <SecondaryButton
            name="Get Started Today"
            className="py-[12px] px-[36px] rounded-[4px] mt-[36px] hover:bg-[green] text-[20px] leading-5 font-abhaya font-bold"
          ></SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Journey;
