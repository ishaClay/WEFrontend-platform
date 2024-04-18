import sidebarlogo from "/assets/img/sidebarlogo.png";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { RiShutDownLine } from "react-icons/ri";
import { LuMapPin } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { PiEnvelopeThin } from "react-icons/pi";
import { BsTicketPerforated } from "react-icons/bs";
import { TfiBook } from "react-icons/tfi";
import { FiSettings } from "react-icons/fi";
import { useState } from 'react';
import { HiChevronRight, HiChevronDown } from 'react-icons/hi';

const EmployeeListSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="top-0 left-0 lg:flex flex-col justify-between w-60 duration-500 bg-[#FFFFFF] overflow-hidden shadow">
            <div className="px-1 w-[235px] h-[720px]">
                <div className="ml-[40px] mt-[20px]">
                    <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative">
                    <Link to="/dashboard" className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-[400] text-[16px] font-[Calibri]">
                        <RxDashboard size={22} />
                        <h2>Dashboard</h2>
                    </Link>
                    <Link to="/company-management" className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]">
                        <LuMapPin size={22} />
                        <h2>Maturity Assessment</h2>
                    </Link>
                    <Link
                        to="/courses"
                        className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] "
                    >
                        <TfiBook size={22} />
                        <h2>Course Management</h2>
                        <HiChevronRight/>
                    </Link>
                    <Link
                        to=""
                        className="group flex items-center text-sm gap-2 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] "
                       
                    >
                        <FaUserGroup size={22} />
                        <h2>Team Management</h2>
                         <HiChevronRight /> 
                    </Link>
                    

                    <Link to=""  className="group flex items-center text-sm gap-2 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] "
                     onClick={toggleDropdown}>
                        <BsTicketPerforated size={22} />
                        <h2>Support</h2>
                        <HiChevronDown />
                    </Link>
                    {isOpen && (
                        <ul className="absolute left-0 right-0 bg-white rounded-md mt-[270px] list-disc pl-6 w-[245px] h-[90px]">
                            <li className="ml-[20px] text-xs mt-2">
                                <Link to="/Employee List">FAQ’s</Link>
                            </li>
                            <li className="ml-[20px] text-xs mt-2">
                                <Link to="/Employee Progress">User Manual</Link>
                            </li>
                            <li className="ml-[20px] text-xs mt-2">
                                <Link to="/Employee Progress">Support Request</Link>
                            </li>

                        </ul>
                    )}
                    <Link to="/global-setting" className={`group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060] ${isOpen ? 'mt-[85px]' : ''}`}>
                        <FiSettings size={22} />
                        <h2>Setting</h2>
                    </Link>
                    <Link to="/global-setting" className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]">
                        <PiEnvelopeThin size={22} />
                        <h2>Message</h2>
                    </Link>
                    <Link to="/" onClick={() => localStorage.clear()} className="group flex items-center text-sm gap-3.5 font-medium py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[16px] font-[Calibri] text-[#606060]">
                        <RiShutDownLine size={22} />
                        <h2>Logout</h2>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeListSidebar;
