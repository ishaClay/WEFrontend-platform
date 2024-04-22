


import { FaStar } from 'react-icons/fa';
import HeaderCourse from "@/components/HeaderCourse"

import { LuMoveLeft } from "react-icons/lu";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";


function IndividualEmployee() {


    return (
        <div className="flex bg-[#f5f3ff] w-[1510px] h-[1500px] gap-1 overflow-hidden">
            <div className=" w-[235px] h-[760px]">
                <EmployeeListSidebar />
            </div>
            <div className="flex flex-col">
                <div className="w-[1204px] h-[120px] ">
                    <HeaderCourse />
                </div>


                <div className="bg-[#FFFFFF] w-[1250px] h-[930px] m-[12px] rounded-t-[10px] ">
                    <div className="  w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] gap-[100px] flex rounded-t-[10px]  ">

                        <div className='h-38px w-[143px] bg-[#FFFFFF] ml-6'>
                            <div className="flex h-[38px] w-[143px]  mt-1">
                                <img src="/public/assets/img/face1.jpg" alt="Employee Name" className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px]" />
                                <div className="flex flex-col h-[38px] w-[143px]">
                                    <div className="text-[12px]  text-[#A3A3A3]">
                                        Team Member
                                    </div>
                                    <div className="text-[19px]  text-[#000000] h-[16px] w-[120px]">
                                        Ankites Risher
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className='h-38px w-[195px] bg-[#FFFFFF]'>
                            <div className="flex flex-col mt-1">
                                <span className="text-[12px]  text-[#A3A3A3] ">Email ID</span>

                                <span className="text-[15px] text-[#000000]  ">aniketrisher@example.com</span>
                            </div>

                        </div>
                        <div className='h-38px w-[122px] bg-[#FFFFFF]'>
                            <div className="flex flex-col mt-1 ">
                                <span className="text-[12px]  text-[#A3A3A3]">Contact Number</span>

                                <span className="text-[15px] text-[#000000]  ">+91 8459293138</span>
                            </div>

                        </div>
                        <div className='h-38px w-[90px] bg-[#FFFFFF]'>
                            <div className="flex flex-col mt-1">
                                <div className="flex mt-2 ml-2 ">

                                    <div className="bg-[#58BA66] text-xs text-white py-2 h-[32px] w-[80px] px-4 rounded-full mr-2 flex items-center justify-center">
                                        Active
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className='h-38px w-[90px] bg-[#FFFFFF] ml-[160px]'>
                            <div className="flex justify-between  mt-1 items-center mt-3">
                                <div className='ml-2 '>
                                    <LuMoveLeft className=" mb-[10px] " />
                                </div>
                                <div>
                                    <h1 className="text-black px-3 py-1 rounded h-[45px] w-[150px] font-bold ">Back</h1>
                                </div>

                            </div>

                        </div>






                    </div>

                    <div className='flex flex-col'>
                        <div className='flex ml-2 '>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>
                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>

                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>

                            </div>
                        </div>
                        <div className='flex ml-2'>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>
                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>
                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>

                            </div>
                        </div>
                        <div className='flex ml-2'>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>
                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>

                            </div>
                            <div><div className="w-[380px] h-[160px] border rounded-[10px]  border-[#D9D9D9] m-4 mt-4 shadow-sm">
                                <div className="flex items-center">
                                    <div className=" pl-4 overflow-hidden rounded mt-[10px]  ">
                                        <img className="w-[210px] h-[94px] rounded-[10px] object-cover object-center" src="/public/assets/img/nature.png" alt="Course" />
                                    </div>
                                    <div className="flex flex-col ">
                                        <div className="flex items-center space-x-1 ml-[10px] pt-[10px]">
                                            <FaStar className="text-[#FD8E1F] h-[14px] w-[13.5px]" />
                                            <span className="text-[#8C94A3] font-semibold text-[12px]">RECOMMENDED</span>
                                        </div>
                                        <h2 className="text-[12px] font-semibold ml-[10px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                        <div className="flex space-x-2 ml-[10px]   ">
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[15px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Social</span>
                                            </p>
                                            <p className=''>
                                                <img className="inline-block  w-[14px] h-[16px] " src="/public/assets/img/def.png" alt="Image Alt Text" />
                                                <span className='text-[12px]'> Technology & Innovation</span>

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-[319px] h-[16px] bg-[#E8E8E8] rounded-lg mt-[15px] ml-[15px]">

                                    <div
                                        className="h-4  bg-green-500 text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >
                                        {30}%
                                    </div>
                                </div>






                            </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>



    )
}

export default IndividualEmployee;