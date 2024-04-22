import HeaderCourse from "@/components/HeaderCourse"
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
import { useState } from 'react';
import { BsPencilFill } from "react-icons/bs"
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BiCheckCircle, BiShow } from 'react-icons/bi';
import Footer from "@/components/Footer";

function MaturityAssessmentRoadmapAfterbuild() {

  const [activeTab, setActiveTab] = useState('Assessment Result');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // const handleExport = () => {
  //   // Handle export functionality here
  // };

  return (
    <div className="flex bg-[#EDEFF9] w-[1510px] h-[1890px] gap-1 overflow-hidden">
      <div className=" w-[235px] h-[1608px]">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>
        <div className="ml-[20px] mt-[15px]">
          <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
          <p className="text-[12px] text-[#606060]">Completed Date: 12/03/2024</p>
        </div>
        <div className="bg-[#FFFFFF] w-[1250px] h-[1890px] m-[12px] rounded-t-[10px] ">


          <div className=" w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px]">

            <div className="pt-[10px]">
              <button
                className={`${activeTab === 'Assessment Result' ? '  text-[#00778B]  font-bold border-b border-[#00778B]' : ' text-[#000000] '

                  }  py-2 px-4  text-[16px] h-[49px]  `}
                onClick={() => handleTabChange('Assessment Result')}
              >
                Assessment Result
              </button>
              <button
                className={`${activeTab === 'Roadmap' ? 'text-[#00778B]  font-bold  border-b border-[#00778B]' : ' text-[#000000]'
                  }  py-2 px-4  text-[16px] h-[49px] `}
                onClick={() => handleTabChange('Roadmap')}
              >
                Roadmap
              </button>
              <button className="bg-[#00778B] text-white font-semibold w-[78px]  h-[37px] rounded ml-[880px] ">Export</button>
            </div>
            <div className="mt-4 p-4 ">
              {activeTab === 'Assessment Result' && <div>Anurag</div>}
              {activeTab === 'Roadmap' &&
                <div className="flex flex-col">
                  <div className="flex relative ">
                    <div className="flex flex-col  ">
                      <div className="ml-[20px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[32px] w-[32px] flex items-center justify-center">1</div>
                      <div className="w-[240px]">Set Target <span className="text-xs">(select the required pillars)</span></div>
                    </div>

                    <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[548px] mt-5 ml-[52px]">
                    </div>
                    <div className="flex flex-col ml-[360px] ">
                      <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">2</div>
                      <div className="w-[240px] ml-[-50px]">Define Action Item</div>
                    </div>

                    <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[550px] mt-5 ml-[630px]">
                    </div>
                    <div className="flex flex-col ml-[390px] ">
                      <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">3</div>
                      <div className="w-[70px] ml-[-8px]">Assign</div>

                    </div>
                  </div>

                  <div className="ml-[10px]   h-[390px] w-[1200px] mt-8">
                    <div className="w-full h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg ">
                      <div className=" pb-2 pt-2 flex  gap-5  h-[70px] w-[1200px] ">

                        <div className="flex w-full ">
                          <div className=" ml-4 bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2 ">
                            <img src="/public/assets/img/Tree Planting.png" alt="Leaf Icon" />
                          </div>

                          <div className="ml-6 mt-4 text-[#1D2026] font-Calibri font-bold ">Environmental</div>

                          <div className="bg-[#E3E5F5] h-[20px] w-[511px] rounded-full ml-6 mt-5">
                            <div className="h-[20px] bg-[#FFD56A] text-white rounded-full text-[14px] text-center" style={{ width: `${25}%` }}>
                              25%
                            </div>
                          </div>

                          <div className="flex relative ml-[20px]">

                            <div className="ml-[60px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#FFD56A] h-[30px] w-[107px] flex items-center justify-center ">Intermediate</div>
                            <div className="absolute top-3 ml-[167px]  border-2 border-dashed border-[#A6A6A6] w-40 mt-5 ">

                              <svg className="absolute top-1/2 transform -translate-y-1/2 right-0  text-gray-700 mt-7 " xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 256 256" fill="#85B6FF">
                                <path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
                              </svg>
                            </div>
                            <div className=" text-white mt-4 text-center font-sans rounded-full bg-[#2C9367] bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">Advanced</div>

                          </div>

                        </div>
                      </div>
                    </div>

                    <div className=" flex w-full h-[90px] border-b border-l border-r border-solid border-[#D9D9D9]  ">

                      <div className="flex h-[90px] w-[900px]  pt-8 pl-4">
                        <p className=" pl-3 font-Calibri text-[#000000]">Lead in energy efficiency through continuous optimization and strategic energy management.</p>
                      </div>

                      <div className="ml-[130px] mt-6">
                        <a href="#" className=" text-[#4285F4] px-4 py-1 text-sm h-[35px] underline underline-[#4285F4]  ">History</a>
                        <button className="bg-[#00778B] text-white rounded-[5px]   px-4 py-1 text-sm h-[35px] ">Assign</button>
                      </div>

                    </div>
                    <div className=" flex w-full h-[112px] border-b border-l border-r border-solid border-[#D9D9D9] ">
                      <div className=" h-[112px] w-[900px] pl-4  flex ">

                        <div className="flex flex-col bg-">

                          <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                          <div className="flex gap-2 pl-3">
                            <div>
                              <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                            </div>
                            <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                          </div>

                          <div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                              </div>
                              <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="flex flex-col  ml-[200px] gap-2 mt-6">
                        <button className="bg-[#FFD56A] w-[75px] h-[28px] text-black rounded-full px-4 py-1 text-xs">On time</button>
                        <button className=" bg-[#00778B] text-white rounded  text-sm h-[32px] w-[75px] flex   ">
                          < BsPencilFill className="mr-2 mt-2 ml-4" />
                          <div className="mt-1">
                            Edit
                          </div>
                        </button>
                      </div>

                    </div>


                    <div className=" flex w-full h-[112px] border-b border-l border-r border-solid border-[#D9D9D9] ">
                      <div className=" h-[112px] w-[900px] pl-4   ">

                        <div className="flex flex-col">

                          <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                          <div className="flex gap-2 pl-3">
                            <div>
                              <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                            </div>
                            <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                          </div>

                          <div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                              </div>
                              <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                            </div>

                          </div>

                        </div>
                      </div>

                      <div className=" ml-[200px] flex flex-col gap-2 mt-6">
                        <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs">Dealy</button>
                        <button className=" bg-[#00778B] text-white rounded  text-sm h-[32px] w-[75px] flex   ">
                          < BsPencilFill className="mr-2 mt-2 ml-4" />
                          <div className="mt-1">
                            Edit
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-[112px] border-b border-l border-r  border-[#D9D9D9] rounded-bl-lg rounded-br-lg  flex">

                      <div className="w-[900px] h-[112px] border-b border-l  border-solid border-[#D9D9D9]  ">
                        <div className=" h-[112px] w-full pl-4  flex ">

                          <div className="flex flex-col">

                            <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                            <div className="flex gap-2 pl-3">
                              <div>
                                <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                              </div>
                              <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                            </div>

                            <div>
                              <div className="flex gap-2 pl-3 pt-2">
                                <div>
                                  <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                                </div>
                                <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>

                      <div className="flex   ml-[40px] gap-16 mt-6">
                        <button className=" bg-[#00778B] text-white rounded gap-2 text-sm h-[32px] w-[75px] flex  mt-9 ml-6 ">
                          < BiShow className="mt-2 ml-3 " />
                          <div className="mt-1">Edit</div>
                        </button>
                        <div className="flex flex-col" >
                          <div >
                            <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs">Dealy</button>

                          </div>

                          <div >
                            <div className="flex text-green-500 ml-[-20px] mt-3">
                              <BiCheckCircle className="mr-2 mt-1" /> completed
                            </div>
                            {/* <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs">Dealy</button> */}

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="ml-[10px]   h-[390px] w-[1200px] mt-[130px]">
                    <div className="w-full h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg ">
                      <div className=" pb-2 pt-2 flex  gap-5  h-[70px] w-[1200px] ">

                        <div className="flex w-full ">
                          <div className=" ml-4 bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2 ">
                            <img src="/public/assets/img/Morale.png" alt="Leaf Icon" />
                          </div>

                          <div className="ml-6 mt-4 text-[#1D2026] font-Calibri font-bold ">Governance</div>

                          <div className="bg-[#E3E5F5] h-[20px] w-[511px] rounded-full ml-6 mt-5">
                            <div className="h-[20px] bg-[#FFD56A] text-white rounded-full text-[14px] text-center" style={{ width: `${25}%` }}>
                              25%
                            </div>
                          </div>

                          <div className="flex relative ml-[20px]">


                            <div className="ml-[60px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#FFD56A] h-[30px] w-[107px] flex items-center justify-center ">Intermediate</div>
                            <div className="absolute top-3 ml-[167px]  border-2 border-dashed border-[#A6A6A6] w-40 mt-5 ">

                              <svg className="absolute top-1/2 transform -translate-y-1/2 right-0  text-gray-700 mt-7 " xmlns="http://www.w3.org/2000/svg" width="85" height="85" viewBox="0 0 256 256" fill="#85B6FF">
                                <path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
                              </svg>
                            </div>
                            <div className=" text-white mt-4 text-center font-sans rounded-full bg-[#2C9367] bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">Advanced</div>

                          </div>

                        </div>
                      </div>
                    </div>

                    <div className=" flex w-full h-[90px] border-b border-l border-r border-solid border-[#D9D9D9]  ">


                      <div className="flex h-[90px] w-[900px]  pt-8 pl-4">
                        <p className=" pl-3 font-Calibri text-[#000000]">Lead in energy efficiency through continuous optimization and strategic energy management.</p>
                      </div>

                      <div className="ml-[130px] mt-6">
                        <a href="#" className=" text-[#4285F4] px-4 py-1 text-sm h-[35px] underline underline-[#4285F4]  ">History</a>
                        <button className="bg-[#00778B] text-white rounded-[5px]   px-4 py-1 text-sm h-[35px] ">Assign</button>
                      </div>

                    </div>
                    <div className=" flex w-full h-[112px] border-b border-l border-r border-solid border-[#D9D9D9] ">
                      <div className=" h-[112px] w-[900px] pl-4  flex ">

                        <div className="flex flex-col bg-">

                          <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                          <div className="flex gap-2 pl-3">
                            <div>
                              <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                            </div>
                            <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                          </div>

                          <div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                              </div>
                              <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="flex flex-col  ml-[200px] gap-2 mt-6">
                        <button className="bg-[#FFD56A] w-[75px] h-[28px] text-black rounded-full px-4 py-1 text-xs">On time</button>
                        <button className=" bg-[#00778B] text-white rounded  text-sm h-[32px] w-[75px] flex   ">
                          < BsPencilFill className="mr-2 mt-2 ml-4" />
                          <div className="mt-1">
                            Edit
                          </div>
                        </button>
                      </div>

                    </div>


                    <div className=" flex w-full h-[112px] border-b border-l border-r border-solid border-[#D9D9D9] ">
                      <div className=" h-[112px] w-[900px] pl-4   ">

                        <div className="flex flex-col">

                          <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                          <div className="flex gap-2 pl-3">
                            <div>
                              <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                            </div>
                            <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                          </div>

                          <div>
                            <div className="flex gap-2 pl-3 pt-2">
                              <div>
                                <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                              </div>
                              <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                            </div>

                          </div>

                        </div>
                      </div>

                      <div className=" ml-[200px] flex flex-col gap-2 mt-6">
                        <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs">Dealy</button>
                        <button className=" bg-[#00778B] text-white rounded  text-sm h-[32px] w-[75px] flex   ">
                          < BsPencilFill className="mr-2 mt-2 ml-4" />
                          <div className="mt-1">
                            Edit
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="w-full h-[112px] border-b border-l border-r  border-[#D9D9D9] rounded-bl-lg rounded-br-lg  flex">

                      <div className="w-[900px] h-[112px] border-b border-l  border-solid border-[#D9D9D9]  ">
                        <div className=" h-[112px] w-full pl-4  flex ">

                          <div className="flex flex-col">

                            <div><p className="pt-2 text-[#000000] pl-3 ">Lead in energy efficiency through continuous optimization and strategic energy management.</p></div>
                            <div className="flex gap-2 pl-3">
                              <div>
                                <img src="/public/assets/img/face1.jpg" className="w-[24px] h-[24px] rounded-full mr-2 mt-[10px] " />
                              </div>
                              <div><p className="text-gray-800 font-semibold pt-2">Employee Name</p></div>
                            </div>

                            <div>
                              <div className="flex gap-2 pl-3 pt-2">
                                <div>
                                  <MdOutlineCalendarMonth className="h-[24px] w-[24px] text-[#666666]" />

                                </div>
                                <div><p className=" text-sm text-[#666666]">Date:<span className="text-black">2nd March, 2024 - 2nd March, 2024</span> </p></div>
                              </div>

                            </div>

                          </div>

                        </div>
                      </div>

                      <div className="flex   ml-[40px] gap-16 mt-6">
                        <button className=" bg-[#00778B] text-white rounded gap-2 text-sm h-[32px] w-[75px] flex  mt-9 ml-6 ">
                          < BiShow className="mt-2 ml-3 " />
                          <div className="mt-1">Edit</div>
                        </button>
                        <div className="flex flex-col" >
                          <div >
                            <button className="bg-[#F63636] w-[75px] h-[28px] text-white rounded-full px-4 py-1 text-xs">Dealy</button>

                          </div>

                          <div >
                            <div className="flex text-green-500 ml-[-20px] mt-3">
                              <BiCheckCircle className="mr-2 mt-1" /> completed
                            </div>

                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="mt-[150px] ml-[240px]">

                    <div className="flex gap-6">
                      <button className="bg-[#64A70B]  text-white font-semibold py-2 px-4 rounded h-[48px] w-[223px]">
                      Edit Roadmap
                      </button>
                      <button className="bg-[#002A3A]  text-white text-[16px]  py-2  rounded h-[48px] w-[223px]">
                      View Recommended Course
                      </button>
                      <button className="bg-[#00778B]  text-white font-semibold py-2 px-4 rounded h-[48px] w-[223px]">
                      Retake Assessment
                      </button>
                    </div>
                  </div>
                  <div className="ml-[200px] mt-[10px]">
                    <p className="text-[#64A70B] font-semibold">Keep up the fantastic work, and remember, every small step counts towards a brighter and more sustainable world! </p>
                  </div>
                  <div className="">
                    <Footer/>
                  </div>
                </div>


              }



            </div>


          </div>


          <div>




          </div>


        </div>

      </div>



    </div >



  )
}

export default MaturityAssessmentRoadmapAfterbuild