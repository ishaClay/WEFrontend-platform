import image from "@/assets/images/GuidingImage.svg";
import image1 from "@/assets/images/GuidingImage1.png";

const GuidingPlatform = () => {
  return (
    <div className="bg-[#F7F8FC] xl:pt-8 sm:pt-4 pt-7 xl:pb-[32px] sm:pb-[16px] pb-7 xl:mt-20 sm:mt-16 mt-10 sm:mb-[54px] mb-10">
      <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-6">
        <div>
          <h3 className="md:text-4xl sm:text-3xl text-2xl leading-tight font-abhaya traking-[4px] text-center sm:pb-6 pb-[60px] tracking-tighter">
            One guiding platform,
            <br />
            <span className="font-extrabold">that grows your green feet</span>
          </h3>
        </div>

        <div className="lg:flex block justify-between items-center">
          <div className="lg:hidden block p-2 m-auto pb-[60px] md:min-w-[350px] md:w-[350px] w-[292px]">
            <img src={image1} alt="" className="w-full" />
          </div>
          <div className="flex flex-col xl:gap-8 sm:gap-6 gap-3">
            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color  rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                Find Out Where You Stand
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                Take a self-assessment across the 6 pillars of sustainability to
                see where your company stands now, all in a detailed report
              </p>
            </div>

            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color rounded-[6px] secondary-text py-6 lg:px-4 px-6 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                {" "}
                Get a Personalised Roadmap
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                With comprehensive measures presented to you based on your
                Sustainability Score, you’ll never have to guess your journey
              </p>
            </div>

            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color rounded-[6px] secondary-text  py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                See Training Recommendations
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                Connect with pre-vetted training providers to upskill and
                develop your team the way you need to—right from your dashboard
              </p>
            </div>
          </div>

          <div className="lg:block hidden p-2">
            <img src={image} />
          </div>

          <div className="flex flex-col xl:gap-8 sm:gap-6 gap-3 lg:mt-0 sm:mt-6 mt-3">
            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-semibold text-base font-abhaya leading-[18px]">
                Invite & Assign Your Staff
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                Because it always takes teamwork, invite your employees to the
                platform and assign them action items or training
              </p>
            </div>

            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                {" "}
                Measure Your Progress
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                Once you’ve been walking the sustainability journey, re-take the
                self-assessment to see how your measurably company’s developed
              </p>
            </div>

            <div className="xl:w-[322px] lg:w-[300px] w-auto xl:h-[150px] lg:h-[140px] h-[102px] button-color  rounded-[6px] secondary-text py-6 px-4 traking-[-4%]">
              <h3 className="font-bold text-base font-abhaya leading-[18px]">
                Share Reports With Stakeholders
              </h3>
              <p className="sm:text-sm text-xs sm:leading-[18px] leading-3 md:pt-4 pt-2 font-abhaya lg:line-clamp-3 line-clamp-2">
                Easily export your Sustainability Score report to show the
                detailed measures of your progress—to your stakeholders,
                investors, and customers.
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[4px] border border-solid border-black 1px flex justify-center items-center text-left gap-[10px]  text-lg font-extrabold font-abhaya m-auto w-[249px] h-[59px] lg:mt-0 mt-6">
          <p className="leading-[normal]">
            Find Out Your
            <br /> Sustainability Score
          </p>
          <div>
            <img className="" src="../assets/img/Move Right Dark.png" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidingPlatform;
