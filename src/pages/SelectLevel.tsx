import Footer from "@/components/Footer";
import TeaserScoreHeader from "@/components/TeaserScoreHeader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { QUERY_KEYS } from "@/lib/constants";
import { fetchAssessment } from "@/services/apiServices/assessment";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react';
import { BsFillPlusSquareFill, BsPencil } from "react-icons/bs";
import { FaStar } from 'react-icons/fa';
import { RiArrowDropDownLine, RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Learn from "/assets/img/Learn.png";


function SelectLevel() {

  const navigate = useNavigate();

  const { data: assessmant } = useQuery({
    queryKey: [QUERY_KEYS.assessment],
    queryFn: () => fetchAssessment("6"),
  });
  console.log("assessmant", assessmant?.data?.data);

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

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };



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

        {
          assessmant?.data?.data.map((item: any) => {
            console.log("item", item);

            return (
              <div className="ml-[180px] pt-8 pl-[10px] pb-0 flex gap-5">
                <div className="border border-solid border-[#D9D9D9] w-[1124px] h-[164px] rounded-[10.06px] flex flex-col ">
                  <div className="flex h-8">
                    <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                      <h2 className="text-lg font-inter ">
                        <span className="text-white">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                      </h2>

                    </div>

                    <div
                      className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                      onClick={toggleCheckbox}
                    >
                      {isChecked && <span className="text-white text-sm">&#10003;</span>}
                    </div>

                  </div>

                  <div className="flex h-32">
                    <div>
                      <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                        <img src="public/assets/img/Tree Planting.png" alt="Leaf Icon" />
                      </div>


                      <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">{item.pillarname}</div>
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

                    <div className="w-[162px] mt-8">

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex justify-center h-[40px] w-[150px] items-center mr-3 ">Define Action Items</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[50rem] z-[999]">
                          <DialogHeader>
                            <DialogTitle>Have you identified actionable items on provided measures?</DialogTitle>

                          </DialogHeader>

                          <div className="sm:max-w-[45rem]">
                            <div className="flex  mb-4">
                              <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-17 h-17 p-2 mb-2">
                                <img src="/public/assets/img/Tree Planting.png" alt="Leaf Icon" />
                              </div>
                              <div className="ml-6 mt-6 h-[22px] w-[800px]">
                                <h2 className=" text-xm font-semibold text-[#1D2026]">Have you identified actionable items on provided measures?</h2>
                              </div>


                            </div>
                            <div className="flex flex-col space-y-4 ">
                              <div className="text-[#1D2026] font-Calibri font-bold ml-4">Environmental</div>
                              <div className="flex h-full w-full mt-2">
                                <div className="ml-4 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                                  <div className="w-full h-74 border-b border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                    <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                      <div className="ml-6  text-[#1D2026] font-calibri font-bold">Measures</div>
                                      <div className="p-4 ">
                                        <ul className="list-disc list-inside text-[12px]  font-calibri">
                                          <li>Enhance and execute your Net Zero strategy with clear goals  </li>
                                          <p className="ml-[17px]"> and comprehensive actions.</p>
                                          <li>Lead in energy efficiency through continuous optimization </li>
                                          <p className="ml-[17px]">and strategic energy management.</p>
                                          <li>Achieve sustainability leadership by fully embracing and</li>
                                          <p className="ml-[17px]"> expanding renewable energy use.</p>
                                          <li>Optimize transportation and logistics for minimal</li>
                                          <p className="ml-[17px]">environmental impact through advanced strategies and technologies.</p>
                                        </ul>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                                <div className="ml-6 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                                  <div className="w-full h-74 border-b border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                    <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                      <div className="ml-6  text-[#1D2026] font-calibri font-bold">Enter initiatives or action items</div>

                                      <div className="p-4">
                                        <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                                          <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
                                            <input
                                              type="text"
                                              placeholder="Action item 1"
                                              className="flex-1 border-none outline-none pl-2 pt-2"
                                            />
                                          </div>
                                          <button className="border-none bg-transparent text-lg cursor-pointer  ml-2 mt-2"><BsPencil className="text-[#B9B9B9]" /></button>
                                          <button className="border-none bg-transparent text-lg cursor-pointer gap-4 mt-2"><RiDeleteBin6Line className="text-[#B9B9B9]" /></button>

                                        </div>
                                      </div>


                                      <div className="pl-4 ">
                                        <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                                          <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">

                                            <input
                                              type="text"
                                              placeholder=""
                                              className="flex-1 border-none outline-none pl-2 pt-2"
                                            />
                                          </div>
                                          <button className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2"><BsPencil className="text-[#B9B9B9]" /></button>
                                          <button className="border-none bg-transparent text-lg cursor-pointer  mt-2"><RiDeleteBin6Line className="text-[#B9B9B9] " /></button>

                                        </div>
                                      </div>


                                      <div className="flex items-center justify-center w-4 h-4  ml-[315px] mt-8">

                                        <BsFillPlusSquareFill />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-end">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }


        <button onClick={() => navigate('/maturitylevelactionitem')} className="bg-[#64A70B] text-[white] w-[160px] h-[30px] rounded mt-7 text-center text-Abhaya Libre ExtraBold ">
          BUILD
        </button>

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





