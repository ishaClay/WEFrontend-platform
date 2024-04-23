import HeaderCourse from "@/components/HeaderCourse";

import { FiFile, FiVideo } from "react-icons/fi";
import FaqsListSidebar from "@/components/FaqsListSidebar";

import { VscFilePdf } from "react-icons/vsc";
import React, { useState } from "react";

function SupportDetails() {
	const [assignedTo, setAssignedTo] = useState<string>("");
	const [ticketStatus, setTicketStatus] = useState<string>("Closed");
	const [ticketReply, setTicketReply] = useState<string>("");

	const handleAssignedToChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAssignedTo(e.target.value);
	};

	const handleTicketStatusChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setTicketStatus(e.target.value);
	};

	const handleTicketReplyChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setTicketReply(e.target.value);
	};

	return (
		<div className="flex bg-[#f5f3ff] w-[1510px] h-[760px] gap-1 overflow-x-hidden">
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
								<div className="bg-[#0E9CFF] text-xs text-white py-2 h-[25px] w-[71px] px-4 rounded-full mr-2 flex items-center justify-center">
									InProgress
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

						<div className="flex items-center mt-[20px] ">
							<div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
								<VscFilePdf className="w-6 h-6" />
							</div>

							<div className="text-gray-700 ml-[20px]">
								pdf file attachment.pdf
							</div>
						</div>
					</div>

					<div className="p-4   rounded-lg">
						<div className="flex flex-wrap -mx-2">
							<div className="w-full md:w-1/2 px-2 mb-4">
								<label
									htmlFor="assignedTo"
									className="block text-sm font-medium text-gray-700">
									Assign To
								</label>
								<select
									id="assignedTo"
									name="assignedTo"
									value={assignedTo}
									onChange={handleAssignedToChange}
									className="mt-1 block w-full py-2 px-3 border border-[#D9D9D9]  rounded-md  ">
									<option value="">Select Name</option>
									{/* Add options here */}
								</select>
							</div>
							<div className="w-full md:w-1/2 px-2 mb-4">
								<label
									htmlFor="ticketStatus"
									className="block text-sm font-medium text-gray-700">
									Ticket Status
								</label>
								<select
									id="ticketStatus"
									name="ticketStatus"
									value={ticketStatus}
									onChange={handleTicketStatusChange}
									className="mt-1 block w-full py-2 px-3 border border-[#D9D9D9]   rounded-md  ">
									<option value="Open" className="text-red-500">
										Open
									</option>
									<option value="Closed">Closed</option>
								</select>
							</div>
						</div>
						<div>
							<label
								htmlFor="ticketReply"
								className="block text-sm font-medium text-gray-700">
								Ticket Reply
							</label>
							<textarea
								id="ticketReply"
								name="ticketReply"
								value={ticketReply}
								onChange={handleTicketReplyChange}
								placeholder="Enter details"
								className="mt-1 block w-full h-32 py-2 px-3 border border-[#D9D9D9]  placeholder-[#A3A3A3]"></textarea>
						</div>
					</div>

					<div className="flex p-4">
						<label
							htmlFor="upload-document"
							className="flex items-center space-x-2 cursor-pointer">
							<input type="file" id="upload-document" className="hidden" />
							<div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
								<FiFile className="w-6 h-6" />
							</div>
							<span>Upload Document </span>
						</label>
						<label
							htmlFor="upload-document"
							className="flex items-center space-x-2 cursor-pointer">
							<input type="file" id="upload-document" className="hidden" />
							<div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
								<FiVideo className="w-6 h-6" />
							</div>
							<span>Upload Document </span>
						</label>
						<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-[740px]">
							SUBMIT
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SupportDetails;
