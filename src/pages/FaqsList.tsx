


import HeaderCourse from "@/components/HeaderCourse"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import FaqsListSidebar from "@/components/FaqsListSidebar";


function FaqsList() {


  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[730px] gap-1 overflow-x-hidden">
      <div className=" w-[235px] h-[730px]">
        <FaqsListSidebar />
      </div>
      <div className="flex flex-col  ">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1247px] h-[1460px] m-[12px] rounded-t-[10px]">
          <div className="  pt-[16px] pl-[30px] w-[1247px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px] flex items-center justify-between">
            <p className="text-[#000000] text-[Calibri] font-bold">FAQ’s</p>

          </div>




          <div className="mt-[10px]  ">
      <div className=" border-red-200 mr-[10px] ml-[10px] ">
        <div className=" flex justify-between p-4 border border-[#D9D9D9] ">

          <div className="font-bold">How to create an FAQ page</div>
          <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowDown className="  h-[16px] w-[16px]" />
              </div>
        </div>
        <div className="p-4 border-b border-l border-r border-[#D9D9D9]">
          <div className="font-semibold text-[15.7px]">If you want to make an FAQ section that resonates with your customers, don’t just slap some ordinary questions and answers on a site page. Carefully think about what questions to include, consider who will answer (and how), and offer next-step solutions for when FAQs aren’t enough. If you want to make an FAQ section that resonates with your customers, don’t just slap some ordinary questions and answers on a site page. Carefully think about what questions to include, consider who will answer (and how), and offer next-step solutions for when FAQs aren’t enough.</div>
          
        </div>
        <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
          <div className="font-bold">How to create an FAQ page</div>
           <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
         
        </div>
        <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
          <div className="font-bold">How to create an FAQ page</div>
          <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
          
        </div>
        <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
          <div className="font-bold">How to create an FAQ page</div>
          <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
        </div>
        <div className="flex justify-between p-4 border border-[#D9D9D9] mt-[10px]">
          <div className="font-bold">How to create an FAQ page</div>
          <div className=" text-6xl mt-[3px] ">
                <MdKeyboardArrowRight className="  h-[16px] w-[16px]" />
              </div>
        </div>
      </div>
    </div>





        </div>

      </div>



    </div>



  )
}

export default FaqsList;