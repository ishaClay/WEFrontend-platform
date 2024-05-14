
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

import { TbSelector } from "react-icons/tb";

import { MdKeyboardArrowUp } from "react-icons/md";

function UserManual() {

    const employeeData = [
        {
            ID: "#01",
            DocumentTitle: "User manual for SME admin",
            Type: "User Manual",
        },
        {
            ID: "#02",
            DocumentTitle: "User manual for SME admin",
            Type: "User Manual",
        },
        {
            ID: "#03",
            DocumentTitle: "User manual for SME admin",
            Type: "User Manual",
        },
        {
            ID: "#04",
            DocumentTitle: "User manual for SME admin",
            Type: "User Manual",
        },
        {
            ID: "#05",
            DocumentTitle: "User manual for SME admin",
            Type: "User Manual",
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

                <div className="overflow-x-auto">
                    <table className="table-auto w-full  ">
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
                                        Document Title
                                        <span className="mt-1">
                                            <TbSelector />
                                        </span>
                                    </span>
                                </th>
                                <th className=" ">
                                    <span className="flex ml-4">
                                        Type
                                        <span className="mt-1">
                                            <TbSelector />
                                        </span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData.map((employee) => (
                                <tr key={employee.ID}>
                                    <td className=" border-b px-4 pl-4 py-2">
                                        <span className="w-[110px]">{employee.ID}</span>
                                    </td>
                                    <td className=" border-b px-4 py-4 ">
                                        <span className="flex text-[#00778B]">
                                            {employee.DocumentTitle}
                                        </span>
                                    </td>
                                    <td className=" border-b px-4 py-2">{employee.Type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="ml-[1000px] mt-[20px]">
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

                <div className="ml-[20px] mt-[170px]">
                    <p className="font-bold text-[10px] ">Showing 10/200 Records</p>
                </div>

                <div className="  top-[635px] absolute right-0  bottom-0 left-[1165px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
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

export default UserManual