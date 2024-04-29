import EmployeeSidebar from "@/components/EmployeeSidebar"




function EmployeeDashbord() {
    return (
        <div className="flex bg-[#EDEFF9] w-[1510px] h-[1630px]  overflow-hidden">
            <div className="">
                <EmployeeSidebar />
                
            </div>


            <div className="bg-[#FFFFFF] w-[1240px] h-[1460px] m-[15px]  rounded-t-[10px] p-4">
                <div className=" pb-4 w-[1205px] h-[70px] bg-[#FFFFFF] border-b border-[#F1F1F1] rounded-t-[10px] flex items-center justify-between">
                    <p className="text-[#000000] text-[Calibri] text-[28px] font-bold">Dashboard</p>

                </div>








            </div>
        </div>



    )
}

export default EmployeeDashbord