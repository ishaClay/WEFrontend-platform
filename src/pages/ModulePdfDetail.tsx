import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';
import { IoChevronDownSharp } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { LuMenuSquare } from "react-icons/lu";
import { FaFolderOpen, FaSave, FaPrint } from 'react-icons/fa';
import { PiBinocularsFill } from "react-icons/pi";
import { PiArrowCircleDownFill } from "react-icons/pi";
import { PiArrowCircleUpFill } from "react-icons/pi";
import { MdZoomIn } from "react-icons/md";
import { MdZoomOut } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function ModulePdfDetail() {

    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    }

    const handleIconClick = () => {
        setIsOpen(!isOpen);
    };

    const chapters = [
        { name: 'Chapter 1 - Intro', status: 'Started', isActive: true },
        { name: 'Chapter 2 - Required tools', status: 'Not Started', isActive: false },
        { name: 'Chapter 3 - jcdjxcdm', status: 'Not Started', isActive: false }
    ];

    return (

        <div className="flex bg-[#EDEFF9] w-[1510px] h-[3030px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[3030px] mt-[20px] ml-[20px] rounded-t-[10px]  ">
                <div className="p-4">
                    <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-[2px] ">

                        <span className="text-[24px] font-semibold">My Courses<span className="text-[24px] font-semibold text-[#00778B]"> / Social</span></span>

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
                <div className="ml-6">
                    <h1 className="text-[28px] font-semibold">Wind energy basic course</h1>
                </div>

                {/* tab */}

                <div className="mt-4">
                    <div className="flex justify-between border-b">
                        <div>
                            <button
                                className={`py-2 px-4 text-[16px]  text-center  border-b-2 
                                   ${activeTab === 'tab1' ? 'border-[#00778B] text-[#00778B]' : 'border-transparent'}  focus:outline-none`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Information
                            </button>
                            <button
                                className={`py-2 px-4 text-[16px]  text-center  border-b-2 ml-4
                                  ${activeTab === 'tab2' ? 'border-[#00778B] text-[#00778B]' : 'border-transparent'} focus:outline-none`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                Module
                            </button>
                        </div>
                        <button
                            className="flex items-center justify-center py-2 px-4 text-[16px] text-center  border-b-2 mr-6
                                       border-[#00778B] text-[#00778B] focus:outline-none">
                            Modules Completed - 1/5
                            <IoChevronDownSharp className="ml-2 cursor-pointer" onClick={handleIconClick} />
                        </button>
                        {isOpen && (
                            <div className="absolute bg-white border rounded-lg ml-[970px] mt-[44px] shadow-sm w-[240px] h-[200px]">
                                <div className="relative">
                                    {chapters.map((chapter, index) => (
                                        <div key={index} className="flex items-center ">
                                            <div className="relative">

                                                {index !== chapters.length - 1 && (
                                                    <div className="absolute top-9 -translate-y-3 left-7 w-0.5 h-8 bg-[#D9D9D9]"></div>
                                                )}
                                                <div className={`ml-4 w-6 h-6 rounded-full ${chapter.isActive ? 'bg-white h-2 w-2 border-2 border-[#017285]' : 'bg-white'} border-2 border-[#D9D9D9] flex items-center justify-center`}>
                                                    {chapter.isActive && <div className="w-3 h-3 bg-[#017285] rounded-full"></div>}
                                                </div>
                                            </div>
                                            <div className="ml-4 mt-3">
                                                <h3 className="text-[14px] text-[#000000]">{chapter.name}</h3>
                                                <p className="text-[14px] text-[#606060]">{chapter.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="">
                        {activeTab === 'tab1' &&


                            <p>A</p>


                        }
                        {activeTab === 'tab2' &&

                            <div className="">
                                <div>
                                    <button className="bg-[#05668A] w-[1205px] h-[65px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4 ">
                                        Doug's Story 3.pdf
                                    </button>
                                </div>
                                <div className="flex border-b-2 border-[#D2D2D2] h-[81px] w-[1205px] bg-[#FAFAFA] ml-4 ">

                                    <div className="flex gap-6 ml-4 border-r-2 border-[#D2D2D2] w-[150px] h-[81px]  ">
                                        <button className="flex flex-col items-center border-none cursor-pointer mt-4 ">
                                            <div className="flex items-center ">
                                                <FaFolderOpen className="h-[16px] w-[19px] text-[#545454]" />
                                            </div>
                                            <span className="text-[10px] text-[#545454]">Open</span>
                                        </button>
                                        <div>
                                            <button className="  flex flex-col items-center  border-none  cursor-pointer mt-4 ">
                                                <div className="flex items-center ">
                                                    <FaSave className="h-[16px] w-[19px] text-[#545454]" />
                                                </div>
                                                <span className="text-[10px] text-[#545454]">Save As</span>
                                            </button>
                                            <span className="text-sm text-gray-800 mt-2 ml-2 text-[12px]">File</span>
                                        </div>
                                        <button className="flex flex-col items-center border-none  cursor-pointer mt-4 ">
                                            <div className="flex items-center ">
                                                <FaPrint className="h-[16px] w-[19px] text-[#545454]" />
                                            </div>
                                            <span className="text-[10px] text-[#545454]">Print</span>
                                        </button>

                                    </div>

                                    <div className=" ml-2 border-r-2 border-[#D2D2D2] w-[50px]">
                                        <button className="  flex flex-col items-center  border-none  cursor-pointer mt-4 ">
                                            <div className="flex items-center ml-3 ">
                                                <PiBinocularsFill className="h-[16px] w-[19px] text-[#545454]" />

                                            </div>
                                            <span className="text-[10px] ml-3 text-[#545454]">Find</span>
                                        </button>
                                        <span className="text-sm text-gray-800 mt-2 ml-2 text-[12px]">Find</span>
                                    </div>

                                    <div className="flex gap-4 border-r-2 border-[#D2D2D2] w-[200px] ">

                                        <button className="flex flex-col items-center border-none cursor-pointer mt-4 ml-2 ">
                                            <div className="flex items-center ">
                                                <PiArrowCircleDownFill className="h-[26px] w-[26px] text-[#A9A8A8]" />
                                            </div>
                                            <span className="text-[10px] text-[#A9A8A8]">Previous</span>
                                        </button>
                                        <button className="flex flex-col items-center border-none cursor-pointer mt-4 ">
                                            <div className="flex items-center ">
                                                <PiArrowCircleUpFill className="h-[26px] w-[26px] text-[#009E23]" />
                                            </div>
                                            <span className="text-[10px] text-[#545454]">Next</span>
                                        </button>
                                        <div className="mt-4 flex flex-col items-end">
                                            <input
                                                type="text"
                                                className="border-2 border-[#A0A0A0] bg-white rounded text-center w-[73px] h-[35px] py-1"
                                                value="1"
                                                readOnly
                                            />
                                            <span className=" mr-6 text-[12px]">of 14</span>
                                        </div>

                                    </div>
                                    <div className="border-r-2 border-[#D2D2D2] w-[180px] ">
                                        <div className="flex justify-center items-center gap-6  mt-4">
                                            <div className="flex flex-col items-center cursor-pointer" >
                                                <div className="w-[20px] h-[20px] flex justify-center items-center ">
                                                    <MdZoomIn className="text-gray-700 text-xl" />
                                                </div>
                                                <p className="text-[10px] ">Zoom Out</p>
                                            </div>
                                            <div className="flex flex-col items-center cursor-pointer" >
                                                <div className="w-[20px] h-[20px] flex justify-center items-center ">
                                                    <MdZoomOut className="text-gray-700 text-xl" />
                                                </div>
                                                <p className="text-[10px]">Zoom In</p>
                                            </div>

                                        </div>

                                        <p className="text-[12px] text-[#000000] ml-[70px] mt-2">Zoom In</p>

                                    </div>

                                </div>
                                <div className="flex">
                                    <div className="">
                                        <div className="flex  ml-4 h-[40px] w-[250px]  bg-[#FAFAFA] border-b-2 border-r-2 border-[#D2D2D2]">

                                            <button className="focus:outline-none ml-16">
                                                <LuMenuSquare className="h-6 w-6" />
                                            </button>
                                            <button className="focus:outline-none ml-[80px] border-b-2 border-[#000000]">
                                                <RiGalleryLine className="h-6 w-6" />
                                            </button>
                                        </div>
                                        <div className="flex  ml-4 h-[2550px] w-[250px]  bg-[#FAFAFA]">

                                            <div className="mt-6 ml-12">
                                                <div>
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#000000]"
                                                    />
                                                    <p className="ml-[70px]">1</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                            
                                                    />
                                                    <p className="ml-[70px]">2</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">3</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">4</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">5</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">6</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">7</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">8</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">9</p>
                                                </div>
                                                <div className="mt-4">
                                                    <img
                                                        src="/public/assets/img/feedback.png"
                                                        alt="Emilia Anderson"
                                                        className="h-[201px] w-[156px] border-2 border-[#A6A6A6]"
                                                    />
                                                    <p className="ml-[70px]">10</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=" bg-[#F5F5F5] w-[955px] h-[2590px]">
                                        <div className="mt-8 ml-2">
                                            <button className="bg-[#05668A] w-[910px] h-[51px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4 ">
                                                Doug's Story 3.pdf
                                            </button>
                                        </div>
                                        <div className=" ml-6 w-[910px] h-[1200px] bg-[#FFFFFF]">

                                            <div>
                                                <div className="p-8">
                                                    <h1 className="text-2xl font-bold mb-4">Course Syllabus</h1>

                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Course Description</h2>
                                                    <p className="mb-4 text-[15.5px]">
                                                        In today’s world, there is no shortage of data. But the quantity of information
                                                        means nothing without the ability to understand it.
                                                    </p>
                                                    <p className="mb-4 text-[15.5px]">
                                                        This course covers basic statistical concepts and methods that are essential
                                                        for learning from data and communicating insights. By the end of the course,
                                                        you will be able to perform exploratory data analysis, understand the key principles
                                                        of sampling, and select appropriate tests of significance for multiple contexts.
                                                        You will gain the foundational skills that prepare you to pursue more advanced topics in statistical thinking,
                                                        statistical programming, machinelearning and more.
                                                    </p>
                                                    <p className="mb-4 text-[15.5px]">
                                                        This course will be delivered using the Coursera platform.
                                                    </p>


                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Instructors</h2>
                                                    <p className="">Guenther Walther,</p>
                                                    <p className="">PhD Professor of Statistics,</p>
                                                    <p className="">Stanford University</p>

                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Course Topics</h2>
                                                    <ul className="list-disc pl-6 mb-4 text-[15.5px] w-[800px]">
                                                        <li className="mt-2"><span className="font-semibold">Module 1 – Introduction and Descriptive Statistics for Exploring Data </span>
                                                            This module provides an overview of the course and a review of the main tools used in descriptive statistics to visualize information.
                                                        </li>
                                                        <li className="mt-2"><span className="font-semibold"> Module 2 – Producing Data and Sampling </span>
                                                            In this module, you will look at the main concepts for sampling and designing experiments.
                                                            You will learn about curious pitfalls and how to evaluate the effectiveness of such experiments.
                                                        </li>
                                                        <li className="mt-2"><span className="font-semibold">Module 3 – Probability </span>
                                                            In this module, you will learn about the definition of probability and the essential rules
                                                            of probability that you will need for solving both simple and complex challenges.
                                                            You will also learn about examples of how simple rules of probability are used to create solutions for real-life, complex situations. </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 4 – Normal Approximation and Binomial Distribution </span>
                                                            This module covers the empirical rule and normal approximation for data, a technique that is used in many statistical procedures.
                                                            You will also learn about the binomial distribution and the basics of random variables.

                                                        </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 5 – Sampling Distributions and the Central Limit Theorem </span>In this module, you will learn about the Law of Large Numbers and the Central Limit Theorem.
                                                            In this module, you will learn about the Law of Large Numbers and the Central Limit Theorem.
                                                            You will also learn how to differentiate between the different types of histograms present in statistical analysis.</li>
                                                        <li className="mt-2"><span className="font-semibold">Module 6 – Regression </span> This module covers regression, arguably the most important statistical technique based on its versatility to solve different types of statistical problems.
                                                            You will learn about inference, regression, and how to do regression diagnostics.

                                                        </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 7 – Confidence Intervals</span> In this module, you will learn how to construct and interpret confidence intervals in standard situations.</li>
                                                    </ul>

                                                    <h2 className="text-xl font-semibold mt-2 mb-2">Course Requirements</h2>
                                                    <p className="mb-4 text-[15.5px]">
                                                        Please watch all coursevideos and complete all course exercises that can be found throughout the course in each module.
                                                        In order to get a certificate, you will need to successfuly complete and pass 80 % of the quizzes. Each quiz question counts equally towards your completion.
                                                    </p>
                                                    <p className="text-[12px] ml-[800px] mt-[20px]">Page l 1</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-8 ml-2">
                                            <button className="bg-[#42A7C3] w-[910px] h-[51px] text-white font-bold rounded flex justify-start items-center px-4 mt-4 ml-4 ">
                                                Doug's Story 3.pdf
                                            </button>
                                        </div>
                                        <div className=" ml-6 w-[910px] h-[1200px] bg-[#FFFFFF]">

                                            <div>
                                                <div className="p-8">
                                                    <h1 className="text-2xl font-bold mb-4">Course Syllabus</h1>

                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Course Description</h2>
                                                    <p className="mb-4 text-[15.5px]">
                                                        In today’s world, there is no shortage of data. But the quantity of information
                                                        means nothing without the ability to understand it.
                                                    </p>
                                                    <p className="mb-4 text-[15.5px]">
                                                        This course covers basic statistical concepts and methods that are essential
                                                        for learning from data and communicating insights. By the end of the course,
                                                        you will be able to perform exploratory data analysis, understand the key principles
                                                        of sampling, and select appropriate tests of significance for multiple contexts.
                                                        You will gain the foundational skills that prepare you to pursue more advanced topics in statistical thinking,
                                                        statistical programming, machinelearning and more.
                                                    </p>
                                                    <p className="mb-4 text-[15.5px]">
                                                        This course will be delivered using the Coursera platform.
                                                    </p>


                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Instructors</h2>
                                                    <p className="">Guenther Walther,</p>
                                                    <p className="">PhD Professor of Statistics,</p>
                                                    <p className="">Stanford University</p>

                                                    <h2 className="text-xl font-semibold mt-6 mb-2">Course Topics</h2>
                                                    <ul className="list-disc pl-6 mb-4 text-[15.5px] w-[800px]">
                                                        <li className="mt-2"><span className="font-semibold">Module 1 – Introduction and Descriptive Statistics for Exploring Data </span>
                                                            This module provides an overview of the course and a review of the main tools used in descriptive statistics to visualize information.
                                                        </li>
                                                        <li className="mt-2"><span className="font-semibold"> Module 2 – Producing Data and Sampling </span>
                                                            In this module, you will look at the main concepts for sampling and designing experiments.
                                                            You will learn about curious pitfalls and how to evaluate the effectiveness of such experiments.
                                                        </li>
                                                        <li className="mt-2"><span className="font-semibold">Module 3 – Probability </span>
                                                            In this module, you will learn about the definition of probability and the essential
                                                            rules of probability that you will need for solving both simple and complex challenges.
                                                            You will also learn about examples of how simple rules of probability are used to create solutions for real-life, complex situations.
                                                        </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 4 – Normal Approximation and Binomial Distribution </span>
                                                            This module covers the empirical rule and normal approximation for data, a technique that is used in many statistical procedures.
                                                            You will also learn about the binomial distribution and the basics of random variables.

                                                        </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 5 – Sampling Distributions and the Central Limit Theorem </span>In this module, you will learn about the Law of Large Numbers and the Central Limit Theorem.
                                                            In this module, you will learn about the Law of Large Numbers and the Central Limit Theorem. You will also learn how to differentiate between the different types of histograms present in statistical analysis.
                                                        </li>
                                                        <li className="mt-2"><span className="font-semibold">Module 6 – Regression </span> This module covers regression, arguably the most important statistical technique based on its versatility to solve different
                                                            types of statistical problems. You will learn about inference, regression, and how to do regression diagnostics.

                                                        </li>
                                                        <li className="mt-2"> <span className="font-semibold">Module 7 – Confidence Intervals</span> In this module, you will learn how to construct and interpret confidence intervals in standard situations.
                                                        </li>
                                                    </ul>

                                                    <h2 className="text-xl font-semibold mt-2 mb-2">Course Requirements</h2>
                                                    <p className="mb-4 text-[15.5px]">
                                                        Please watch all coursevideos and complete all course exercises that can be found throughout the course in each module. In order to get a certificate, you will need to successfuly complete and pass 80 % of the quizzes. Each quiz question counts equally towards your completion.
                                                    </p>
                                                    <p className="text-[12px] ml-[800px] mt-[20px]">Page l 2</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="mt-4 ml-[600px]">
                                    <button className="bg-[#00778B] text-white font-semibold py-2 px-4 rounded-lg  ">
                                        Mark as Complete
                                    </button>
                                </div>
                                <div className=" absolute right-0 top-[2960px] bottom-0 left-[1165px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                                    <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                                    <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                        <span className="text-gray-900 font-semibold">Messaging</span>
                                    </div>
                                    < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                                </div>
                                
                            </div>

                        }

                    </div>
                </div>

            </div>

        </div>



    )
}

export default ModulePdfDetail