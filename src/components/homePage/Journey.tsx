import { SecondaryButton } from "../comman/Button/CustomButton";

const Journey = () => {
  return (
    <div className="lg:flex block items-center justify-center xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-6 relative xl:mt-[59px] lg:mt-[50px] mt-6 lg:h-[350px] h-auto xl:mb-[179px] lg:mb-[80px] mb-0">
      <div className="z-50">
        <img
          className="left-24 top-1/2 lg:-translate-y-1/2 xl:w-[400px] lg:w-[350px] sm:w-auto w-[240px] lg:absolute mx-0"
          src="../assets/img/pngwing 3.png"
        />
      </div>
      <div className="flex items-center lg:justify-end justify-start w-full max-w-[1160px] mr-5 lg:mt-0 sm:mt-10 mt-5">
        <div className="border border-solid border-[#B9B9B9] z-10 lg:pl-[300px] lg:pr-0 md:pr-36 sm:pr-20 lg:py-6 py-5 px-5 max-w-[843px]">
          <h3 className="text-[32px] font-semibold leading-9  font-abhaya tracking-tighter xl:pr-28 lg:pr-20 pr-0">
            Because with
            <span className="primary-text"> direction</span>,
            <br /> you can purposefully journey there
          </h3>
          <SecondaryButton
            name="Get Started Today"
            className="py-[12px] px-[36px] rounded-[4px] md:mt-[36px] sm:mt-[28px] mt-[23px] hover:bg-[green] text-[20px] leading-5 font-abhaya font-bold"
          ></SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Journey;
