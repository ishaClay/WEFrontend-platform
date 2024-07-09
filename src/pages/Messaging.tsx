import { MdOutlineAttachFile } from "react-icons/md";
import { TbPhoto } from "react-icons/tb";
import { ScrollArea } from "@/components/ui/scroll-area"
import { BsPencilFill } from "react-icons/bs";
import { BsSearch } from 'react-icons/bs';

function Messaging() {
    return (
        <div className="flex h-full gap-4 bg-[#f5f3ff]">
            <div className="bg-[#FFFFFF] rounded-b-2xl overflow-hidden pb-2">
                <div className=" bg-[#FFFFFF] border-b rounded-t-[10px] ">
                    <div className="p-2">
                        <div className="relative ">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D9D9D9] w-full placeholder-[#D9D9D9]"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <BsSearch className="text-[#D9D9D9]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[calc(100%-59px)] overflow-hidden">
                    <ScrollArea className="h-full">
                        {
                            Array?.from({ length: 10 })?.map((_, index) => {
                                return <div key={index} className="h-[90px] bg-[#FFFFFF] hover:bg-[#EDEFF9] hover:text-black  p-2 px-3 cursor-pointer">
                                <div className="flex ">
                                    <div><div className=" h-[42px] w-[43px] rounded-full bg-[#0E9CFF] flex items-center justify-center mr-4 mt-2 text-[white]" >LR</div></div>
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="text-[16px] font-semibold">Honey Risher</div>
                                            <div className="text-gray-600 text-xs">11:57 AM</div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="text-xs text-[#A3A3A3]">company</div>
                                            <div className="text-sm overflow-hidden w-[226px] whitespace-nowrap overflow-ellipsis mt-1">Inquiry Subject Sample — Regarding Inquiry Subject Sample</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            })
                        }
                    </ScrollArea>
                </div>
            </div>

            <div className="bg-[#FFFFFF] rounded-b-2xl overflow-hidden w-[calc(100%_-323px)]">
                <div className="flex px-4 border-b justify-between">
                    <div className="flex">
                        <div>
                            <div className=" h-[42px] w-[43px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-[white]" >
                                LR
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="text-[14px] font-semibold mt-3">Honey Risher</div>
                            <div className="text-[#A3A3A3] text-xs ">company</div>
                        </div>
                    </div>
                    <button className="flex items-center bg-[#00778B] text-white px-4 py-2 rounded  h-[37px] mt-[13px]">
                        <BsPencilFill className="mr-1" /> Compose
                    </button>
                </div>


                <div className="h-[calc(100%-60px)]">
                    <ScrollArea className="w-full rounded-md h-[calc(100%-206px)] p-4">
                        <div className="h-[200px] w-full  pl-2">
                            <div className="flex pt-8">
                                <div><div className=" h-[32px] w-[32px] rounded-full bg-[#0077A2] flex items-center justify-center mr-4 mt-2 text-[white]" >LR</div></div>
                                <div className="flex flex-col ">
                                    <div className="text-[16px] font-semibold">Honey Risher</div>
                                    <div className="text-gray-600 text-xs">11:57 AM</div>
                                </div>
                            </div>

                            <div className="h-[160px] ml-12 mt-2 bg-[#FFFFFF]">
                                <div className="h-[100px] ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                                <div className="flex items-center">
                                    <div className="border-t border-[#D9D9D9] flex-grow "></div>

                                    <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[170px] w-full  pl-2">
                            <div className="flex ">
                                <div><div className=" h-[32px] w-[32px] rounded-full bg-[#4285F4] flex items-center justify-center mr-4 mt-2 text-[white]" >EV</div></div>
                                <div className="flex flex-col ">
                                    <div className="text-[16px] font-semibold">Honey Risher</div>
                                    <div className="text-gray-600 text-xs">11:55 AM</div>
                                </div>
                            </div>

                            <div className="h-[160px] ml-12 mt-2 bg-[#FFFFFF]">
                                <div className="h-[100px] text-[16px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                                <div className="flex items-center">
                                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                    <div className="mx-4 text-[#D9D9D9]">22 March 2024</div>
                                    <div className="border-t border-[#D9D9D9] flex-grow"></div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <div className="mx-4">
                        <textarea
                            id="description"
                            className="border border-[#D9D9D9] rounded-lg px-3 py-2 w-full placeholder-[#D9D9D9]"
                            placeholder="Enter message"
                            rows={4}
                        />
                    </div>
                    <div className="flex items-center justify-between bg-[#FFFFFF] mr-[18px] py-2">
                        <div className="flex items-center">
                            <div className="  flex items-center justify-center h-16 w-16 "><TbPhoto size={30} /></div>
                            <div className="  flex items-center justify-center h-16 w-16 "><MdOutlineAttachFile size={30} /></div>

                        </div>
                        <button className="bg-[#58BA66] text-[#FFFFFF] px-6 py-3 rounded-md border border-[#58BA66]">SEND</button>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default Messaging;
