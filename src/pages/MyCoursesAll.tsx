


import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { MdKeyboardArrowUp } from "react-icons/md";
function MyCoursesAll() {

    return (
        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1230px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[1460px] mt-[20px] ml-[20px] rounded-t-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">


                        <span className="text-[24px] font-semibold">My Courses</span>
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

                <div className="flex justify-between items-center  h-[92px] w-full bg-[#F3F3F3] ">

                    <div className="">

                        <div className="flex space-x-4 p-4">
                            <div>
                                <label htmlFor="environment" className="block text-sm font-medium text-gray-700 ">

                                    Filter by
                                </label>
                                <select
                                    id="environment"
                                    name="environment"
                                    className="mt-1 block  pl-3 pr-10 py-2 text-base border border-[#A3A3A3] rounded shadow-sm bg-[#F3F3F3] w-[248px]"
                                    defaultValue="Environment"
                                >
                                    <option>Environment</option>
                                    <option>Social</option>
                                    <option>Economics</option>
                                    <option>Governance</option>
                                    <option>Technology & Innovation</option>
                                    <option>Strategic Integration</option>

                                </select>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Filter by
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-[#A3A3A3] rounded shadow-sm bg-[#F3F3F3] w-[176px] "
                                    defaultValue="In Progress"
                                >
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Upcoming courses</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="flex mt-4  ml-[580px] gap-2 p-4">

                        <AiOutlineAppstore className="text-[#00778B] w-8 h-8" />

                        <AiOutlineBars className=" text-[#A3A3A3] w-8 h-8 " />
                    </div>

                </div>


                <div className="flex ml-1">

                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ml-8   ">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]"
                                >
                                    Continue
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {30}%
                            </div>
                            <div className="text-[12px] ml-[180px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${30}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FF5252] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environment</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            

                        </div>

                        <div className="flex  ml-[13px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[15px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>


                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2  rounded-lg shadow h-[50px] w-[140px]"
                                >
                                  view certificate
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {100}%
                            </div>
                            <div className="text-[12px] ml-[165px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${100}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environmental</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            <button className="bg-[#D6F5AC] text-[#3A3A3A]  rounded-full h-[28px] w-[54px]">Social</button>

                        </div>

                        <div className="flex  ml-[13px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[15px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>


                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ml-8">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]"
                                >
                                    Continue
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {30}%
                            </div>
                            <div className="text-[12px] ml-[180px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${30}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environmental</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            <button className="bg-[#D6F5AC] text-[#3A3A3A]  rounded-full h-[28px] w-[54px]">Social</button>

                        </div>

                        <div className="flex  ml-[15px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>



                </div>



                <div className="flex ml-1">

                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ml-8">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]"
                                >
                                    Continue
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {30}%
                            </div>
                            <div className="text-[12px] ml-[180px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${30}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environmental</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            <button className="bg-[#D6F5AC] text-[#3A3A3A]  rounded-full h-[28px] w-[54px]">Social</button>

                        </div>

                        <div className="flex  ml-[13px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[15px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>


                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2 rounded-lg shadow h-[50px] w-[140px]"
                                >
                                    view certificate
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {100}%
                            </div>
                            <div className="text-[12px] ml-[165px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${100}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environmental</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            <button className="bg-[#D6F5AC] text-[#3A3A3A]  rounded-full h-[28px] w-[54px]">Social</button>

                        </div>

                        <div className="flex  ml-[13px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[15px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>


                    <div className="ml-[20px] mt-[20px] h-[460px] w-[382px] border border-solid border-[#D9D9D9] rounded">

                        <div className="relative overflow-hidden rounded">
                            <img className="w-[382px] h-[231px] rounded object-cover object-center"
                                src="/public/assets/img/nature.png"
                                alt="Course"
                            />

                            <div className="flex items-center absolute bottom-0 left-[220px] w-30  rounded-full py-1 px-2 mb-4 ml-8">

                                <button

                                    className="bg-[#00778B]  text-white font-medium py-2 px-4 rounded-lg shadow h-[50px] w-[105px]"
                                >
                                    Continue
                                </button>

                            </div>

                        </div>

                        <div className=" w-[300px] mt-[5px] ml-[15px]" >
                            <p className="text-[16px] font-semibold">
                                Certificate in the Sustainable...
                            </p>
                        </div>

                        <div className="flex  mt-2">

                            <div className="text-[20px] text-[#00778B] font-bold ml-[15px]">

                                {30}%
                            </div>
                            <div className="text-[12px] ml-[180px] mt-2">
                                1 of 5 Completed
                            </div>
                        </div>
                        <div className="w-[310px] h-[8px] bg-[#E8E8E8] rounded-lg ml-[15px] mt-2">

                            <div
                                className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                style={{ width: `${30}%` }}
                            >

                            </div>
                        </div>

                        <div className="flex gap-6 p-4">
                            <button className="bg-[#FFD56A] text-[#3A3A3A] rounded-full h-[28px] w-[110px] ">Environmental</button>
                            <button className="bg-[#FFD56A] text-[#3A3A3A]  rounded-full h-[28px] w-[95px]">Governance</button>
                            <button className="bg-[#D6F5AC] text-[#3A3A3A]  rounded-full h-[28px] w-[54px]">Social</button>

                        </div>

                        <div className="flex  ml-[15px]">

                            <div className="h-[22px] w-[129px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]"
                                    src="public/assets/img/timer.png"
                                    alt="Course"
                                />
                                <p className="text-xs">
                                    Level- Advanced
                                </p>
                            </div>

                            <div className="h-[22px] w-[160px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px] text-black"
                                    src="public/assets/img/diploma.png"
                                    alt="Course" />
                                <p className="text-xs">Post Graduate Diploma</p>
                            </div>
                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                <p className="text-xs">Full Time</p>
                            </div>
                            <div className="h-[22px] w-[75px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                <p className="text-xs">Online</p>
                            </div>

                        </div>

                        <div className="flex mt-[5px] ml-[13px]">

                            <div className="h-[22px] w-[80px] flex items-center gap-1">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                <p className="text-xs">2 Years</p>
                            </div>
                            <div className="h-[22px] w-[200px] flex items-center gap-1 ml-[50px]">
                                <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                <p className="text-xs">Atlantic Technological University</p>
                            </div>

                        </div>

                    </div>



                </div>



                <div className=" ml-[895px] mt-1 bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
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

export default MyCoursesAll