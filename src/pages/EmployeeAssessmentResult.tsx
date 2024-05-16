

import { useState } from 'react';
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoChevronDownSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaStar } from 'react-icons/fa';

function EmployeeAssessmentResult() {


    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const [activeTab, setActiveTab] = useState('My Action Items');

    const handleTabChange = (tabName: any) => {
        setActiveTab(tabName);
    };


    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const [isChecked1, setIsChecked1] = useState(false);

    const toggleCheckbox1 = () => {
        setIsChecked1(!isChecked1);
    };

    const [isChecked2, setIsChecked2] = useState(false);

    const toggleCheckbox2 = () => {
        setIsChecked2(!isChecked2);
    };
    const [isChecked3, setIsChecked3] = useState(false);

    const toggleCheckbox3 = () => {
        setIsChecked3(!isChecked3);
    };
    const [isChecked4, setIsChecked4] = useState(false);

    const toggleCheckbox4 = () => {
        setIsChecked4(!isChecked4);
    };
    const [isChecked5, setIsChecked5] = useState(false);

    const toggleCheckbox5 = () => {
        setIsChecked5(!isChecked5);
    };

    return (

        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1510px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[1460px] mt-[20px] ml-[20px] rounded-[10px]  ">
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
                                            <div className="ml-[15px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[32px] w-[32px] flex items-center justify-center">1</div>
                                            <div className="w-[240px]">Set Target <span className="text-xs">(select the required pillars)</span></div>
                                        </div>

                                        <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[548px] mt-5 ml-[47px]">
                                        </div>
                                        <div className="flex flex-col ml-[355px] ">
                                            <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">2</div>
                                            <div className="w-[240px] ml-[-50px]">Define Action Item</div>
                                        </div>

                                        <div className="absolute top-3   border-1 border border-[#D9D9D9] w-[550px] mt-5 ml-[625px]">
                                        </div>
                                        <div className="flex flex-col ml-[390px] ">
                                            <div className=" text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#D9D9D9] h-[30px] w-[30px] flex items-center justify-center">3</div>
                                            <div className="w-[70px] ml-[-16px]">Assign</div>

                                        </div>

                                    </div>

                                    <div className="flex flex-col items-center h-full w-full ">
                                        <div className="pt-8 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">

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
                                                        <div className="bg-white rounded-full   flex w-6 h-6 " >

                                                            <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                                                            <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">

                                                                <li>
                                                                    Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                                                                </li>
                                                                <li>
                                                                    Lead in energy efficiency through continuous optimization and strategic energy management.
                                                                </li>

                                                                <a href="#" className="text-blue-500 text-[12px] hover:underline">View More</a>

                                                            </ul>
                                                        </div>


                                                    </div>

                                                    <div className="mt-8">

                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4 ">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="  pt-8  pb-0 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                                                <div className="flex h-8">
                                                    <div className="bg-[#EDF0F4] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                                                        <h2 className="text-lg font-inter">
                                                            <span className="text-[#414648]">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                                                        </h2>

                                                    </div>
                                                    <div
                                                        className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked1 ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                                                        onClick={toggleCheckbox1}
                                                    >
                                                        {isChecked1 && <span className="text-white text-sm">&#10003;</span>}
                                                    </div>
                                                </div>

                                                <div className="flex h-32">
                                                    <div>
                                                        <div className="bg-white rounded-full  drop-shadow-md w-16 h-16 p-4 mt-4 ml-11">
                                                            <img src="/public/assets/img/Weak Financial Growth.png"
                                                             alt="Leaf Icon" 
                                                            />
                                                        </div>
                                                        <div className="ml-8 mt-4 text-[#1D2026] font-Calibri">
                                                            Environmental
                                                        </div>
                                                    </div>
                                                    <div className="ml-20">
                                                        <div className="bg-white rounded-lg  p-4 flex flex-col ">

                                                            <div className="flex items-center ">
                                                                <FaStar className="text-yellow-500" />
                                                                <p className="text-gray-800 mb-1 ml-1 mr-2">
                                                                     RECOMMENDED
                                                                </p>

                                                            </div>
                                                            <div className=" text-black-500 py-2 px-4  flex items-center justify-between border border-[#E9EAF0] ">
                                                                <span >Advanced</span>
                                                                <div className="ml-12">
                                                                    <RiArrowDropDownLine className="text-3xl "/>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="w-[543px] h-[110px]">
                                                        <div className="bg-white rounded-full   flex  w-6 h-6 " >

                                                            <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                                                            <div className="text-[#8C94A3] ml-2 ">
                                                                MEASURES
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                                                <li>
                                                                    Systematically link sustainability
                                                                    efforts to economic outcomes, continuously
                                                                    tracking and optimising impact.
                                                                </li>
                                                                <li>
                                                                    Integrate risk management into business
                                                                    strategy, assessing and mitigating economic
                                                                    implications comprehensively.
                                                                </li>
                                                                <a href="#" className="text-blue-500 text-[12px] hover:underline">View More</a>
                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <div className="mt-8">

                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="  pt-8  pb-0 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                                                <div className="flex h-8">
                                                    <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                                                        <h2 className="text-lg font-inter">
                                                            <span className="text-[#414648]">Your level -</span><span className="text-[#F63636]">Introductory</span>
                                                        </h2>

                                                    </div>
                                                    <div
                                                        className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked2 ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                                                        onClick={toggleCheckbox2}
                                                    >
                                                        {isChecked2 && <span className="text-white text-sm">&#10003;</span>}
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
                                                        <div className="bg-white rounded-full   flex  w-6 h-6 " >

                                                            <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                                                            <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                                                <li>
                                                                    Expand R&D investments to include long-term projects aimed at sustainable technologies.
                                                                </li>
                                                                <li>
                                                                    Implement circular economy initiatives in specific areas, working towards full integration.
                                                                </li>
                                                                <a href="#" className="text-blue-500 text-[12px] hover:underline">View More</a>

                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <div className="mt-8">

                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8  pb-0 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B]">
                                                <div className="flex h-8">
                                                    <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                                                        <h2 className="text-lg font-inter">
                                                            <span className="text-[#414648]">Your level -</span><span className="text-[#F63636]">Introductory</span>
                                                        </h2>

                                                    </div>
                                                    <div
                                                        className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked3 ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                                                        onClick={toggleCheckbox3}
                                                    >
                                                        {isChecked3 && <span className="text-white text-sm">&#10003;</span>}
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
                                                        <div className="bg-white rounded-full   flex  w-6 h-6" >

                                                            <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                                                            <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                                                <li>
                                                                    Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                                                                </li>
                                                                <li>
                                                                    Lead in energy efficiency through continuous optimization and strategic energy management.
                                                                </li>
                                                                <a href="#" className="text-blue-500 text-[12px] hover:underline">View More</a>
                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <div className="mt-8">

                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="  pt-8  pb-0 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                                                <div className="flex h-8">
                                                    <div className="bg-[#414648] rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                                                        <h2 className="text-lg font-inter">
                                                            <span className="text-white">Your level -</span><span className="text-[#FFD56A]">Intermediate</span>
                                                        </h2>

                                                    </div>
                                                    <div
                                                        className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked4 ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                                                        onClick={toggleCheckbox4}
                                                    >
                                                        {isChecked4 && <span className="text-white text-sm">&#10003;</span>}
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
                                                        <div className="bg-white rounded-full flex w-6 h-6 " >

                                                            <img src="public/assets/img/manu.png"
                                                              alt="Leaf Icon"
                                                            />
                                                            <div className="text-[#8C94A3] ml-2 ">
                                                               MEASURES
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                                                <li>
                                                                    Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.
                                                                </li>
                                                                <li>
                                                                    Lead in energy efficiency through continuous optimization and strategic energy management.
                                                                </li>
                                                                <a href="#" className="text-blue-500 text-[12px] hover:underline">View More</a>
                                                            </ul>
                                                        </div>

                                                    </div>

                                                    <div className="mt-8">
                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-8 flex gap-5">
                                            <div className="border border-solid border-[#D9D9D9] w-[1150px] h-[164px] rounded-[10.06px] flex flex-col hover:border-[#64A70B] focus:border-[#64A70B] ">
                                                <div className="flex h-8">
                                                    <div className="bg-[#EDF0F4]  rounded-tl-lg rounded-br-lg pl-1 pt-0 h-[30px] w-[209px] items-start">
                                                        <h2 className="text-lg font-inter">
                                                            <span className="text-[#414648]">Your level -</span><span className="text-[#64A70B]">Advanced</span>
                                                        </h2>
                                                    </div>
                                                    <div
                                                        className={` ml-auto mr-3 w-5 h-5 mt-2 flex justify-center items-center cursor-pointer ${isChecked5 ? 'bg-[#64A70B]' : 'bg-white border border-[#B9B9B9]'}`}

                                                        onClick={toggleCheckbox5}
                                                    >
                                                        {isChecked5 && <span className="text-white text-sm">&#10003;</span>}
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
                                                        <div className="bg-white rounded-full flex w-6 h-6 " >

                                                            <img src="public/assets/img/manu.png" alt="Leaf Icon" />
                                                            <div className="text-[#8C94A3] ml-2 ">MEASURES</div>
                                                        </div>
                                                        <div>
                                                            <ul className="list-disc ml-6 text-[14px] text-[#8C94A3]">
                                                                <li>
                                                                    Drive and influence systemic changes by leading collaborative sustainability efforts.
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8">
                                                        <button className="bg-[#64A70B] text-white py-2 px-4 rounded-md flex  justify-between h-[40px] w-[150px] items-center ml-4">
                                                            <span className="font-Calibri text-xs">Define Action Items</span>

                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="  top-[1410px] absolute right-0  bottom-0 left-[1167px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                                        <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                                        <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                            <span className="text-gray-900 font-semibold">Messaging</span>
                                        </div>
                                        < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
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

export default EmployeeAssessmentResult