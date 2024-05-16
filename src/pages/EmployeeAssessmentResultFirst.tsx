
import { useState } from 'react';
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { BiCheckCircle, BiShow } from "react-icons/bi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";


function EmployeeAssessmentResultFirst() {


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const [activeTab, setActiveTab] = useState('My Action Items');

    const handleTabChange = (tabName: any) => {
        setActiveTab(tabName);
    };


    return (

        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1450px]  overflow-hidden">

            <div className="relative">
                <EmployeeSidebar />
                <div className="absolute mt-[60px] -top-2 -right-[14px] flex items-center justify-center  ">
                    <button

                        className=" h-[30px] w-[30px] bg-[#FFFFFF] border border-[#E5E7EE] rounded-full  inline-flex items-center justify-center "
                    >
                        <MdOutlineKeyboardArrowLeft className="h-[20px] w-[20px] text-[#606060]" />
                    </button>
                </div>

            </div>

            <div className="bg-[#FFFFFF] w-[1230px] h-[1410px] mt-[20px] ml-[20px] rounded-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">

                        <span className="text-[18px] font-semibold">Maturity Assessment /  <span className="text-[18px] text-[#00778B]">Assessment Result</span></span>

                        <div className="flex items-center">
                            <div className="flex mt-[2px] mr-3 items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[250px] h-[50px] text-[#A3A3A3]">
                                <BsSearch className="text-[#D9D9D9] mr-2" />

                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-1 mr-2 focus:outline-none placeholder-[#A3A3A3] text-sm"
                                />
                            </div>
                            <div className="relative">
                                <div className="bg-[#F5F5F5] rounded-full h-[30px] w-[30px] p-1">
                                    <IoMdNotificationsOutline className="h-6 w-6 " />
                                </div>
                                <div className="absolute -top-2 -right-2 flex items-center justify-center h-[20px] w-[20px] bg-red-500 rounded-full text-white text-[10px]">
                                    5
                                </div>

                            </div>
                            <div className="flex items-center ml-4 ">
                                <img
                                    src="/public/assets/img/face1.jpg"
                                    alt="Emilia Anderson"
                                    className="h-8 w-8 rounded-full border-[#D9D9D9]  border-2"
                                />
                                <div className="ml-2">
                                    <div className="text-sm font-medium text-gray-700">Emilia Anderson</div>
                                    <div className="text-xs  text-[#000000]">Team Member</div>
                                </div>
                                < RiArrowDownSLine className="h-5 w-5 ml-1 mb-3 text-gray-700" />
                            </div>
                        </div>

                    </div>

                </div>

                <div className="ml-[20px]  flex  ">
                    <div className=''>
                        <h1 className="text-[16px] font-bold">Re Assessment 2</h1>
                        <p className="text-[12px] text-[#606060]">Completed Date: 12/03/2024</p>
                    </div>
                    <div className="flex ml-[835px]">

                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center justify-between w-full py-3 pl-4 pr-6 text-left gap-2"
                            >
                                <span className="text-[12px] font-semibold">Previous Assessment Details</span>
                                <IoChevronDownSharp className="w-5 h-5 text-[#000000]" />
                            </button>
                            {isOpen && (
                                <ul className="absolute w-[197px] h-[157px] bg-white shadow-lg rounded-lg">
                                    <li className="pl-6 pr-2 text-sm text-[#000000] pt-2">Baseline Self Assessment</li>
                                    <p className="ml-auto text-[#606060] text-[12px] pl-6">08/03/2024</p>
                                    <li className="pl-6 pr-6 text-sm text-[#000000] pt-2">Re-assessment 1</li>
                                    <p className="ml-auto text-[#606060] text-[12px] pl-6">08/03/2024</p>
                                    <li className="pl-6 pr-6 text-sm text-[#000000] pt-2">Re-assessment 2</li>
                                    <p className="ml-auto text-[#606060] text-[12px] pl-6">08/03/2024</p>
                                </ul>
                            )}

                        </div>

                    </div>
                </div>

                <div className="  m-[12px] rounded-[10px] ">

                    <div className=" h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px]">

                        <div className="pt-[10px]">
                            <button
                                className={`${activeTab === 'Assessment Result' ? '  text-[#00778B]  font-semibold border-b border-[#00778B]' : ' text-[#000000] '

                                    }  py-2 px-4  text-[16px] h-[49px]  `}
                                onClick={() => handleTabChange('Assessment Result')}
                            >
                                Assessment Result
                            </button>
                            <button
                                className={`${activeTab === 'Roadmap' ? 'text-[#00778B]  font-semibold  border-b border-[#00778B]' : ' text-[#000000]'
                                    }  py-2 px-4  text-[16px] h-[49px] `}
                                onClick={() => handleTabChange('Roadmap')}
                            >
                                Roadmap
                            </button>

                            <button
                                className={`${activeTab === 'My Action Items' ? 'text-[#00778B]  font-semibold  border-b border-[#00778B]' : ' text-[#000000]'
                                    }  py-2 px-4  text-[16px] h-[49px] `}
                                onClick={() => handleTabChange('My Action Items')}
                            >
                                My Action Items
                            </button>

                            <button className="bg-[#00778B] text-white font-semibold w-[78px]  h-[37px] rounded ml-[710px] ">Export</button>
                        </div>
                        <div className="  ">

                            {activeTab === 'Assessment Result' &&
                                <div> A </div>

                            }

                            {activeTab === 'Roadmap' &&


                                <div className="flex flex-col">
                                    <div className="flex relative ">
                                        <div className="flex flex-col  ">
                                            <div className="ml-[10px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[32px] w-[32px] flex items-center justify-center">1</div>
                                            <div className="w-[240px]">Set Target <span className="text-xs">(select the required pillars)</span></div>
                                        </div>

                                        <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[548px] mt-5 ml-[42px]">
                                        </div>
                                        <div className="flex flex-col ml-[350px] ">
                                            <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">2</div>
                                            <div className="w-[240px] ml-[-50px]">Define Action Item</div>
                                        </div>

                                        <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[550px] mt-5 ml-[620px]">
                                        </div>
                                        <div className="flex flex-col ml-[390px] ">
                                            <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">3</div>
                                            <div className="w-[70px] ml-[-10px]">Assign</div>

                                        </div>
                                    </div>

                                    <div className="ml-[5px] h-[390px] w-[1200px] mt-8">
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

                                    <div className="ml-[5px] h-[390px] w-[1200px] mt-[130px]">
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


                                                        <div className="ml-[80px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#FFD56A] h-[30px] w-[107px] flex items-center justify-center ">Intermediate</div>
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

                                        <div className="ml-[550px] mt-4">

                                            <button className="bg-[#E5F1F3] text-[#00778B] text-[16px] py-2 rounded h-[48px] w-[223px]">
                                                Retake Assessment
                                            </button>
                                        </div>

                                        <div className="  top-[1358px] absolute right-0  bottom-0 left-[1166px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                                            <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                                            <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                                <span className="text-gray-900 font-semibold">Messaging</span>
                                            </div>
                                            < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                                        </div>

                                    </div>


                                </div>

                            }


                            {activeTab === 'My Action Items' && <div>Golu</div>}


                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EmployeeAssessmentResultFirst