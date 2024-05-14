
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoPersonOutline } from "react-icons/io5";

import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdPower } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
function TeamMemberDrodown() {
    return (
        <div className='ml-[800px] mt-[20px]'>
            <DropdownMenu>
                <DropdownMenuTrigger ><IoMdArrowDropdown /></DropdownMenuTrigger>
                <DropdownMenuContent  className="h-[283px]">
                    <DropdownMenuLabel className='w-[250px] h-[62px] bg-[#00778B] rounded-sm'> 
                    <div className="flex">
                        <img src="/public/assets/img/face4.jpg" alt="Employee Name" className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px] border-[2px]" />
                        <div className="flex flex-col">
                            <span className="text-[16px]  text-[#FFFFFF]">Evergrow Green</span>
                            <span className="text-[12px] font-sans text-[#FFFFFF]  ">Team Member</span>

                        </div>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem className='w-[250px] h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px]'> <IoPersonOutline className="h-[22px] w-[22px]"/><span className="ml-[10px]">Profile Setting</span></DropdownMenuItem>
                    <DropdownMenuItem className='w-[250px] h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px]'><HiAdjustmentsHorizontal className="h-[22px] w-[23.4px]"/> <span className="ml-[10px]">Account Settings</span> </DropdownMenuItem>
                    <DropdownMenuItem className='w-[250px] h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px]'><IoMdNotificationsOutline className="h-[22px] w-[23.4px]"/> <span className="ml-[10px]">Notification Settings</span> </DropdownMenuItem>
                    <DropdownMenuItem className='w-[250px] h-[42px] text-[#000000] text-[16px] bg-[#FFFFFF] mt-[10px]'><IoMdPower className="h-[22px] w-[19.4px]" /> <span className="ml-[10px]">Logout</span> </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default TeamMemberDrodown
 

