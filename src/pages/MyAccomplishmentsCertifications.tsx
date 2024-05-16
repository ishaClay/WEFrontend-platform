
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";

function MyAccomplishmentsCertifications() {

    return (

        <div className="flex bg-[#EDEFF9] w-[1510px] h-[730px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[690px] mt-[20px] ml-[20px] rounded-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">

                        <span className="text-[24px] font-semibold">Certifications</span>

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

                <div className="flex gap-6 ml-6">
                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                </div>


                <div className="flex gap-6 ml-6 mt-6">
                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                </div>

                <div className="flex gap-6 ml-6 mt-6">
                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                    <div className="w-[580px] h-[140px] border rounded-[10px] border-[#D9D9D9] shadow-sm flex justify-between items-center">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[100px]">
                                <img className="w-[100px] h-[100px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[240px] gap-2 mt-6">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                            </div>
                        </div>
                        <button className="m-5 px-4 py-2 bg-[#00778B] text-white rounded-[5px] w-[80px] h-[40px] ">View</button>
                    </div>

                    <div className="  top-[638px] absolute right-0  bottom-0 left-[1165px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                        <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                        <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                            <span className="text-gray-900 font-semibold">Messaging</span>
                        </div>
                        < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                    </div>

                </div>


            </div>

        </div>
    )
}

export default MyAccomplishmentsCertifications