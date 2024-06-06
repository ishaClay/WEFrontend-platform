
import HeaderCourse from "@/components/HeaderCourse"

import { FiFile, FiVideo } from 'react-icons/fi';

import EmployeeListSidebar from "@/components/EmployeeListSidebar";

function SupportAddNewTicket() {

   

    return (
        <div className="flex bg-[#f5f3ff] w-[1510px] h-[760px] overflow-hidden">
            <div className=" ">
                <EmployeeListSidebar />
            </div>
            <div className="flex flex-col  ">
                <div className=" ">
                    <HeaderCourse />
                </div>

                <div className="bg-[#FFFFFF] w-[1250px] h-[630px] m-[12px] rounded-[10px]">
                    <div className="  pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[10px] ">
                        <p className="text-[#000000] text-[Calibri] font-bold">Add New Ticket</p>

                    </div>

                    <div className="bg-[#FFFFFF] p-4 ">

                        <div className="grid grid-cols-2 gap-4">
                            <div >
                                <label htmlFor="assignTo" className="block mb-2">
                                    Assign To
                                </label>
                                <select
                                    id="assignTo"
                                    className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full text-[#D9D9D9]"
                                >
                                    <option className="text-[#D9D9D9]" value="">Select Name</option>
                                    {/* Add options here */}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ticketPriority" className="block mb-2">
                                    Ticket Priority
                                </label>
                                <select
                                    id="ticketPriority"
                                    className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full text-[#D9D9D9]"
                                >
                                    <option className="text-[#D9D9D9]" value="High">High</option>
                                    <option className="text-[#D9D9D9]" value="Medium">Medium</option>
                                    <option className="text-[#D9D9D9]" value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="ticketSubject" className="block mb-2">
                                Ticket Subject
                            </label>
                            <input
                                type="text"
                                id="ticketSubject"
                                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                                placeholder="Enter ticket subject"
                            />
                        </div>
                        <div className="mt-4 ">
                            <label htmlFor="description" className="block mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                                placeholder="Enter details"
                                rows={4}
                            />
                        </div>

                    </div>



                    <div className="flex p-4">
                        <label htmlFor="upload-document" className="flex items-center space-x-2 cursor-pointer">
                            <input type="file" id="upload-document" className="hidden" />
                            <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                                <FiFile className="w-6 h-6" />

                            </div>
                            <span >Upload Document  </span>
                        </label>
                        <label htmlFor="upload-document" className="flex items-center space-x-2 cursor-pointer">
                            <input type="file" id="upload-document" className="hidden" />
                            <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                                <FiVideo className="w-6 h-6" />

                            </div>
                            <span >Upload Document  </span>
                        </label>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-[740px]">SUBMIT</button>
                    </div>




                </div>


            </div>



        </div>



    )
}

export default SupportAddNewTicket;