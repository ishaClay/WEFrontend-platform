import stepImage5 from "@/assets/images/LightOn.png";
import stepImage4 from "@/assets/images/Morales.png";
import stepImage2 from "@/assets/images/Neighbour.png";
import stepImage6 from "@/assets/images/PathSteps.png";
import stepImage1 from "@/assets/images/TreePlanting.png";
import stepImage3 from "@/assets/images/WeakFinancialGrowth.png";

const Steps = () => {
  const step = [
    {
      image: stepImage1,
      title: "Drive Down Costs",
      desc: "Benefit from sustainability’s hallmarks for improving efficiency and reducing consumed resources",
    },
    {
      image: stepImage2,
      title: "Keep Top Talent",
      desc: "Retain mindful top talent that are increasingly looking to advance their careers with companies that align with their values",
    },
    {
      image: stepImage3,
      title: "Win Loyal Customers",
      desc: "As more and more customers seek out responsible partners, be at the forefront of their minds with your sustainability initiatives",
    },
    {
      image: stepImage4,
      title: "Attract Investment",
      desc: "Because ESG has gone from a “nice-to-have” to a “must-have” for many investors and strategic partners",
    },
    {
      image: stepImage5,
      title: "Secure Government Bids",
      desc: "Gain standards of social and environmental responsibility that position you in favour of government contracts",
    },
    {
      image: stepImage6,
      title: "Distinguish Your Brand",
      desc: "Adding the dimension of sustainability firmly distinguishes your brand from competition and uplifts what you offer",
    },
  ];
  return (
    <div>
      <h3 className="text-4xl leading-tight font-abhaya text-center font-bold tracking-tighter xl:mb-[69px] mb-[50px]">
        Step by Step
        <br />
        <span className="font-medium">To better days ahead of you.</span>
      </h3>
      <div className="grid grid-cols-9">
        <div className="col-span-2 bg-[#64A70B] flex justify-center items-center h-[259px]">
          <p className="secondary-text xl:text-[28px] text-2xl font-abhaya text-center font-bold">
            Why Go Sustainable
          </p>
        </div>
        <div className="col-span-7">
          <div className="grid grid-cols-12">
            {step.map((steps, index: number) => {
              return (
                <div
                  key={index}
                  className="xl:col-span-2 col-span-4 px-[15px] h-[268px] py-5 bg-gradient-to-l from-[#ebeaea] from-44% via-transparent via-30% to-white"
                >
                  <div className="h-[135px]">
                    <div className="h-[76px] mb-2.5">
                      <img src={steps.image} alt="" />
                    </div>
                    <h6 className="primary-text text-lg font-abhaya font-extrabold leading-5">
                      {steps.title}
                    </h6>
                  </div>
                  <p className="text-[13px] font-abhaya line-clamp-5 leading-[18px]">
                    {steps.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="rounded-[4px] border border-solid border-black 1px flex justify-center items-center text-left gap-[10px] text-lg font-extrabold font-abhaya m-auto w-[249px] h-[59px] mt-3">
        <div>
          Take Your First
          <br /> Step Now
        </div>
        <div>
          <img className="" src="../assets/img/Move Right Dark.png" />
        </div>
      </div>
      <div className="border border-spacing-3 button-color w-full h-3 mt-[12px] mb-[36px]"></div>
    </div>
  );
};

export default Steps;
