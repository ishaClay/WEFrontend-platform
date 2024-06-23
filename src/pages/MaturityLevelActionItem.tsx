import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { enumUpadate } from "@/services/apiServices/enum";
import { getCheckedMeasures } from "@/services/apiServices/pillar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Apply from "/assets/img/Apply.png";
import Assess from "/assets/img/Assess.png";
import Attainproficiency from "/assets/img/Attainproficiency.png";
import Correct from "/assets/img/Correct.png";
import Learn from "/assets/img/Learn.png";

function MaturityLevelActionItem() {
  const navigate = useNavigate();
  const { clientId, UserId } = useSelector((state: any) => state.user);
  const queryClient = useQueryClient();

  const { data: getCheckedmeasures } = useQuery({
    queryKey: [QUERY_KEYS.checkedMeasures],
    queryFn: () => getCheckedMeasures(UserId, clientId),
    enabled: true,
  });

  const path = 6 + 1;
  const { mutate: EnumUpadate }: any = useMutation({
    mutationFn: () => enumUpadate({ path: path.toString() }, UserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });

  const handlematurityAction = () => {
    EnumUpadate(path);
    navigate("/company/coursesrecommended");
  };

  const paths = [
    {
      name: "Engage",
      img: Correct,
      status: "checked",
    },
    {
      name: "Assess",
      img: Correct,
      status: "checked",
    },
    {
      name: "Set Targets",
      img: Correct,
      status: "indeterminate",
    },
    {
      name: "Learn",
      img: Learn,
      status: "pending",
    },
    {
      name: "Apply",
      img: Apply,
      status: "pending",
    },
    {
      name: "Attain proficiency",
      img: Attainproficiency,
      status: "pending",
    },
  ];
  return (
    <div>
      <Header />
      <div className="mainContailner">
        <div className="border-t border-b border-[#DED7D7]">
          <div className="h-[120px] font-Poppins font-medium text-[12.85px] leading-[16.64px] text-[#3A3A3A] flex justify-center pb-3 pt-[13px]">
            <div className="relative lg:gap-[79.4px] justify-between flex min-w-[640px] md:w-auto items-center mx-5">
              {paths.map((path) => (
                <div
                  key={path.name}
                  className={`flex flex-col self-end items-center ${
                    path.name === "Engage" || path.name === "Assess" ? " " : " "
                  }`}
                >
                  {path.status === "checked" ? (
                    <img
                      src={Correct}
                      alt="img"
                      width={59.6}
                      height={59.6}
                      className="mt-[13.4]"
                    />
                  ) : path.status === "indeterminate" ? (
                    <img
                      src={Assess}
                      alt="img"
                      width={70}
                      height={70}
                      className="mt-[7px]"
                    />
                  ) : (
                    <img
                      src={path.img}
                      alt="img"
                      width={59.6}
                      height={59.6}
                      className="mt-[15.4px]"
                    />
                  )}
                  <p
                    className={`${
                      path.name === "Engage" || path.name === "Assess"
                        ? "bg-[#64A70B] text-white"
                        : ""
                    }`}
                  >
                    {path.name}
                  </p>
                </div>
              ))}
              <div className="absolute top-[47.5px] left-3 right-10 border-2  border-[#585858] -z-10"></div>
            </div>
          </div>
        </div>

        {getCheckedmeasures?.data?.data?.map((item: any) => {
          console.log(item);
          return (
            <div className="flex flex-col h-full w-full mt-8">
              <div className="mx-auto xl:max-w-[1126px] max-w-[970px] w-full">
                <div className="w-full py-[9px] px-[17px] h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center gap-[15px]">
                      <div className="bg-white rounded-full drop-shadow-md w-[52px] h-[52px] flex items-center justify-center p-3">
                        <img
                          src={getImages(item?.pillarName, true)}
                          alt="Leaf Icon"
                          className="w-full h-full"
                        />
                      </div>

                      <div className="text-[#1D2026] font-Calibri font-bold">
                        {item.pillarName}
                      </div>
                    </div>

                    <div className="flex items-center gap-[12px]">
                      <div className="text-center text-[16px] leading-[22px] font-calibri rounded-full bg-opacity-70 bg-[#EFF4FAF5] flex items-center justify-center py-[3px] px-3">
                        {item.maturityNextLevelName}
                      </div>

                      <div className=" text-white text-center text-[16px] leading-[22px] font-calibri rounded-full bg-green-700 bg-opacity-70 flex items-center justify-center py-[3px] px-3">
                        {item.maturityLevelName}
                      </div>
                    </div>
                  </div>
                </div>

                {item?.measures?.map((v: any) => {
                  return (
                    <div className="w-full px-[23px] py-[27px] border border-solid border-[#D9D9D9] ">
                      <p className="">{v.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* <div className="flex flex-col h-full w-full mt-2">
				<div className="ml-[180px]   h-[390px] w-[1126px]">
					<div className="w-full h-[74px] border border-solid border-[#D9D9D9] rounded-tl-lg rounded-tr-lg">
						<div className=" pb-2 pt-2 flex  gap-5  h-[70px] w-[1126px]">

							<div className="flex ">
								<div className=" ml-4 bg-white rounded-full drop-shadow-md w-14 h-14 p-4 mb-2">
									<img src="/public/assets/img/Morale.png" alt="Leaf Icon" />
								</div>

								<div className="ml-6 mt-4 text-[#1D2026] font-Calibri font-bold">Governance</div>


								<div className="flex relative ml-24">
									<div className="ml-[450px] text-[#1D2026] mt-4 text-center font-Calibri rounded-full bg-opacity-70 bg-[#EFF4FAF5] h-[30px] w-[107px] flex items-center justify-center">Intermediate</div>
									<div className="absolute top-3 left-28 right-16 border-2 border-dashed border-[#A6A6A6] w-40 mt-5 ml-[446px]">

										<svg className="absolute top-1/2 transform -translate-y-1/2 right-0 -mr-2 text-gray-700 mt-8 " xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 256 256" fill="#85B6FF">
											<path d="M 87.85 41.551 L 5.545 1.167 C 2.414 -0.369 -0.979 2.725 0.263 5.984 l 14.342 37.648 c 0.336 0.881 0.336 1.854 0 2.735 L 0.263 84.016 c -1.241 3.259 2.152 6.353 5.282 4.817 L 87.85 48.449 C 90.717 47.043 90.717 42.957 87.85 41.551 z" />
										</svg>
									</div>
									<div className=" text-white mt-4 text-center font-sans rounded-full bg-green-700 bg-opacity-70 h-8 w-24 flex items-center justify-center ml-[160px]">Advanced</div>
								</div>

							</div>
						</div>
					</div>

					<div className="w-full h-[70px] border border-solid border-[#D9D9D9] ">
						<p className=" pt-5 pl-6">Enhance and execute your Net Zero strategy with clear goals and comprehensive actions.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9]">
						<p className=" pt-5 pl-6">Lead in energy efficiency through continuous optimization and strategic energy management.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9]">
						<p className=" pt-5 pl-6">Achieve sustainability leadership by fully embracing and expanding renewable energy use.</p>
					</div>
					<div className="w-full h-[70px] border border-solid border-[#D9D9D9] rounded-bl-lg rounded-br-lg">
						<p className=" pt-5 pl-6">Optimise transportation and logistics for minimal environmental impact through advanced strategies and technologies.</p>
					</div>
				</div>
			</div> */}

        <div className="flex justify-center mt-10">
          <button
            onClick={handlematurityAction}
            className="bg-[#64A70B] text-[white] w-[224px] h-[40px] rounded mt-7 text-center text-[16px] text-Abhaya Libre ExtraBold"
          >
            View Recommended Courses
          </button>
          <button
            onClick={() => navigate("/maturelevel")}
            className="ml-4 bg-[#64A70B] text-[white] w-[224px] h-[40px] rounded mt-7 text-center text-Abhaya text-[16px] Libre ExtraBold"
          >
            Edit Roadmap
          </button>
        </div>

        <div className="pb-4 w-[940px]  "></div>

        <div className="font-bold max-w-[1160px] w-full text-center mx-auto font-Abhaya Libre ExtraBold text-red-500 pb-2 flex flex-col justify-center mb-10">
          <p>
            {" "}
            Congratulations! 🌿 Your chosen maturity levels have been noted.
            You're now on a unique{" "}
          </p>
          <p>
            sustainability journey tailored just for you. Keep moving forward,
            and watch your impact grow! 🌍✨
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MaturityLevelActionItem;
