import image from "@/assets/images/GuidingImage.svg";

const GuidingPlatform = () => {
  return (
    <div>
      <div className="xl:mt-28 mt-20 xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5">
        <div>
          <h3 className="text-4xl leading-tight font-abhaya traking-[4px] text-center pb-6 tracking-tighter">
            One guiding platform,
            <br />
            <span className="font-extrabold">that grows your green feet</span>
          </h3>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col xl:gap-8 gap-6">
            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color  rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                Find Out Where You Stand
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                Take a self-assessment across the 6 pillars of sustainability to
                see where your company stands now, all in a detailed report
              </p>
            </div>

            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                {" "}
                Get a Personalised Roadmap
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                With comprehensive measures presented to you based on your
                Sustainability Score, you’ll never have to guess your journey
              </p>
            </div>

            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color rounded-[6px] secondary-text  py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                See Training Recommendations
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                Connect with pre-vetted training providers to upskill and
                develop your team the way you need to—right from your dashboard
              </p>
            </div>
          </div>

          <div className="lg:block hidden p-2">
            <img src={image} />
          </div>

          <div className="flex flex-col xl:gap-8 gap-6">
            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-semibold text-base font-abhaya leading-[18px]">
                Invite & Assign Your Staff
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                Because it always takes teamwork, invite your employees to the
                platform and assign them action items or training
              </p>
            </div>

            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                {" "}
                Measure Your Progress
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                Once you’ve been walking the sustainability journey, re-take the
                self-assessment to see how your measurably company’s developed
              </p>
            </div>

            <div className="xl:w-[322px] w-[300px] xl:h-[150px] h-[140px] button-color  rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                Share Reports With Stakeholders
              </h3>
              <p className="text-sm leading-[18px] pt-4 font-abhaya">
                Easily export your Sustainability Score report to show the
                detailed measures of your progress—to your stakeholders,
                investors, and customers.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[4px] border border-solid border-black 1px flex justify-center items-center text-left gap-[10px]  text-lg font-extrabold font-abhaya m-auto w-[249px] h-[59px]">
          <div>
            Find Out Your
            <br /> Sustainability Score
          </div>
          <div>
            <img className="" src="../assets/img/Move Right Dark.png" />
          </div>
        </div>
      </div>
      <div className="border border-spacing-3 button-color w-full h-3 mt-[33px] mb-[41px]"></div>
    </div>
  );
};

export default GuidingPlatform;
