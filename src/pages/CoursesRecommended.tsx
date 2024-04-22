
import HeaderCourse from "@/components/HeaderCourse"

import { BsSearch } from 'react-icons/bs';
import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import { FaStar } from 'react-icons/fa';
import EmployeeListSidebar from "@/components/EmployeeListSidebar";


function CoursesRecommended() {

    return (
        <div className="flex bg-[#f5f3ff] w-[1510px] h-[1608px] gap-1 overflow-x-hidden">
            <div className=" w-[235px] h-[1608px]">
                <EmployeeListSidebar/>
            </div>
            <div className="flex flex-col">
                <div className="w-[1204px] h-[120px] ">
                    <HeaderCourse />
                </div>

                <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-t-[10px]">
                    <div className=" pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
                        <p className="text-[#000000] text-[Calibri]">Recommended Courses</p>

                    </div>



                    <div className="flex pl-[13px] w-[1250px] h-[70px] bg-[#FFFFFF] ">
                        <div>
                            <div className="flex mt-[9px] ml-0 items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[550px] h-[52px] text-[#A3A3A3]">

                                <BsSearch className="text-[#D9D9D9] mr-2" />

                                <input
                                    type="text"
                                    placeholder="Search by pilier, level, recommended, course name etc."
                                    className="flex-1 mr-2 focus:outline-none placeholder-[#A3A3A3] text-sm"
                                />

                            </div>
                        </div>


                        <div className="flex mt-4  ml-[580px] gap-2">

                            <AiOutlineAppstore className="text-[#A3A3A3] w-8 h-8" />

                            <AiOutlineBars className="text-[#00778B] w-8 h-8   " />
                        </div>


                    </div>





                    <div>
                        <div className="w-[1226px] h-[175px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

                            <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
                            </div>



                            <div className="flex flex-col mt-[22px] ml-[22px] ">
                                <div>
                                    <div className="flex items-center  ">
                                        <FaStar className="text-yellow-500" />
                                        <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                                        <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">Technology & Innovation</span>
                                        <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">Social</span>
                                    </div>
                                </div>




                                <div className="flex ">
                                    <div className="h-[44px] w-[378.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                                        <p>Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                                    </div>

                                    <div className="ml-[200px]">
                                        <img className=" h-[48px] w-[162.74px] object-cover object-center" src="/public/assets/img/atu.png" alt="Course" />
                                    </div>
                                </div>


                                <div className="flex mt-[25px]  ">
                                    <div className="h-[22px] w-[129px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                                        <p className="text-xs">Level- Advanced</p>
                                    </div>

                                    <div className="h-[22px] w-[160px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                                        <p className="text-xs">Post Graduate Diploma</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                        <p className="text-xs">Full Time</p>
                                    </div>
                                    <div className="h-[22px] w-[75px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                        <p className="text-xs">Online</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                        <p className="text-xs">2 Years</p>
                                    </div>
                                    <div className="h-[22px] w-[200px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                        <p className="text-xs">Atlantic Technological University</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="flex flex-col ">
                                    <div><h3 className="text-[#000000] text-[font-calibri-bold] ml-[97px] mt-[20px]">€50.00</h3></div>


                                    <button className=" h-[42px] w-[110px] bg-[#64A70B] text-white ml-[100px] mt-[20px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Enroll Now</button>
                                    <button className=" h-[42px] w-[110px] bg-[#00778B] text-white ml-[100px] mt-[7px] font-semibold px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Inquire</button>
                                </div>
                            </div>
                        </div>




                    </div>




                    <div>
                        <div className="w-[1226px] h-[175px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                            <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
                            </div>



                            <div className="flex flex-col mt-[22px] ml-[22px] ">
                                <div>
                                    <div className="flex items-center  ">
                                        <FaStar className="text-yellow-500" />
                                        <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                                        <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">Technology & Innovation</span>
                                        <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">Social</span>
                                    </div>
                                </div>




                                <div className="flex ">
                                    <div className="h-[44px] w-[378.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                                        <p>Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                                    </div>

                                    <div className="ml-[200px]">
                                        <img className=" h-[48px] w-[162.74px] object-cover object-center" src="/public/assets/img/atu.png" alt="Course" />
                                    </div>
                                </div>


                                <div className="flex mt-[25px]  ">
                                    <div className="h-[22px] w-[129px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                                        <p className="text-xs">Level- Advanced</p>
                                    </div>

                                    <div className="h-[22px] w-[160px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                                        <p className="text-xs">Post Graduate Diploma</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                        <p className="text-xs">Full Time</p>
                                    </div>
                                    <div className="h-[22px] w-[75px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                        <p className="text-xs">Online</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                        <p className="text-xs">2 Years</p>
                                    </div>
                                    <div className="h-[22px] w-[200px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                        <p className="text-xs">Atlantic Technological University</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="flex flex-col ">
                                    <div><h3 className="text-[#000000] text-[font-calibri-bold] ml-[97px] mt-[20px]">€50.00</h3></div>


                                    <button className=" h-[42px] w-[110px] bg-[#64A70B] text-white ml-[100px] mt-[20px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Enroll Now</button>
                                    <button className=" h-[42px] w-[110px] bg-[#00778B] text-white ml-[100px] mt-[7px] font-semibold px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Inquire</button>
                                </div>
                            </div>
                        </div>




                    </div>

                    <div>
                        <div className="w-[1226px] h-[175px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                            <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
                            </div>



                            <div className="flex flex-col mt-[22px] ml-[22px] ">
                                <div>
                                    <div className="flex items-center  ">
                                        <FaStar className="text-yellow-500" />
                                        <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                                        <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">Technology & Innovation</span>
                                        <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">Social</span>
                                    </div>
                                </div>




                                <div className="flex ">
                                    <div className="h-[44px] w-[378.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                                        <p>Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                                    </div>

                                    <div className="ml-[200px]">
                                        <img className=" h-[48px] w-[162.74px] object-cover object-center" src="/public/assets/img/atu.png" alt="Course" />
                                    </div>
                                </div>


                                <div className="flex mt-[25px]  ">
                                    <div className="h-[22px] w-[129px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                                        <p className="text-xs">Level- Advanced</p>
                                    </div>

                                    <div className="h-[22px] w-[160px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                                        <p className="text-xs">Post Graduate Diploma</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                        <p className="text-xs">Full Time</p>
                                    </div>
                                    <div className="h-[22px] w-[75px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                        <p className="text-xs">Online</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                        <p className="text-xs">2 Years</p>
                                    </div>
                                    <div className="h-[22px] w-[200px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                        <p className="text-xs">Atlantic Technological University</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="flex flex-col ">
                                    <div><h3 className="text-[#000000] text-[font-calibri-bold] ml-[97px] mt-[20px]">€50.00</h3></div>


                                    <button className=" h-[42px] w-[110px] bg-[#64A70B] text-white ml-[100px] mt-[20px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Enroll Now</button>
                                    <button className=" h-[42px] w-[110px] bg-[#00778B] text-white ml-[100px] mt-[7px] font-semibold px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Inquire</button>
                                </div>
                            </div>
                        </div>




                    </div>
                  

                    <div>
                        <div className="w-[1226px] h-[175px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">
                            <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
                            </div>



                            <div className="flex flex-col mt-[22px] ml-[22px] ">
                                <div>
                                    <div className="flex items-center  ">
                                        <FaStar className="text-yellow-500" />
                                        <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                                        <span className="bg-[#FFD56A] text-[#3A3A3A] font-semibold text-xs py-1 px-2 rounded-full">Technology & Innovation</span>
                                        <span className="bg-[#D6F5AC] text-[#000000] font-semibold text-xs py-1 px-2 rounded-full ml-2">Social</span>
                                    </div>
                                </div>




                                <div className="flex ">
                                    <div className="h-[44px] w-[378.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                                        <p>Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                                    </div>

                                    <div className="ml-[200px]">
                                        <img className=" h-[48px] w-[162.74px] object-cover object-center" src="/public/assets/img/atu.png" alt="Course" />
                                    </div>
                                </div>


                                <div className="flex mt-[25px]  ">
                                    <div className="h-[22px] w-[129px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                                        <p className="text-xs">Level- Advanced</p>
                                    </div>

                                    <div className="h-[22px] w-[160px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                                        <p className="text-xs">Post Graduate Diploma</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                                        <p className="text-xs">Full Time</p>
                                    </div>
                                    <div className="h-[22px] w-[75px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                                        <p className="text-xs">Online</p>
                                    </div>
                                    <div className="h-[22px] w-[80px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                                        <p className="text-xs">2 Years</p>
                                    </div>
                                    <div className="h-[22px] w-[200px] flex items-center gap-1">
                                        <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                                        <p className="text-xs">Atlantic Technological University</p>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="flex flex-col ">
                                    <div><h3 className="text-[#000000] text-[font-calibri-bold] ml-[97px] mt-[20px]">€50.00</h3></div>


                                    <button className=" h-[42px] w-[110px] bg-[#64A70B] text-white ml-[100px] mt-[20px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Enroll Now</button>
                                    <button className=" h-[42px] w-[110px] bg-[#00778B] text-white ml-[100px] mt-[7px] font-semibold px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">Inquire</button>
                                </div>
                            </div>
                        </div>




                    </div>




                </div>

            </div>



        </div>



    )
}

export default CoursesRecommended