import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

import HeaderCourse from "@/components/HeaderCourse";

import { BsSearch } from "react-icons/bs";
import { TbSelector } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import EmployeeListSidebar from "@/components/EmployeeListSidebar";

function CoursesAllocate() {
	const employeeData = [
		{
			id: "#01",
			name: "Ankites Risher",
			email: "ankitesrisher@example.com",
			mobile: "+91 8459293138",
			status: "Registered",
			action: "Active",
		},
		{
			id: "#02",
			name: "Liam Risher",
			email: "liamrisher@example.com",
			mobile: "+91 8459293138",
			status: "Registered",
			action: "Active",
		},
		{
			id: "#03",
			name: "Liam Risher",
			email: "liamrisher@example.com",
			mobile: "+91 8459293138",
			status: "Invited",
			action: "Dactive",
		},
		{
			id: "#04",
			name: "Liam Risher",
			email: "liamrisher@example.com",
			mobile: "+91 8459293138",
			status: "Invited",
			action: "Dactive",
		},
		{
			id: "#05",
			name: "Liam Risher",
			email: "liamrisher@example.com",
			mobile: "+91 8459293138",
			status: "Invited",
			action: "Active",
		},
	];
	return (
		<div className="flex bg-[#f5f3ff] w-[1510px] h-[760px] gap-1 overflow-hidden">
			<div className=" w-[235px] h-[760px]">
				<EmployeeListSidebar />
			</div>
			<div className="flex flex-col  ">
				<div className="w-[1204px] h-[120px] ">
					<HeaderCourse />
				</div>

				<div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-t-[10px]">
					<div className="  pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px] flex items-center justify-between">
						<p className="text-[#000000] text-[Calibri] font-bold">
							Team Member List
						</p>
						<button className="bg-[#00778B] text-white px-4 py-2 rounded mr-[20px]  h-[45px] w-[150px]">
							Send Invitation
						</button>
					</div>

					<div className="flex pl-[10px] w-[1230px] h-[70px] bg-[#FFFFFF] ">
						<div>
							<div className="flex mt-[9px]  items-center border border-[#D9D9D9] rounded-md px-4 py-2 w-[550px] h-[52px] text-[#A3A3A3]">
								<BsSearch className="text-[#D9D9D9] mr-2" />

								<input
									type="text"
									placeholder="Search by pilier, level, recommended, course name etc."
									className="flex-1 mr-2 focus:outline-none placeholder-[#A3A3A3] text-sm"
								/>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto">
						<table className="table-auto w-full   ">
							<thead>
								<tr className="bg-[#F1F1F1] h-[50px]">
									<th className=" ">
										{" "}
										<span className="flex pl-4 ">
											ID{" "}
											<span className="mt-1">
												<TbSelector />
											</span>
										</span>
									</th>
									<th className=" ">
										<span className="flex ml-4">
											Team Member Name
											<span className="mt-1">
												<TbSelector />
											</span>
										</span>
									</th>
									<th className=" ">
										<span className="flex ml-4">
											Email Id
											<span className="mt-1">
												<TbSelector />
											</span>
										</span>
									</th>
									<th className=" ">
										<span className="flex ml-4">
											Mobile Number
											<span className="mt-1">
												<TbSelector />
											</span>
										</span>
									</th>
									<th className=" ">
										<span className="flex ml-4">
											Status
											<span className="mt-1">
												<TbSelector />
											</span>
										</span>
									</th>
									<th className=" ">
										{" "}
										<span className=" ml-4">Action</span>
									</th>
								</tr>
							</thead>
							<tbody>
								{employeeData.map((employee) => (
									<tr key={employee.id}>
										<td className=" border-b px-18 pl-4 py-2">
											<span className="w-[110px]">{employee.id}</span>
										</td>
										<td className=" border-b px-18 py-4 ">
											<span className="flex">
												{" "}
												<img
													src="public/assets/img/face1.jpg"
													alt="Employee"
													className="w-8 h-8 rounded-full mr-2"
												/>
												{employee.name}
											</span>
										</td>
										<td className=" border-b px-18 py-2">{employee.email}</td>
										<td className="border-b px-18 pl-4 py-2">
											{employee.mobile}
										</td>
										<td className={`border-b px-18  py-2`}>
											<button
												className={`text-xs rounded-full ${
													employee.status === "Registered"
														? "bg-[#00778B] text-white h-[32px] w-[80px]"
														: "bg-[#0E9CFF] text-white h-[32px] w-[80px]"
												}`}>
												{employee.status}
											</button>
										</td>
										<td className={` border-b px-18 py-2  `}>
											<span className="flex">
												<button
													className={`${
														employee.action === "Active"
															? "bg-green-500 text-white h-[32px] w-[80px] rounded-md"
															: "bg-red-500 text-white h-[32px] w-[80px] rounded-md"
													}`}>
													{employee.action}
												</button>
												<span className="mt-1 ml-4 text-[#A3A3A3] ">
													<RiDeleteBinLine />
												</span>
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<div className="ml-[1000px] mt-[20px]">
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">1</PaginationLink>
										<PaginationLink href="#">2</PaginationLink>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>

									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>

					<div className="ml-[20px]">
						<p className="font-bold text-[10px] ">Showing 10/200 Records</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CoursesAllocate;
