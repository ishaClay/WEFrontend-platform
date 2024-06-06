import { Card } from '@/components/ui/card';
import { IoCloseCircleOutline } from "react-icons/io5";

function MaturityAssessmentRoadmapActionView() {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="max-w-[800px] h-auto md:h-[410px] p-4">
                <div>
                    <div className='flex  md:flex-row w-full h-auto md:h-[30px] mt-4 md:mt-0'>
                        <div className='text-[16px] w-full md:w-[600px] font-semibold mt-2 md:mt-[10px] ml-0 md:ml-[25px]'>
                            Assigned Action Item Details
                        </div>
                        <div className=' mt-2 md:mt-0 flex justify-end md:ml-[140px]'>
                            <IoCloseCircleOutline className='h-[24px] w-[24px]' />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row'>
                        <div className='w-full md:w-[450px]'>
                            <div className='mt-4 md:mt-[30px] ml-0 md:ml-[26px]'>
                                <button className="bg-[#F63636] w-[52px] h-[28px] text-white rounded-full px-2 text-xs">Delay</button>
                            </div>
                            <div className='w-full md:w-[450px] text-[20px] font-semibold text-[#000000] ml-0 md:ml-[26px] mt-4 md:mt-[20px]'>
                                Lead in energy efficiency through continuous optimization and strategic energy management.
                            </div>
                            <div className="flex flex-col ml-0 md:ml-[26px] mt-4 md:mt-[20px] w-full md:w-[450px]">
                                <div className="flex mb-2">
                                    <span className="text-[#00000099]">Start date :</span>
                                    <span className='text-[#000000] ml-1'>2nd March, 2024</span>
                                </div>
                                <div className="flex mb-2">
                                    <span className="text-[#00000099]">End date :</span>
                                    <span className='text-[#000000] ml-1'>24th March, 2024</span>
                                </div>
                                <div className="flex mb-2">
                                    <span className="text-[#00000099]">Last updated by :</span>
                                    <span className='text-[#000000] ml-1'>SME Admin Name</span>
                                </div>
                                <div className="flex">
                                    <span className="text-[#00000099]">Last updated date :</span>
                                    <span className='text-[#000000] ml-1'>24th March, 2024</span>
                                </div>
                            </div>
                        </div>
                        <div className="container h-auto w-full md:w-[350px] mt-8 md:mt-4 flex flex-col items-center">
                            <div className="border-2 border-dashed border-[#D9D9D9] p-8 rounded-lg text-center w-full">
                                <input
                                    type="file"
                                    id="file"
                                    accept=".png, .jpg, .jpeg"
                                    className="hidden"
                                />
                                <label htmlFor="file" className="cursor-pointer">
                                    <div className="mb-4">
                                        <img src="/public/assets/img/drag-drop.png" className="h-12 w-12 mx-auto text-gray-400" />
                                    </div>
                                    <p className="text-[16px] text-[#9E9E9E]">Drag and drop evidence here</p>
                                </label>
                                <p className="text-[#9E9E9E] text-sm mt-4">-OR-</p>
                                <button className="bg-[#42A7C3] text-white font-semibold py-2 px-4 rounded mt-4">
                                    Upload Evidence
                                </button>
                            </div>
                            <button className="bg-[#58BA66] text-white h-[52px] md:w-[200px] py-2 px-4 rounded mt-4 md:ml-[85px]">
                                Mark As Completed
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default MaturityAssessmentRoadmapActionView;
