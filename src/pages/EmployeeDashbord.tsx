import EmployeeSidebar from "@/components/EmployeeSidebar"
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDownSLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Doughnut } from 'react-chartjs-2';
import { FaArrowRightLong } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
function EmployeeDashbord() {

    const data = {
        labels: ['Introductory', 'Intermediate', 'Advanced',],
        datasets: [{
            label: 'Poll',
            data: [100],
            backgroundColor: ['#FFD56A', 'green', 'red'],
            borderColor: ['#FFD56A', 'green', 'red',],

        }]
    };


    const textCenter = {
        id: 'textCenter',
        beforeDatasetDraw(chart: any) {
            const { ctx, data } = chart;
            ctx.save();
            ctx.font = 'bold 25px sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${data.datasets[0].data[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
            ctx.restore();
        }
    };
    const options = {
        cutout: '80%',
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(context.parsed * 100) + '%';
                        return label;
                    }
                }
            }
        }
    };

    const Labels = () => (
        <div className="absolute left-0 top-0 flex justify-center h-full mt-[60px] gap-8">
            {data.labels.map((label, index) => {
                let colorClass, opacityClass;
                if (index === 0) {
                    colorClass = 'bg-gradient-to-r from-red-600 via-red-300 to-transparent';
                    opacityClass = 'bg-opacity-40';

                } else if (index === 1) {
                    colorClass = 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-transparent';
                    opacityClass = 'bg-opacity-50';

                } else {
                    colorClass = 'bg-gradient-to-r from-green-400 via-green-300 to-transparent';
                    opacityClass = 'bg-opacity-75';

                }
                return (
                    <div key={index} className="text-sm flex flex-col items-center relative  mt-10 h-6">
                        <div className={`absolute left-0 top-0 h-full w-2/6 ${colorClass} ${opacityClass} rounded-l-lg rounded-r-none `}></div>
                        <div className="ml-2 pl-2 rounded-r-lg">{label}</div>

                    </div>
                );
            })}

        </div>
    );


    return (
        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1330px]  overflow-hidden">

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

            <div className="bg-[#FFFFFF] w-[1230px] h-[1460px] mt-[20px] ml-[20px] rounded-t-[10px] p-4 ">

                <div className=" pb-4 w-[1195px] h-[50px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between shadow-sm ">


                    <span className="text-[24px] font-semibold">Dashboard</span>
                    <div className="flex items-center ">
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


                <div className="">
                    <div className="m-3">
                        <h3 className="max-w-[290.34px] text-[22px] font-bold leading-[29.3px]">
                            Our Maturity Level
                        </h3>
                        <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
                    </div>
                    <div className="flex">
                        <div>
                            <div className="w-[200px] h-[200px]  relative">
                                <Doughnut data={data} options={options} plugins={[textCenter]} />
                            </div>
                        </div>
                        <div className="  border border-solid border-[#D9D9D9] rounded-[10px] w-[940px] h-[206px] ml-[60px] shadow-sm">
                            <div className="relative ml-[65px] mt-[20px] ">
                                <Labels />
                            </div>
                            <div className="mt-[50px] ml-[30px]">

                                <p className="inline ml-[35px] ">Your overall sustainability level -</p>{" "}
                                <span className="font-poppins font-bold text-[#000000] leading-6">
                                    Intermediate
                                </span>

                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <p className="text-[16px] font-semibold mt-[10px]">My Action Items</p>
                </div>
                <div className="pt-2  flex gap-12">
                    <div className="border border-solid border-[#D9D9D9] w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/assigned.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                09
                            </span>
                            <h4 className="mb-1">Assigned</h4>
                        </div>
                    </div>

                    <div className="border border-solid border-[#D9D9D9] w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/open.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                04
                            </span>
                            <h4 className="mb-1">Open</h4>
                        </div>
                    </div>

                    <div className="border border-solid border-[#D9D9D9] w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/delayed.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                03
                            </span>
                            <h4 className="mb-1">Delayed</h4>
                        </div>
                    </div>

                    <div className="border border-solid border-[#D9D9D9] w-[268px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/completed.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                02
                            </span>
                            <h4 className="mb-1">Completed</h4>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="text-[16px] font-semibold mt-[10px]">My Courses</p>
                </div>
                <div className="pt-2  flex gap-12">
                    <div className="border border-solid border-[#D9D9D9] w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/total.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                09
                            </span>
                            <h4 className="mb-1">Open</h4>
                        </div>
                    </div>

                    <div className="border border-solid border-[#D9D9D9] w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/in-progress.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                04
                            </span>
                            <h4 className="mb-1">In Progress</h4>
                        </div>
                    </div>

                    <div className="border border-solid border-[#D9D9D9] w-[370px] h-[140px] rounded-[5.06px] flex items-center p-3 mt-[5px] shadow-sm">
                        <div className="w-[80px] h-[80px] mr-3 bg-[#F5F7FF] flex justify-center items-center rounded-full">

                            <img
                                src="/public/assets/img/copleted-course.png"
                                alt="img"
                                className="w-[23px] h-[25px]"

                            />
                        </div>
                        <div className="pl-[20px]">
                            <span className="text-[32px] leading-[39.06px] font-bold">
                                03
                            </span>
                            <h4 className="mb-1">Completed</h4>
                        </div>
                    </div>


                </div>

                <div className=" flex justify-between mt-[10px]">
                    <div>
                        <p className="text-[22px] font-semibold">Recent Courses</p>
                        <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
                    </div>
                    <div className="mt-[10px]">
                        <p className="text-[18px] text-[#00778B]">View all</p>
                    </div>

                </div>

                <div className="flex gap-4">
                    <div className="w-[590px] h-[240px] border rounded-[10px]  border-[#D9D9D9]  mt-4 shadow-sm">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[240px]  ">
                                <img className="w-[240px] h-[200px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[280px] gap-2 mt-4 ">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[16px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                <div className="text-[26px] text-[#00778B] font-bold">

                                    {30}%
                                </div>
                                <div className="w-[250px] h-[8px] bg-[#E8E8E8] rounded-lg">

                                    <div
                                        className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >

                                    </div>
                                </div>
                                <div className="text-[16px]">
                                    1 of 5 Completed
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="w-[590px] h-[240px] border rounded-[10px]  border-[#D9D9D9]  mt-4 shadow-sm">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[240px]  ">
                                <img className="w-[240px] h-[200px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                            </div>
                            <div className="flex flex-col w-[280px] gap-2 mt-4 ">
                                <div className="text-[16px]">
                                    Social | 5 modules
                                </div>
                                <h2 className="text-[16px] font-semibold">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</h2>
                                <div className="text-[26px] text-[#00778B] font-bold">

                                    {30}%
                                </div>
                                <div className="w-[250px] h-[8px] bg-[#E8E8E8] rounded-lg">

                                    <div
                                        className="h-[8px]  bg-[#00778B] text-white rounded-lg text-[10px] text-center"
                                        style={{ width: `${30}%` }}
                                    >

                                    </div>
                                </div>
                                <div className="text-[16px]">
                                    1 of 5 Completed
                                </div>
                            </div>
                        </div>

                    </div>



                </div>

                <div className=" flex justify-between mt-[10px]">
                    <div>
                        <p className="text-[22px] font-semibold">Upcoming live sessions</p>
                        <hr className="border-2 border-solid border-[#64A70B] w-[117px] mt-[15px] mb-[17px]" />
                    </div>
                    <div className="mt-[10px]">
                        <p className="text-[18px] text-[#00778B]">View all</p>
                    </div>

                </div>

                <div className="flex gap-5">

                    <div className="w-[385px] h-[150px] border rounded-[10px]  border-[#D9D9D9]  mt-4 shadow-sm">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[90px]  ">
                                <img className="w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                                <div>
                                    <button className=" mt-[10px] text-[#00778B] font-bold  rounded inline-flex items-center gap-2">
                                        <span>JOIN</span>
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col w-[280px] gap-2 mt-4 ">
                                <div className="text-[16px] text-[#1D2026] font-inter ">

                                    Live Session (session title)
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable...</h2>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center mt-2">
                                        <LuCalendarDays className="h-5 w-5 text-gray-900" />
                                        <span className="ml-2 text-sm font-medium text-gray-600">Date: 29th March, 2024</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                                        <span className="ml-2 text-sm font-medium text-gray-600">Time: 9:10AM to 12:15AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[385px] h-[150px] border rounded-[10px]  border-[#D9D9D9]  mt-4 shadow-sm">
                        <div className="flex">
                            <div className="overflow-hidden rounded m-5 w-[90px]  ">
                                <img className="w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                                    src="/public/assets/img/nature.png" alt="Course"
                                />
                                <div>
                                    <button className=" mt-[10px] text-[#00778B] font-bold  rounded inline-flex items-center gap-2">
                                        <span>JOIN</span>
                                        <FaArrowRightLong />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col w-[280px] gap-2 mt-4 ">
                                <div className="text-[16px] text-[#1D2026] font-inter ">

                                    Live Session (session title)
                                </div>
                                <h2 className="text-[14px] font-semibold">Certificate in the Sustainable...</h2>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center mt-2">
                                        <LuCalendarDays className="h-5 w-5 text-gray-900" />
                                        <span className="ml-2 text-sm font-medium text-gray-600">Date: 29th March, 2024</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                                        <span className="ml-2 text-sm font-medium text-gray-600">Time: 9:10AM to 12:15AM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">


                        <div className="absolute right-0 top-[105px] bottom-0 left-[65px] bg-white shadow-md rounded-lg p-2 flex items-center border border-[#D9D9D9] h-[70px] w-[332px]">
                            <img src="/public/assets/img/face1.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                            <div className="flex-grow ml-2 flex flex-col items-start justify-center">
                                <span className="text-gray-900 font-semibold">Messaging</span>
                            </div>
                            < MdKeyboardArrowUp className="h-5 w-5 text-gray-700" />
                        </div>

                        <div className="w-[385px] h-[150px] border rounded-[10px] border-[#D9D9D9] mt-4 shadow-sm">
                            <div className="flex">
                                <div className="overflow-hidden rounded m-5 w-[90px]">
                                    <img className="w-[80px] h-[80px] rounded-[10px] object-cover object-center"
                                        src="/public/assets/img/nature.png" alt="Course" />
                                    <div>
                                        <button className="mt-[10px] text-[#00778B] font-bold rounded inline-flex items-center gap-2">
                                            <span>JOIN</span>
                                            <FaArrowRightLong />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col w-[280px] gap-2 mt-4">
                                    <div className="text-[16px] text-[#1D2026] font-inter">
                                        Live Session (session title)
                                    </div>
                                    <h2 className="text-[14px] font-semibold">Certificate in the Sustainable...</h2>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center mt-2">
                                            <LuCalendarDays className="h-5 w-5 text-gray-900" />
                                            <span className="ml-2 text-sm font-medium text-gray-600">Date: 29th March, 2024</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MdOutlineWatchLater className="h-5 w-5 text-gray-900" />
                                            <span className="ml-2 text-sm font-medium text-gray-600">Time: 9:10AM to 12:15AM</span>
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

export default EmployeeDashbord