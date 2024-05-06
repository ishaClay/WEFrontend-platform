import TeaserScoreHeader from "@/components/TeaserScoreHeader"
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

function SavedAssesment() {

    const navigate = useNavigate();

    return (
        <div>
            <div>
                <div className=" border-b-[2px]  "  >
                    <TeaserScoreHeader />
                </div>
                <div className="flex">
                    <div className="mt-[20px] h-[1170px] bg-[#F6F6F6] ">


                        <img className="" src="../assets/img/Group 1000001826.png" />
                    </div>


                    <div className="w-[694px]">

                        <div className="w-[720px] h-[400px] relative mt-[142px] ml-[40px]">
                            <div className="flex items-center">
                                <h3 className="text-[Calibri] italic text-[#3A3A3A] font-bold">Welcome Back to Your Sustainability Journey!</h3>
                                <img
                                    className="ml-auto mr-[300px] mb-[]"
                                    src="../assets/img/pngwing 25.png"
                                    alt="Your Image Alt Text"
                                />

                            </div>
                            <div className=" w-[430px] ">
                                <img src="../assets/img/Line 23.png" />
                            </div>

                            <p className="text-[Calibri]">

                                Great to see you back! You've already set sail on the journey towards a sustainable future.
                            </p>
                            <p className="mt-[20px]">
                                Let's continue navigating your Green Compass. We've plotted your progress so far, and now it's time to complete the remaining questions under each sustainability pillar
                            </p>
                            <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[50px] text-[24px]">  What to Expect:</p>
                            <div className="w-[330px] mt-[15px]">
                                <div className="flex items-center">
                                    <img className="h-[25px] w-[25px]" src="../assets/img/saved.png" />
                                    <span className="ml-1">Complete the assessment with precision.</span>
                                </div>
                                <div className="flex items-center">
                                    <img className="h-[25px] w-[25px]" src="../assets/img/saved.png" />
                                    <span className="ml-1 mt-[25px]">Refine your green practices based on your initial responses.</span>
                                </div>
                                <div className="flex items-center">
                                    <img className="h-[25px] w-[25px]" src="../assets/img/saved.png" />
                                    <span className="ml-1 mt-[25px]">Uncover insights that will guide your company's sustainability strategy.</span>
                                </div>
                            </div>
                            <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[15px] text-[24px]">Your Progress So Far:</p>
                            <div className="pt-8 pl-[px] pb-5 flex gap-5">
                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/EnvironmentalGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Environmental</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        100%
                                    </span>
                                </div>

                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/SocialGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Social</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        20%
                                    </span>
                                </div>

                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/EconomicsGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Economics</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        40%
                                    </span>
                                </div>


                            </div>

                            <div className="pt-2 pl-[px] pb-5 flex gap-5">
                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/GovernanceGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Governance</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        60%
                                    </span>
                                </div>

                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/Tech&InnovationGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Tech & Innovation</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        80%
                                    </span>
                                </div>

                                <div className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col items-center p-3">

                                    <img
                                        src="../assets/img/StrategicIntegrationGray.png"
                                        alt="img"
                                        className="w-[52px] h-[52px]"
                                    />
                                    <h4 className="mt-3">Strategic Integration</h4>
                                    <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold">
                                        100%
                                    </span>
                                </div>


                            </div>
                            <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[15px] text-[24px]">Complete the Assessment and Reap the Benefits</p>
                            <p> Every question answered propels you closer to a sustainable and successful voyage. Don't miss the chance to refine your course and make a positive impact. Your sustainable map awaits completion!</p>
                            <Button onClick={() => navigate("/question")} className="bg-[#64A70B] text-[20pxpx] leading-5 w-[180px] mt-[20px]">
                                Continue Assessment
                            </Button>
                        </div>

                    </div>


                </div>


            </div>
            
            <Footer />
            
        </div>

    )
}

export default SavedAssesment; 