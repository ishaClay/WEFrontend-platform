import TeaserScoreHeader from "@/components/TeaserScoreHeader"
import Correct from "/assets/img/Correct.png";
import Assess from "/assets/img/Assess.png";
import Learn from "/assets/img/Learn.png";
import Apply from "/assets/img/Apply.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from 'react-icons/fa';
import Footer from "@/components/Footer";
function SelectLevel() {
  const paths = [
    {
      name: "Engage",
      img: Correct,
      status: "checked",
    },
    {
      name: "Assess",
      img: Correct,
      status: "checked",
    },
    {
      name: "Set Targets",
      img: Correct,
      status: "indeterminate",
    },
    {
      name: "Learn",
      img: Learn,
      status: "pending",
    },
    {
      name: "Apply",
      img: Apply,
      status: "pending",
    },
    {
      name: "Attain proficiency",
      img: Attainproficiency,
      status: "pending",
    },
  ];

  return (
    <div>
      <TeaserScoreHeader />
      <div className="border-t border-b border-#DED7D7">
        <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
          <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
            {paths.map((path) => (
              <div
                key={path.name}
                className={`flex flex-col self-end items-center ${path.name === "Engage" || path.name === "Assess"
                  ? " "
                  : " "
                  }`}
              >
                {path.status === "checked" ? (
                  <img
                    src={Correct}
                    alt="img"
                    width={59.6}
                    height={59.6}
                    className="mt-[13.4]"
                  />
                ) : path.status === "indeterminate" ? (
                  <img
                    src={Assess}
                    alt="img"
                    width={70}
                    height={70}
                    className="mt-[7px]"
                  />
                ) : (
                  <img
                    src={path.img}
                    alt="img"
                    width={59.6}
                    height={59.6}
                    className="mt-[15.4px]"
                  />
                )}
                <p className={`${path.name === "Engage" || path.name === "Assess" ? "bg-[#64A70B] text-white" : ""}`}>
                  {path.name}
                </p>
              </div>
            ))}
            <div className="absolute top-[47.5px] left-3 right-10 border-2 border-dashed border-[#585858] -z-10"></div>
          </div>
        </div>
      </div>
      <div className="ml-[290px] mt-8 text-[#3A3A3A] font-[Bold] text-2xl ">

        <h1> Select target pillars and maturity levels</h1>
      </div>


      <div className="flex flex-col items-center h-full w-full ">
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter ">
                  <span className="text-white">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>


            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="public/assets/img/Tree Planting.png" alt="Leaf Icon" />
                </div>


                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>

              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                    </li>
                    <li>
                      Lead in energy efficiency through continuous optimization and strategic energy management.
                    </li>
                    <li>
                      Achieve sustainability leadership by fully embracing and expanding renewable energy use.
                    </li>
                    <li>
                      Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.
                    </li>
                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1127px] h-[212px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter">
                  <span className="text-[#414648]">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>


            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="/public/assets/img/Weak Financial Growth.png" alt="Leaf Icon" />
                </div>


                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>
              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Systematically link sustainability efforts to economic outcomes, continuously tracking and optimising impact.
                    </li>
                    <li>
                      Integrate risk management into business strategy, assessing and mitigating economic implications comprehensively.
                    </li>
                    <li>
                      Incorporate sustainable finance deeply into strategic and operational decisions for long-term benefits.
                    </li>
                    <li>
                      Excel in agility, proactively adapting to evolving market conditions and emerging opportunities.
                    </li>
                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter">
                  <span className="text-[#414648]">Your level -</span><span className="text-[#F63636]">Introductory</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>


            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="/public/assets/img/Light On.png" alt="Leaf Icon" />
                </div>


                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>
              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Expand R&D investments to include long-term projects aimed at sustainable technologies.
                    </li>
                    <li>
                      Implement circular economy initiatives in specific areas, working towards full integration.
                    </li>
                    <li>
                      Implement technological solutions for sustainability, with room for further utilisation and impact.
                    </li>

                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter">
                  <span className="text-[#414648]">Your level -</span><span className="text-[#F63636]">Introductory</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>
            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="/public/assets/img/Neighbour.png" alt="Leaf Icon" />
                </div>
                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>
              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                    </li>
                    <li>
                      Lead in energy efficiency through continuous optimization and strategic energy management.
                    </li>
                    <li>
                      Achieve sustainability leadership by fully embracing and expanding renewable energy use.
                    </li>
                    <li>
                      Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.
                    </li>
                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter">
                  <span className="text-white">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>


            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="/public/assets/img/Morale.png" alt="Leaf Icon" />
                </div>


                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>
              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                    </li>
                    <li>
                      Lead in energy efficiency through continuous optimization and strategic energy management.
                    </li>
                    <li>
                      Achieve sustainability leadership by fully embracing and expanding renewable energy use.
                    </li>
                    <li>
                      Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.
                    </li>
                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
          <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
            <div className="flex h-8">
              <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                <h2 className="text-lg font-inter">
                  <span className="text-[#414648]">Your level -</span><span className="text-[#64A70B]">Advanced</span>
                </h2>

              </div>
              <div className="ml-auto  h-8 w-8 mr-3">
                <img src="/public/assets/img/checkbox.png" alt="Leaf Icon" />

              </div>

            </div>


            <div className="flex h-32">
              <div>
                <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                  <img src="/public/assets/img/Path Steps.png" alt="Leaf Icon" />
                </div>


                <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">Environmental</div>
              </div>
              <div className="ml-20">
                <div className="bg-white rounded-lg  p-4 flex flex-col ">

                  <div className="flex items-center ">
                    <FaStar className="text-yellow-500" />
                    <p className="text-gray-800 mb-1 ml-1 mr-2"> RECOMMENDED</p>

                  </div>
                  <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                    <span >Advanced</span>
                    <div className="ml-12">
                      <RiArrowDropDownLine className="text-3xl " />
                    </div>

                  </div>
                </div>

              </div>
              <div className="w-[543px] h-[110px]">
                <div className="bg-white rounded-full   flex drop-shadow-md w-6 h-6 mb-2" >

                  <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                  <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                </div>
                <div>
                  <ul className="list-disc ml-6 text-xs text-[#000000]">
                    <li>
                      Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                    </li>
                    <li>
                      Lead in energy efficiency through continuous optimization and strategic energy management.
                    </li>
                    <li>
                      Achieve sustainability leadership by fully embracing and expanding renewable energy use.
                    </li>
                    <li>
                      Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.
                    </li>
                  </ul>
                </div>


              </div>

              <div className="mt-8">

                <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center mr-3">
                  <span className="font-Calibri text-xs">Define Action Items</span>

                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#64A70B] text-[white] w-[160px] h-[30px] rounded mt-7 text-center text-Abhaya Libre ExtraBold ">
          BUILD

        </div>
        <div className="border-b  pb-4 w-[940px] border-[#DED7D7] "></div>

        <div className="font-Abhaya Libre ExtraBold text-red-500 pb-2 pt-3">

          <p> Congratulations! 🌿 Your chosen maturity levels have been noted. You're now on a unique </p>
          <p>sustainability journey tailored just for you. Keep moving forward, and watch your impact grow! 🌍✨</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectLevel;





