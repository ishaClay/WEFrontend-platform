import { MdOutlineGroup } from "react-icons/md";
import HeaderCourse from "@/components/HeaderCourse"
import { FaStar } from 'react-icons/fa';


import avatar1 from '/public/assets/img/face1.jpg';
import avatar2 from '/public/assets/img/face2.jpg';
import avatar3 from '/public/assets/img/face3.jpg';
import avatar4 from '/public/assets/img/face1.jpg';
import avatar5 from '/public/assets/img/face2.jpg';
import avatar6 from '/public/assets/img/face3.jpg';
import avatar7 from '/public/assets/img/face1.jpg';
import avatar8 from '/public/assets/img/face2.jpg';
import avatar9 from '/public/assets/img/face3.jpg';
import avatar10 from '/public/assets/img/face3.jpg';
import avatar11 from '/public/assets/img/face3.jpg';
import avatar12 from '/public/assets/img/face3.jpg';
import avatar13 from '/public/assets/img/face3.jpg';
import avatar14 from '/public/assets/img/face3.jpg';
import EmployeeListSidebar from "@/components/EmployeeListSidebar";
function CoursesAllocate() {
  const avatars = [avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7,avatar8,avatar9,avatar10,avatar11,avatar12,avatar13,avatar14, ];
  return (
    <div className="flex bg-[#f5f3ff] w-[1510px] h-[1608px] gap-1 overflow-hidden">
      <div className=" w-[235px] h-[1608px]">
        <EmployeeListSidebar />
      </div>
      <div className="flex flex-col  ">
        <div className="w-[1204px] h-[120px] ">
          <HeaderCourse />
        </div>

        <div className="bg-[#FFFFFF] w-[1250px] h-[1469px] m-[12px] rounded-t-[10px]">
          <div className=" pt-[16px] pl-[30px] w-[1250px] h-[60px] bg-[#FFFFFF] border-b border-[#D9D9D9] rounded-t-[50px]">
            <p className="text-[#000000] text-[Calibri] font-bold">Course Allocation</p>

          </div>
          <div>
            <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

              <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
              </div>

              <div className="flex flex-col mt-[15px] ml-[22px] ">
                <div>
                  <div className="flex items-center mt-[10px] ml-[2px]">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                      Social
                    </p>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/def.png" alt="Image Alt Text" />
                      Technology & Innovation
                    </p>
                    <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                    <span className="text-[black] font-bold text-sm mr-2 ml-1">4.5</span>
                    <MdOutlineGroup className='w-[12px] h-[11px] ml-[20px]' />
                    <p className='ml-[10px] text-[#A3A3A3] text-[13px]'>15 Employee</p>
                  </div>
                </div>

                <div className="flex ">
                  <div className="h-[44px] w-[390.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                    <p className="font-bold text-[16px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                  </div>

                </div>

                <div className="flex mt-[25px]  ">
                  <div className="h-[22px] w-[129px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="h-[22px] w-[160px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                    <p className="text-xs">Full Time</p>
                  </div>
                  <div className="h-[22px] w-[75px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                    <p className="text-xs">Online</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                    <p className="text-xs">2 Years</p>
                  </div>
                  <div className="h-[22px] w-[200px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>

                </div>
                <div className="flex items-center space-x-[-10px] mt-[10px]">
                  {avatars.slice(0, 9).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]" >

                    {/* +{avatars.length - 14} */}
                    +{Math.max(0, avatars.length - 9)}
                  </div>
                </div>

              </div>
              <div>
                <div className="flex flex-col ">

                  <button className=" h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">View Allocation</button>

                </div>
              </div>
            </div>
          </div>



          <div>
            <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

              <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
              </div>

              <div className="flex flex-col mt-[15px] ml-[22px] ">
                <div>
                  <div className="flex items-center mt-[10px] ml-[2px]">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                      Social
                    </p>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/def.png" alt="Image Alt Text" />
                      Technology & Innovation
                    </p>
                    <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                    <span className="text-[black] font-bold text-sm mr-2 ml-1">4.5</span>
                    <MdOutlineGroup className='w-[12px] h-[11px] ml-[20px]' />
                    <p className='ml-[10px] text-[#A3A3A3] text-[13px]'>15 Employee</p>
                  </div>
                </div>

                <div className="flex ">
                  <div className="h-[44px] w-[390.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                    <p className="font-bold text-[16px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                  </div>

                </div>

                <div className="flex mt-[25px]  ">
                  <div className="h-[22px] w-[129px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="h-[22px] w-[160px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                    <p className="text-xs">Full Time</p>
                  </div>
                  <div className="h-[22px] w-[75px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                    <p className="text-xs">Online</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                    <p className="text-xs">2 Years</p>
                  </div>
                  <div className="h-[22px] w-[200px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>

                </div>
                <div className="flex items-center space-x-[-10px] mt-[10px]">
                  {avatars.slice(0, 9).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]" >

                    {/* +{avatars.length - 14} */}
                    +{Math.max(0, avatars.length - 9)}
                  </div>
                </div>

              </div>
              <div>
                <div className="flex flex-col ">

                  <button className=" h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">View Allocation</button>

                </div>
              </div>
            </div>
          </div>


          
          <div>
            <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

              <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
              </div>

              <div className="flex flex-col mt-[15px] ml-[22px] ">
                <div>
                  <div className="flex items-center mt-[10px] ml-[2px]">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                      Social
                    </p>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/def.png" alt="Image Alt Text" />
                      Technology & Innovation
                    </p>
                    <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                    <span className="text-[black] font-bold text-sm mr-2 ml-1">4.5</span>
                    <MdOutlineGroup className='w-[12px] h-[11px] ml-[20px]' />
                    <p className='ml-[10px] text-[#A3A3A3] text-[13px]'>15 Employee</p>
                  </div>
                </div>

                <div className="flex ">
                  <div className="h-[44px] w-[390.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                    <p className="font-bold text-[16px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                  </div>

                </div>

                <div className="flex mt-[25px]  ">
                  <div className="h-[22px] w-[129px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="h-[22px] w-[160px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                    <p className="text-xs">Full Time</p>
                  </div>
                  <div className="h-[22px] w-[75px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                    <p className="text-xs">Online</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                    <p className="text-xs">2 Years</p>
                  </div>
                  <div className="h-[22px] w-[200px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>

                </div>
                <div className="flex items-center space-x-[-10px] mt-[10px]">
                  {avatars.slice(0, 9).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]" >

                    {/* +{avatars.length - 14} */}
                    +{Math.max(0, avatars.length - 9)}
                  </div>
                </div>

              </div>
              <div>
                <div className="flex flex-col ">

                  <button className=" h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">View Allocation</button>

                </div>
              </div>
            </div>
          </div>


         


          <div>
            <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

              <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
              </div>

              <div className="flex flex-col mt-[15px] ml-[22px] ">
                <div>
                  <div className="flex items-center mt-[10px] ml-[2px]">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                      Social
                    </p>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/def.png" alt="Image Alt Text" />
                      Technology & Innovation
                    </p>
                    <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                    <span className="text-[black] font-bold text-sm mr-2 ml-1">4.5</span>
                    <MdOutlineGroup className='w-[12px] h-[11px] ml-[20px]' />
                    <p className='ml-[10px] text-[#A3A3A3] text-[13px]'>15 Employee</p>
                  </div>
                </div>

                <div className="flex ">
                  <div className="h-[44px] w-[390.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                    <p className="font-bold text-[16px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                  </div>

                </div>

                <div className="flex mt-[25px]  ">
                  <div className="h-[22px] w-[129px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="h-[22px] w-[160px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                    <p className="text-xs">Full Time</p>
                  </div>
                  <div className="h-[22px] w-[75px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                    <p className="text-xs">Online</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                    <p className="text-xs">2 Years</p>
                  </div>
                  <div className="h-[22px] w-[200px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>

                </div>
                <div className="flex items-center space-x-[-10px] mt-[10px]">
                  {avatars.slice(0, 9).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]" >

                    {/* +{avatars.length - 14} */}
                    +{Math.max(0, avatars.length - 9)}
                  </div>
                </div>

              </div>
              <div>
                <div className="flex flex-col ">

                  <button className=" h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">View Allocation</button>

                </div>
              </div>
            </div>
          </div>
          
           


          <div>
            <div className="w-[1226px] h-[230px] bg-[#FFFFFF] flex  border border-[#D9D9D9] m-[12px] rounded-md shadow-sm">

              <div className=" pt-[22px] pl-[22px]  overflow-hidden rounded">
                <img className=" w-[152px] h-[133px] rounded object-cover object-center " src="/public/assets/img/nature.png" alt="Course" />
              </div>

              <div className="flex flex-col mt-[15px] ml-[22px] ">
                <div>
                  <div className="flex items-center mt-[10px] ml-[2px]">
                    <FaStar className="text-[#FD8E1F]" />
                    <span className="text-[#8C94A3] font-semibold text-sm mr-2 ml-1">RECOMMENDED</span>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/abc.png" alt="Image Alt Text" />
                      Social
                    </p>
                    <p className='ml-[10px]'>
                      <img className="inline-block ml-1 w-[18px] h-[23px] mr-[10px]" src="/public/assets/img/def.png" alt="Image Alt Text" />
                      Technology & Innovation
                    </p>
                    <FaStar className="text-[#FBBC04] w-[12px] h-[11px] ml-[20px]" />
                    <span className="text-[black] font-bold text-sm mr-2 ml-1">4.5</span>
                    <MdOutlineGroup className='w-[12px] h-[11px] ml-[20px]' />
                    <p className='ml-[10px] text-[#A3A3A3] text-[13px]'>15 Employee</p>
                  </div>
                </div>

                <div className="flex ">
                  <div className="h-[44px] w-[390.08px] mt-[16px]" style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, lineHeight: '22px', textAlign: 'left' }}>
                    <p className="font-bold text-[16px]">Certificate in the Sustainable Development Goals, Partnership, People, Planet and Prosperity</p>
                  </div>

                </div>

                <div className="flex mt-[25px]  ">
                  <div className="h-[22px] w-[129px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/timer.png" alt="Course" />
                    <p className="text-xs">Level- Advanced</p>
                  </div>

                  <div className="h-[22px] w-[160px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px] text-black" src="public/assets/img/diploma.png" alt="Course" />
                    <p className="text-xs">Post Graduate Diploma</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/fulltime.png" alt="Course" />
                    <p className="text-xs">Full Time</p>
                  </div>
                  <div className="h-[22px] w-[75px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/online.png" alt="Course" />
                    <p className="text-xs">Online</p>
                  </div>
                  <div className="h-[22px] w-[80px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/time.png" alt="Course" />
                    <p className="text-xs">2 Years</p>
                  </div>
                  <div className="h-[22px] w-[200px] flex items-center gap-1">
                    <img className=" h-[16] w-[18px]" src="public/assets/img/unversity.png" alt="Course" />
                    <p className="text-xs">Atlantic Technological University</p>
                  </div>

                </div>
                <div className="flex items-center space-x-[-10px] mt-[10px]">
                  {avatars.slice(0, 9).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-12 h-12 rounded-full border-2 border-[#D9D9D9]"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full bg-[#00778B] flex justify-center items-center border-2 border-[#1FA8DC] text-[white]" >

                    {/* +{avatars.length - 14} */}
                    +{Math.max(0, avatars.length - 9)}
                  </div>
                </div>

              </div>
              <div>
                <div className="flex flex-col ">

                  <button className=" h-[42px] w-[145px] bg-[#64A70B] text-white ml-[130px] mt-[60px] px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">View Allocation</button>

                </div>
              </div>
            </div>
          </div>


          

        </div>

      </div>
    </div>



  )
}

export default CoursesAllocate


