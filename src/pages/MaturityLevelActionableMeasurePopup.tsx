
function MaturityLevelActionableMeasurePopup() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">

            <div className="bg-white rounded-lg p-6 h-[540px] w-[812px]">
                <div className="flex  mb-4">
                    <div className=" ml-4 mt-0 bg-white rounded-full drop-shadow-md w-17 h-17 p-2 mb-2">
                        <img src="/public/assets/img/Tree Planting.png" alt="Leaf Icon" />
                    </div>
                    <div className="ml-6 mt-6 h-[22px] w-[800px]">
                        <h2 className=" text-xm font-semibold text-[#1D2026]">Have you identified actionable items on provided measures?</h2>
                    </div>
                    <div className="ml-8">
                        <button className="text-[#1D2026] hover:text-red-500">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>

                </div>


                <div className="flex flex-col space-y-4 ">
                    <div className="text-[#1D2026] font-Calibri font-bold ml-4">Environmental</div>


                    <div className="flex  h-full w-full mt-2">


                        <div className="ml-4 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                            <div className="w-full h-74 border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                    <div className="ml-6  text-[#1D2026] font-calibri font-bold">Measures</div>
                                    <div className="p-4">
                                        <ul className="list-disc list-inside text-xs font-bold font-calibri">
                                            <li>Enhance and execute your Net Zero strategy with clear goals  and comprehensive actions.</li>
                                            <li>Lead in energy efficiency through continuous optimization and strategic energy management.</li>
                                            <li>Achieve sustainability leadership by fully embracing and expanding renewable energy use.</li>
                                            <li>Optimize transportation and logistics for minimal environmental impact through advanced strategies and technologies.</li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="ml-6 h-[297px] w-[350px] border border-solid border-[#D9D9D9] rounded">
                            <div className="w-full h-74 border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                                <div className="pb-2 pt-2 h-[42px] w-[350px]">
                                    <div className="ml-6  text-[#1D2026] font-calibri font-bold">Enter initiatives or action items</div>

                                    <div className="p-4">
                                        <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                                            <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">
                                                <input
                                                    type="text"
                                                    placeholder="Action item 1"
                                                    className="flex-1 border-none outline-none pl-2 pt-2"
                                                />
                                            </div>
                                            <button className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2">✎</button>
                                            <button className="border-none bg-transparent text-lg cursor-pointer  mt-2">🗑</button>

                                        </div>
                                    </div>


                                    <div className="pl-4 ">
                                        <div className="flex  p-2 w-[322px] h-[42px] mt-2">
                                            <div className="flex-1 border border-[#EBEAEA] rounded w-[280px] h-[42px] mb-2">

                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    className="flex-1 border-none outline-none pl-2 pt-2"
                                                />
                                            </div>
                                            <button className="border-none bg-transparent text-lg cursor-pointer mr-[0px] ml-2 mt-2">✎</button>
                                            <button className="border-none bg-transparent text-lg cursor-pointer  mt-2">🗑</button>

                                        </div>
                                    </div>


                                    <div className="flex items-center justify-center w-4 h-4 border border-black bg-black ml-[315px] mt-8">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="flex">
                        <button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm w-[119px] h-[48px] ml-[482px] ">Save</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm w-[119px] h-[48px] ml-[20px]">Close</button>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default MaturityLevelActionableMeasurePopup