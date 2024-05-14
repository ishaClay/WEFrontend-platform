
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";

import { TbSelector } from "react-icons/tb";

import { MdKeyboardArrowUp } from "react-icons/md";

function EmployeeSupportRequest() {

    const employeeData = [
        {
            id: "#01",
            lastupdate: "22/05/2024",
            requestor: "Danila Raffel",
            subject: "How to customize the template",
            status: "Open",
            assignto: "Emilla",
            priority: "High",
        },
        {
            id: "#02",
            lastupdate: "22/05/2024",
            requestor: "Danila Raffel",
            subject: "How to customize the template",
            status: "Answered",
            assignto: "Emilla",
            priority: "Normal",
        },
        {
            id: "#03",
            lastupdate: "22/05/2024",
            requestor: "Danila Raffel",
            subject: "How to customize the template",
            status: "In Process",
            assignto: "Emilla",
            priority: "Poor",
        },
    ];
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
                        <div className="text-[24px] font-semibold">
                            Supports / <span className="text-[20px] text-[#00778B] font-Nunito Sans">User Manual</span>

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
                    <div className="pt-2 pl-[20px] pb-5 flex gap-10">
                        <div className="border border-solid border-[#D9D9D9] w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
                            <img
                                src="../assets/img/ticket.png"
                                alt="img"
                                className="w-[72px] h-[52px] mr-3"
                            />
                            <div className="pl-[30px]">
                                <span className="text-[32px] leading-[39.06px] font-bold">
                                    375
                                </span>
                                <h4 className="mb-1">Total Tickets</h4>
                            </div>
                        </div>

                        <div className="border border-solid border-[#D9D9D9] w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
                            <img
                                src="../assets/img/thumb.png"
                                alt="img"
                                className="w-[46px] h-[42px] mr-3"
                            />
                            <div className="pl-[30px]">
                                <span className="text-[32px] leading-[39.06px] font-bold">
                                    100
                                </span>
                                <h4 className="mb-1">Resolved</h4>
                            </div>
                        </div>

                        <div className="border border-solid border-[#D9D9D9] w-[370px] h-[108px] rounded-[5.06px] flex items-center p-3 mt-[5px]">
                            <img
                                src="../assets/img/ticket2.png"
                                alt="img"
                                className="w-[73px] h-[42px] mr-3"
                            />
                            <div className="pl-[30px]">
                                <span className="text-[32px] leading-[39.06px] font-bold">
                                    125
                                </span>
                                <h4 className="mb-1">Pending</h4>
                            </div>
                        </div>
                    </div>

                    <div className="flex pl-[20px] h-[70px]">
                        <div className="flex flex-1 items-center">
                            <div className="flex mt-[9px] items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[550px] h-[52px] text-[#A3A3A3]">
                                <BsSearch className="text-[#D9D9D9] mr-2" />
                                <input
                                    type="text"
                                    placeholder="Search by pilier, level, recommended, course name etc."
                                    className="flex-1 mr-2 focus:outline-none placeholder-[#A3A3A3] text-sm"
                                />
                            </div>
                        </div>
                        <div className="mr-[10px] mt-[25px] h-[40px] w-[153px]">
                            <button className="bg-[#00778B] text-white px-4 py-2 rounded ">
                                Add New Ticket
                            </button>
                        </div>

                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full mt-[20px] ">
                            <thead>
                                <tr className="bg-[#F1F1F1] h-[50px]">
                                    <th className=" ">
                                        {" "}
                                        <span className="flex ml-4 ">
                                            ID{" "}
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Last Updated
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Requestor
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Subject
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Status
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Assign to
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        <span className="flex ml-4">
                                            Priority
                                            <span className="mt-1">
                                                <TbSelector />
                                            </span>
                                        </span>
                                    </th>
                                    <th className=" ">
                                        {" "}
                                        <span className=" ml-4">Action</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeeData.map((employee, index: number) => (
                                    <tr key={index}>
                                        <td className=" border-b px-18 pl-4 py-2">
                                            <span className="w-[110px]">{employee.id}</span>
                                        </td>
                                        <td className=" border-b px-18 py-4 ">
                                            <span className="flex"> {employee.lastupdate}</span>{" "}
                                        </td>
                                        <td className=" border-b px-18 py-2">
                                            {employee.requestor}
                                        </td>
                                        <td className="border-b px-18 pl-4 py-2">
                                            {employee.subject}
                                        </td>
                                        <td className={`border-b px-18 py-2`}>
                                            <button
                                                className={`text-xs rounded ${employee.status === "Open"
                                                    ? " text-[#FEA77C] font-semibold h-[32px] w-[80px]"
                                                    : employee.status === "In Process"
                                                        ? " text-[#58BA66] font-semibold h-[32px] w-[80px]"
                                                        : " text-[#0E9CFF] font-semibold h-[32px] w-[80px]"
                                                    }`}>
                                                {employee.status}
                                            </button>
                                        </td>

                                        <td className="border-b px-18 pl-4 py-2">
                                            {employee.assignto}
                                        </td>

                                        <td className={`border-b px-18 py-2`}>
                                            <button
                                                className={`text-xs rounded ${employee.priority === "High"
                                                    ? "bg-[#FF5252] text-white h-[32px] w-[80px]"
                                                    : employee.priority === "Normal"
                                                        ? "bg-[#58BA66] text-white h-[32px] w-[80px]"
                                                        : "bg-[#FFD56A] text-white h-[32px] w-[80px]"
                                                    }`}>
                                                {employee.priority}
                                            </button>
                                        </td>
                                        <td className={`border-b px-18 py-2 `}>
                                            <RiDeleteBinLine className="text-[#A3A3A3] ml-[40px]" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="ml-[980px] mt-[20px]">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                        <PaginationLink href="#">2</PaginationLink>
                                        <PaginationLink href="#">3</PaginationLink>
                                    </PaginationItem>

                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>

                    <div className="ml-[20px] mt-[50px]">
                        <p className="font-bold text-[10px]">
                            Showing 10/200 Records
                        </p>
                    </div>


                    <div className="top-[638px] absolute right-0  bottom-0 left-[1166px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
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
    )
}

export default EmployeeSupportRequest