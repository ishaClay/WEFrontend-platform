import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import { FaVideo } from 'react-icons/fa';

function LiveSession() {

    return (
        <div className="flex bg-[#EDEFF9] w-[1510px] h-[750px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[720px] mt-[20px] ml-[20px] rounded-[10px]  ">
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

                <div className="p-4">
                    <div className="bg-white  flex items-center justify-between w-full border-b-2 border-t-2 pb-6 pt-6 border-[#D9D9D9]">
                        <div className="flex items-center">
                            <div className="p-2 border-2 bg-[#B3B3B3] rounded-full">

                                <FaVideo className="text-lg text-[#FFFFFF]" />
                            </div>
                            <div className="ml-4">
                                <h2 className="font-semibold text-[16px]">Live Session(session title)</h2>
                                <div className="flex gap-4">
                                    <div className="flex items-center text-[#666666]">
                                        <LuCalendarDays className="mr-2" />
                                        <p className="text-[12px]">Date: <span className="text-[#000000]">29th March, 2024</span> </p>

                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        < FaRegClock className="mr-2" />
                                        <p className="text-[12px]">Time: <span className="text-[#000000]">9:10AM to 12:15AM</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right text-[12px]">
                            <p className="text-gray-600">Assign date: <span className="text-[#000000]">25th March, 2024</span> </p>
                            <p className="text-gray-600">Planned completed date: <span className="text-[#000000]">20th April, 2024</span> </p>
                        </div>
                    </div>

                </div>


                <div className="flex justify-center items-center h-[447px] w-[1200px] bg-[#00778B1A] ml-[15px] rounded-[10px]">
                    <div className="text-center">
                        <p className="mb-4 text-gray-700 w-[320px] h-[]">
                            The meeting link will be enabled 15 minutes before the scheduled time.
                        </p> 
                        <button className="bg-[#00778B] h-[42px] w-[110px] text-white  py-2 px-4 rounded">
                            Join
                        </button>
                    </div>
                </div>


                <div className="  top-[668px] absolute right-0  bottom-0 left-[1165px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                    <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                    <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                        <span className="text-gray-900 font-semibold">Messaging</span>
                    </div>
                    < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                </div>


            </div>

        </div>
    )
}

export default LiveSession