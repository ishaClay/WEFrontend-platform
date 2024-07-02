const TrainingProviders = () => {
  return (
    <>
      <div className="xl:max-w-[1172px] max-w-full w-full mx-auto xl:px-0 px-5">
        <h6 className="text-4xl font-abhaya font-extrabold text-color text-center pb-10">
          Get your training to those it’ll help
        </h6>
        <div className="w-[250px] h-[47px] button-color rounded-[6px] flex justify-center items-center mb-[44px]">
          <p className="font-extrabold xl:text-2xl text-xl leading-5 traking-[-4%] text-color font-abhaya">
            For Training Providers
          </p>
        </div>
        <h3 className="font-extrabold text-2xl font-abhaya text-color leading-7">
          Get your training to those it’ll help
        </h3>
        <div className="gap-10 mt-[24px] flex items-center justify-center flex-wrap gap-y-20">
          <div className="flex gap-[20px] relative text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img className="w-9 h-9" src="../assets/img/Satellites.png" />
            </div>

            <div className="text-color">
              <h3 className="text-lg font-abhaya font-extrabold leading-5">
                Reach An Ireland-Wide Audience
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-abhaya text-[#4E5566] line-clamp-3">
                So you’re never limited by your geography, reach a global
                audience that needs your training on the platform
              </p>
            </div>
          </div>
          <div className="flex gap-[20px] relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img className="w-9 h-9" src="../assets/img/Class (1).png" />
            </div>
            <div className="text-color">
              <h3 className="text-lg font-abhaya font-extrabold leading-5">
                Deliver Your Courses With Ease
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-abhaya text-[#4E5566] line-clamp-3">
                Thanks to an advanced learning management system, you focus on
                your course content and we’ll facilitate delivery
              </p>
            </div>
          </div>
          <div className="flex gap-[20px] relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img
                className="w-9 h-9"
                src="../assets/img/People Working Together (1).png"
              />
            </div>
            <div className="text-color">
              <h3 className="text-lg font-abhaya font-extrabold leading-5">
                Engage & Collaborate With Trainers
              </h3>
            </div>
          </div>
          <div className="flex gap-[20px] relative  text-start w-[360px]">
            <div className="min-w-[56px] w-[56px] min-h-[56px] h-[56px] bg-[#00778B] rounded-full flex justify-center items-center">
              <img
                className="w-9 h-9"
                src="../assets/img/Website Analytics (1).png"
              />
            </div>
            <div className="text-color">
              <h3 className="text-lg font-abhaya font-extrabold leading-5">
                Gain Strategic Insights Via Analytics
              </h3>
              <p className="mt-[8px] leading-[18px] text-base font-bold traking-[-4%] font-abhaya text-[#4E5566] line-clamp-3">
                Hone your training based on easy-to-glimpse analytics on how
                your course takers are learning and where the market demand is
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[4px] flex justify-center items-center text-left gap-[10px] button-color text-lg font-extrabold font-abhaya m-auto w-[278px] h-[59px] secondary-text xl:mt-[113px] mt-[80px]">
          <div>Register As A Trainer Now</div>
          <div>
            <img className="" src="../assets/img/Move Right.png" />
          </div>
        </div>
      </div>
      <div className="border border-spacing-3 button-color w-full h-3 mt-[49px]"></div>
    </>
  );
};

export default TrainingProviders;
