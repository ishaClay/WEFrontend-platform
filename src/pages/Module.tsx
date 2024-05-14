import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { VscFilePdf } from "react-icons/vsc";
import { MdPlayCircleOutline } from "react-icons/md";
import { CiCircleAlert } from "react-icons/ci";
import { VscDeviceCameraVideo } from "react-icons/vsc";
function Module() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    }

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };

    const chapters = [
        { name: 'Chapter 1 - Intro', status: 'Started', isActive: true },
        { name: 'Chapter 2 - Required tools', status: 'Not Started', isActive: false },
        { name: 'Chapter 3 - jcdjxcdm', status: 'Not Started', isActive: false }
    ];
    return (
        <div className="flex bg-[#EDEFF9] w-[1510px] h-[780px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[740px] mt-[20px] ml-[20px] rounded-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">

                        <span className="text-[24px] font-semibold">My Courses<span className="text-[24px] font-semibold text-[#00778B]"> / Social</span></span>

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
                <div className="ml-6">
                    <h1 className="text-[28px] font-semibold">Wind energy basic course</h1>
                </div>

                {/* tab */}

                <div className="mt-4">
                    <div className="flex justify-between border-b">
                        <div>
                            <button
                                className={`py-2 px-4 text-[16px]  text-center  border-b-2 
                 ${activeTab === 'tab1' ? 'border-[#00778B] text-[#00778B]' : 'border-transparent'}  focus:outline-none`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Information
                            </button>
                            <button
                                className={`py-2 px-4 text-[16px]  text-center  border-b-2 ml-4
                  ${activeTab === 'tab2' ? 'border-[#00778B] text-[#00778B]' : 'border-transparent'} focus:outline-none`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                Module
                            </button>
                        </div>
                        <button
                            className="flex items-center justify-center py-2 px-4 text-[16px] text-center  border-b-2 mr-6
                 border-[#00778B] text-[#00778B] focus:outline-none">
                            Modules Completed - 1/5
                            <IoChevronDownSharp className="ml-2 cursor-pointer" onClick={handleIconClick} />
                        </button>
                        {isOpen && (
                            <div className="absolute bg-white border rounded-lg ml-[970px] mt-[44px] shadow-sm w-[240px] h-[200px]">
                                <div className="relative">
                                    {chapters.map((chapter, index) => (
                                        <div key={index} className="flex items-center ">
                                            <div className="relative">

                                                {index !== chapters.length - 1 && (
                                                    <div className="absolute top-9 -translate-y-3 left-7 w-0.5 h-8 bg-[#D9D9D9]"></div>
                                                )}
                                                <div className={`ml-4 w-6 h-6 rounded-full ${chapter.isActive ? 'bg-white h-2 w-2 border-2 border-[#017285]' : 'bg-white'} border-2 border-[#D9D9D9] flex items-center justify-center`}>
                                                    {chapter.isActive && <div className="w-3 h-3 bg-[#017285] rounded-full"></div>}
                                                </div>
                                            </div>
                                            <div className="ml-4 mt-3">
                                                <h3 className="text-[14px] text-[#000000]">{chapter.name}</h3>
                                                <p className="text-[14px] text-[#606060]">{chapter.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="">
                        {activeTab === 'tab1' &&
                            

                        <p>A</p>


                        }
                        {activeTab === 'tab2' &&

                            <div className="p-4">

                                <div className="border-b border-[#D9D9D9] pb-3">
                                    <div className="bg-white flex items-center ml-1  ">
                                        <FaCheckCircle className="text-green-500 h-[24px] w-[24px]  " />
                                        <div className="flex-grow ml-2">
                                            <p className="font-semibold text-[16px]">Chapter 1 - Intro</p>

                                        </div>

                                        <button className="text-gray-800 ">
                                            <MdKeyboardArrowUp className="h-8 w-8 " />
                                        </button>

                                    </div>
                                    <p className="text-[#606060] text-[12px] ml-1">Section: 1 | Duration: 00:30:00</p>
                                </div>

                                <div className="flex items-center justify-between bg-white  py-4 border-b border-[#D9D9D9] ">
                                    <div className="flex items-center m-1">

                                        <MdPlayCircleOutline className="h-[32px] w-[32px] mr-4 text-[#D9D9D9] " />
                                        <div>
                                            <h1 className=" font-semibold text-[16px]">Doug's Story 1</h1>
                                            <p className=" text-[#606060]  text-[12px]">MP4 | Duration: 00:04:42</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#64A70B] text-white px-4 py-1 rounded-md text-sm h-[42px] w-[110px]">

                                        Completed
                                    </button>
                                </div>

                                <div className="flex items-center justify-between bg-white  py-4 border-b border-[#D9D9D9]">
                                    <div className="flex items-center ">

                                        <MdPlayCircleOutline className="h-[32px] w-[32px] mr-4 text-[#D9D9D9] m-1 " />
                                        <div>
                                            <h1 className=" font-semibold text-[16px]">Doug's Story 2</h1>
                                            <p className=" text-[#606060]  text-[12px]">MP4 | Duration: 00:04:42</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#FFD56A] text-white px-4 py-1 rounded-md text-sm h-[42px] w-[110px]">

                                        In Progress
                                    </button>
                                </div>

                                <div className="flex items-center justify-between bg-white  py-4 border-b border-[#D9D9D9]">
                                    <div className="flex items-center ">

                                        <VscFilePdf className="h-[32px] w-[32px] mr-4 text-[#D9D9D9] m-1" />
                                        <div>
                                            <h1 className=" font-semibold text-[16px]">Doug's Story 3</h1>
                                            <p className=" text-[#606060]  text-[12px]">MP4 | Duration: 00:04:42</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#00778B] text-white px-4 py-1 rounded-md text-sm h-[42px] w-[110px]">

                                        Start
                                    </button>
                                </div>

                                <div className="border-b border-[#D9D9D9] pb-4 mt-3">
                                    <div className="bg-white flex items-center ml-1  ">
                                        <CiCircleAlert className=" text-[#D9D9D9] h-[19px] w-[19px]  m-1  " />
                                        <div className="flex-grow ml-2">
                                            <p className="font-semibold text-[16px]">Chapter 2 - Required Tools</p>

                                        </div>

                                        <button className="text-gray-800 mt-1 ">
                                            <MdKeyboardArrowUp className="h-8 w-8 " />
                                        </button>

                                    </div>
                                    <p className="text-[#606060] text-[12px] ml-2">Section: 2 | Duration: 00:30:00</p>
                                </div>

                                <div className="flex items-center justify-between bg-white  py-4 border-b border-[#D9D9D9]">
                                    <div className="flex items-center ">

                                        <div className="bg-[#D9D9D9] p-2 rounded-full border border-white w-[40px] h-[40px] flex items-center justify-center m-1">
                                            <VscDeviceCameraVideo className="text-white text-3xl" />
                                        </div>
                                        <div className="ml-2">
                                            <h1 className=" font-semibold text-[16px]">Live Session(session title)</h1>
                                            <p className=" text-[#606060]  text-[12px]">Date : 29th march, 2024 | Time: 9:10AM</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#00778B] text-white px-4 py-1 rounded-md text-sm h-[42px] w-[110px]">

                                        Join
                                    </button>
                                </div>

                                <div className="flex items-center justify-between bg-white  py-4 ">
                                    <div className="flex items-center ">

                                        <MdPlayCircleOutline className="h-[32px] w-[32px] mr-4 text-[#D9D9D9] m-2 " />
                                        <div>
                                            <h1 className=" font-semibold text-[16px]">Doug's Story 4</h1>
                                            <p className=" text-[#606060]  text-[12px]">MP4 | Duration: 00:04:42</p>
                                        </div>
                                    </div>
                                    <button className="bg-[#64A70B] text-white px-4 py-1 rounded-md text-sm h-[42px] w-[110px]">

                                        Completed
                                    </button>
                                </div>
                                <div className="  top-[685px] absolute right-0  bottom-0 left-[1165px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                                    <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                                    <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                        <span className="text-gray-900 font-semibold">Messaging</span>
                                    </div>
                                    < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                                </div>

                            </div>

                        }

                    </div>
                </div>

            </div>

        </div>


    )
}

export default Module