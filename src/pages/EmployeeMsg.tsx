
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdOutlineAttachFile } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { ScrollArea } from "@/components/ui/scroll-area"




function EmployeeMsg() {

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[730px] mt-[20px] ml-[20px] rounded-[10px] p-4 ">
                <div className="">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">

                        <span className="text-[18px] font-semibold">Message</span>

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


                <div className="flex">
                    <div className=" w-[325px] h-[665px] border-r ">
                        <div className="w-[325px] h-[60px] border-b ">
                            <div className="">

                                <div className="relative mt-4 ml-2 ">
                                    <input
                                        type="text"
                                        placeholder="Search by name"
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D9D9D9] w-[298px] placeholder-[#D9D9D9]"
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BsSearch className="text-[#D9D9D9]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black  p-2 cursor-pointer">
                            <div className="flex ">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#0E9CFF] flex items-center justify-center mr-4 mt-2 text-[white]" >LR</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
                            <div className="flex">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-[white]" >HR</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black  p-2 cursor-pointer">
                            <div className="flex">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#64A70B] flex items-center justify-center mr-4 mt-2 text-[white]" >CR</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer" >
                            <div className="flex">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#1FA8DC] flex items-center justify-center mr-4 mt-2 text-[white]" >EJ</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
                            <div className="flex">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#FD9372] flex items-center justify-center mr-4 mt-2 text-[white]" >JD</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="w-[320px] h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black p-2 cursor-pointer">
                            <div className="flex ">
                                <div><div className=" h-[42px] w-[43px] rounded-full bg-[#A81F58] flex items-center justify-center mr-4 mt-2 text-[white]" >LR</div></div>
                                <div className="flex flex-col">
                                    <div className="flex  ">
                                        <div className="text-[16px] font-semibold">Honey Risher</div>
                                        <div className="text-gray-600 text-xs ml-24">11:57 AM</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-xs text-[#A3A3A3]">company</div>
                                        <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>

                    <div className=" w-[890px]  mt-4 rounded">
                        <div className="h-[60px] w-full flex border-b">
                            <div className="flex ml-4">
                                <div>
                                    <div className=" h-[42px] w-[43px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4  text-[white]" >
                                        LR
                                    </div>
                                </div>

                                <div className="flex flex-col  ">
                                    <div className="text-[14px] font-semibold ">Honey Risher</div>
                                    <div className="text-[#A3A3A3] text-xs ">company</div>
                                </div>
                            </div>

                        </div>


                        <div>
                            <ScrollArea className="h-[400px] w-full rounded-md  p-4">
                                <div className="h-[200px] w-full ">
                                    <div className="flex pt-8">
                                        <div><div className=" h-[32px] w-[32px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-[white]" >LR</div></div>
                                        <div className="flex flex-col ">
                                            <div className="text-[16px] font-semibold">Honey Risher</div>
                                            <div className="text-gray-600 text-xs">11:57 AM</div>
                                        </div>
                                    </div>

                                    <div className="h-[100px] w-[800px]  ml-12 mt-2 bg-[#FFFFFF]">
                                        <div className="h-[100px] w-[780px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>

                                    </div>
                                    <div className="flex items-center">
                                        <div className="border-t border-[#D9D9D9] flex-grow "></div>

                                        <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                                        <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                    </div>
                                </div>

                                <div className="h-[170px] w-full ">
                                    <div className="flex ">
                                        <div><div className=" h-[32px] w-[32px] rounded-full bg-[#4285F4] flex items-center justify-center mr-4 mt-2 text-[white]" >EV</div></div>
                                        <div className="flex flex-col ">
                                            <div className="text-[16px] font-semibold">Honey Risher</div>
                                            <div className="text-gray-600 text-xs">11:55 AM</div>
                                        </div>
                                    </div>

                                    <div className="h-[100px] w-[800px]  ml-12 mt-2 bg-[#FFFFFF]">
                                        <div className="h-[100px] w-[780px] text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                                        
                                    </div>
                                    <div className="flex items-center">
                                            <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                            <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                                            <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                        </div>
                                </div>
                            </ScrollArea>
                        </div>

                        <div className="w-[850px] ml-5">
                            <textarea
                                id="description"
                                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                                placeholder="Enter message"
                                rows={4}
                            />
                        </div>

                        <div className="flex items-center justify-between bg-[#FFFFFF] mr-[18px] ">
                            <div className="flex items-center">
                                <div className="  flex items-center justify-center h-16 w-16 "><TbPhoto size={30} /></div>
                                <div className="  flex items-center justify-center h-16 w-16 "><MdOutlineAttachFile size={30} /></div>

                            </div>
                            <button className="bg-[#58BA66] text-[#FFFFFF] px-6 py-3 rounded-md border border-[#58BA66] ">SEND</button>
                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}

export default EmployeeMsg