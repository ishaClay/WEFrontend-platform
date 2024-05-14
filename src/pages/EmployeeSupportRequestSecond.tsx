

import { FiFile } from 'react-icons/fi';
import { VscFilePdf } from "react-icons/vsc";
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";
import React, { useState } from 'react';


function EmployeeSupportRequestSecond() {


    const [ticketReply, setTicketReply] = useState<string>("");

    const handleTicketReplyChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTicketReply(e.target.value);
    };


    return (

        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1100px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[1070px] mt-[20px] ml-[20px] rounded-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">
                        <div className="text-[24px] font-semibold">
                            Supports / <span className="text-[20px] text-[#00778B] font-Nunito Sans">Support request</span>

                        </div>


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

                <div className="">
                    <div className="flex justify-between">
                        <div className="flex p-4">
                            <img
                                src="/public/assets/img/face1.jpg"
                                alt="Employee Name"
                                className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px]"
                            />
                            <div className="flex flex-col">
                                <span className="text-[16px]  text-[#000000]">
                                    Danila Raffel
                                </span>

                                <span className="text-[12px] text-[#A3A3A3]  ">Client</span>
                            </div>
                        </div>

                        <div className="flex flex-col  ml-8">
                            <div className="flex mt-6  gap-2 ">
                                <h1 className="text-[16px]">Status:</h1>
                                <div className="bg-[#0E9CFF]  text-xs text-white  py-2 h-[25px] w-[71px] px-4 rounded-full mr-2 flex items-center justify-center">
                                    Answered
                                </div>
                                <h1 className="text-[16px]">Priority:</h1>
                                <div className="bg-[#FF5252]  text-xs text-white py-2 h-[25px] w-[43px] px-4 rounded-full mr-2 flex items-center justify-center">
                                    High
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 p-4 border w-[1190px] ml-[20px] mt-[10px] rounded">
                        <div className="text-[16px] text-[#A3A3A3] font-semibold">
                            Category
                        </div>
                        <div className="text-black">System Issues</div>

                        <div className="text-[16px] font-semibold text-[#A3A3A3]">
                            Ticket Details
                        </div>
                        <div className="text-black text-[15.4px]">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a
                                gallery of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of
                                Lorem Ipsum.
                            </p>
                        </div>

                        <div className="flex items-center mt-[20px]">
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full">
                                    <VscFilePdf className="w-6 h-6" />
                                </div>
                                <div className="text-gray-700 ml-[20px]">
                                    pdf file attachment.pdf
                                </div>
                            </div>
                            <div className="ml-[20px]">
                                <button className="bg-[#00778B] text-white px-3 py-1 rounded">
                                    DOWNLOAD
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-3 p-4 border w-[1190px] ml-[20px] mt-[10px] rounded">
                        <div className="text-[16px] text-[#A3A3A3] font-semibold">
                            Category
                        </div>
                        <div className="text-black">Training Provider Related</div>

                        <div className="text-[16px] font-semibold text-[#A3A3A3]">
                            Ticket Details
                        </div>
                        <div className="text-black text-[15.4px]">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industry's standard dummy
                                text ever since the 1500s, when an unknown printer took a
                                gallery of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into
                                electronic typesetting, remaining essentially unchanged. It was
                                popularised in the 1960s with the release of Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of
                                Lorem Ipsum.
                            </p>
                        </div>

                        <div className="flex items-center mt-[20px]">
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full">
                                    <VscFilePdf className="w-6 h-6" />
                                </div>
                                <div className="text-gray-700 ml-[20px]">
                                    pdf file attachment.pdf
                                </div>
                            </div>
                            <div className="ml-[20px]">
                                <button className="bg-[#00778B] text-white px-3 py-1 rounded">
                                    DOWNLOAD
                                </button>
                            </div>
                        </div>
                    </div>


                    <div>
                        <div className="p-4 rounded-lg">

                            <label
                                htmlFor="ticketReply"
                                className="block text-sm font-medium text-gray-700">
                                Ticket Reply
                            </label>

                            <textarea
                                id="ticketReply"
                                name="ticketReply"
                                value={ticketReply}
                                onChange={handleTicketReplyChange}
                                placeholder="Enter details"
                                className="mt-1 block w-[1195px] h-32 py-2 px-3 border border-[#D9D9D9]  placeholder-[#A3A3A3] rounded"></textarea>

                        </div>


                        <div className="flex p-4">
                            <label
                                htmlFor="upload-document"
                                className="flex items-center space-x-2 cursor-pointer">
                                <input type="file" id="upload-document" className="hidden" />
                                <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                                    <FiFile className="w-6 h-6" />
                                </div>
                                <span>Upload Document </span>
                            </label>

                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-[920px]">
                                SUBMIT
                            </button>


                        </div>

                        <div className="top-[1018px] absolute right-0  bottom-0 left-[1166px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                            <img src="/public/assets/img/face1.jpg"
                                alt="Profile"
                                className="h-8 w-8 rounded-full"
                            />
                            <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                <span className="text-gray-900 font-semibold">Messaging</span>
                            </div>
                            < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                        </div>

                    </div>


                </div>


            </div>

        </div>
    )
}

export default EmployeeSupportRequestSecond