import HeaderCourse from "@/components/HeaderCourse";

import FaqsListSidebar from "@/components/FaqsListSidebar";

import { VscFilePdf } from "react-icons/vsc";

function SupportAnswer() {
	return (
		<div className="flex bg-[#f5f3ff] w-[1510px] h-[760px] gap-1 overflow-hidden">
			<div className=" w-[235px] h-[760px]">
				<FaqsListSidebar />
			</div>
			<div className="flex flex-col  ">
				<div className="w-[1204px] h-[120px] ">
					<HeaderCourse />
				</div>

				<div className="bg-[#FFFFFF] w-[1250px] h-[1490px] m-[12px] rounded-t-[10px]">
					<div className="  pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px] ">
						<p className="text-[#000000] text-[Calibri] font-bold">
							Ticket Details
						</p>
					</div>

					<div className="flex justify-between">
						<div className="flex p-6">
							<img
								src="/public/assets/img/face1.jpg"
								alt="Employee Name"
								className="w-[32px] h-[32px] rounded-full mr-4 mt-[5px]"
							/>
							<div className="flex flex-col">
								<span className="text-[16px]  text-[#000000]">
									Danila Raffel
								</span>

								<span className="text-[12px] text-[#A3A3A3]  ">Client</span>
							</div>
						</div>

						<div className="flex flex-col mb-4 ml-8">
							<div className="flex mt-8 ml-2 gap-2 ">
								<h1 className="text-[16px]">Status:</h1>
								<div className="bg-[#58BA66] text-xs text-white py-2 h-[25px] w-[71px] px-4 rounded-full mr-2 flex items-center justify-center">
									Answered
								</div>
								<h1 className="text-[16px]">Priority:</h1>
								<div className="bg-[#FF5252]  text-xs text-white py-2 h-[25px] w-[43px] px-4 rounded-full mr-2 flex items-center justify-center">
									High
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-4 p-4 border w-[1210px] ml-[20px] mt-[10px] rounded">
						<div className="text-[16px] text-[#A3A3A3] font-semibold">
							Ticket Subject
						</div>
						<div className="text-black">How to customize the template?</div>

						<div className="text-[16px] font-semibold text-[#A3A3A3]">
							Ticket Details
						</div>
						<div className="text-black text-[16px]">
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a
								gallery of type and scrambled it to make a type specimen book.
								It has survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</p>
						</div>

						<div className="flex items-center mt-[20px]">
							<div className="flex items-center">
								<div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full">
									<VscFilePdf className="w-6 h-6" />
								</div>
								<div className="text-gray-700 ml-[20px]">
									pdf file attachment.pdf
								</div>
							</div>
							<div className="ml-[20px]">
								<button className="bg-[#00778B] text-white px-3 py-1 rounded">
									DOWNLOAD
								</button>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-4 p-4 border w-[1210px] ml-[20px] mt-[10px] rounded">
						<div className="flex p-1">
							<img
								src="/public/assets/img/face1.jpg"
								alt="Employee Name"
								className="w-[32px] h-[32px] rounded-full mr-4 "
							/>
							<div className="flex flex-col">
								<span className="text-[16px]  text-[#000000]">
									Support Person Name
								</span>

								<span className="text-[12px] text-[#A3A3A3]  ">
									Reply By: Replied Type
								</span>
							</div>
						</div>
						<div className="text-[16px] font-semibold text-[#A3A3A3]">
							Ticket Details
						</div>
						<div className="text-black text-[16px]">
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy
								text ever since the 1500s, when an unknown printer took a
								gallery of type and scrambled it to make a type specimen book.
								It has survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged. It was
								popularised in the 1960s with the release of Letraset sheets
								containing Lorem Ipsum passages, and more recently with desktop
								publishing software like Aldus PageMaker including versions of
								Lorem Ipsum.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SupportAnswer;
