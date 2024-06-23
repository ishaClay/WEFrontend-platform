import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { enumApi } from "@/services/apiServices/enum";
import { getPillerWiseProgress } from "@/services/apiServices/pillar";
import { PillerWiseProgressResponse } from "@/types/Pillar";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function SavedAssesment() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  const { UserId, clientId } = useAppSelector((state) => state.user);
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const userID = UserId
    ? UserId
    : userData?.query
    ? userData?.query?.id
    : userData?.id;
  const { data, isPending } = useQuery<PillerWiseProgressResponse>({
    queryKey: [QUERY_KEYS.clientwisePillarList],
    queryFn: () => getPillerWiseProgress(clientId, userID),
  });

  console.log(data?.data);

  // const { data: pillarList } = useQuery({
  //   queryKey: [QUERY_KEYS.pillarList],
  //   queryFn: () => fetchClientwisePillarList(clientId),
  // });

  // useEffect(() => {
  //   const pillarName = pillarList?.data?.data?.map((i: any) => i?.pillarName);

  //   if (allPillar?.length) {
  //     dispatch(setPillarName(pillarName));
  //   }
  // }, [allPillar, dispatch, pillarList?.data?.data]);

  const { data: enums } = useQuery({
    queryKey: [QUERY_KEYS.authenums],
    queryFn: () => enumApi(UserId),
  });

  const handleAssesment = () => {
    const pathStatus = enums?.data.data.pathStatus;

    console.log(pathStatus);

    switch (pathStatus) {
      case 1:
        navigate("/savedassesment");
        break;
      case 2:
        navigate("/question");
        break;
      case 3:
        navigate("/teaserscore");
        break;
      case 4:
        navigate("/companyregister");
        break;
      case 5:
        navigate("/maturelevel");
        break;
      case 6:
        navigate("/selectlevel");
        break;
      case 7:
        navigate("/maturitylevelactionitem");
        break;
      default:
        navigate("/savedassesment");
        break;
    }
  };

  return (
    <div>
      <div>
        <div className=" border-b-[2px]  ">
          <Header />
        </div>
        <div className="flex mainContailner">
          <div>
            <img
              src="../assets/img/Group 1000001824.png"
              className="xl:max-w-[800px] max-w-[400px]"
            />
          </div>

          <div className="xl:px-0 px-2">
            <div className="h-[400px] relative xl:mt-[142px] mt-[50px] ml-[40px]">
              <div className="flex items-center">
                <h3 className="text-[Calibri] italic text-[#3A3A3A] font-bold">
                  Welcome Back to Your Sustainability Journey!
                </h3>
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
                Great to see you back! You've already set sail on the journey
                towards a sustainable future.
              </p>
              <p className="mt-[20px]">
                Let's continue navigating your Green Compass. We've plotted your
                progress so far, and now it's time to complete the remaining
                questions under each sustainability pillar
              </p>
              <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[50px] text-[24px]">
                {" "}
                What to Expect:
              </p>
              <div className="w-[330px] mt-[15px]">
                <div className="flex items-center">
                  <img
                    className="h-[25px] w-[25px]"
                    src="../assets/img/saved.png"
                  />
                  <span className="ml-1">
                    Complete the assessment with precision.
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-[25px] w-[25px]"
                    src="../assets/img/saved.png"
                  />
                  <span className="ml-1 mt-[25px]">
                    Refine your green practices based on your initial responses.
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    className="h-[25px] w-[25px]"
                    src="../assets/img/saved.png"
                  />
                  <span className="ml-1 mt-[25px]">
                    Uncover insights that will guide your company's
                    sustainability strategy.
                  </span>
                </div>
              </div>
              <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[15px] text-[24px]">
                Your Progress So Far:
              </p>
              <div className="pt-8 pl-[px] pb-5 flex flex-wrap gap-5">
                {isPending ? (
                  <Loader />
                ) : (
                  data?.data &&
                  data?.data.map((category, index: number) => {
                    return (
                      <div className="">
                        <div
                          key={index}
                          className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col  items-center p-3"
                        >
                          <div>
                            <img
                              src={getImages(category.pillarName)}
                              alt="img"
                              className="w-[52px] h-[52px]"
                            />
                          </div>
                          <h4 className="mt-3">{category.pillarName}</h4>

                          <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold ">
                            {category?.progress} %
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="text-[Calibri] italic text-[#3A3A3A] font-bold mt-[15px] text-[24px]">
                Complete the Assessment and Reap the Benefits
              </p>
              <p>
                {" "}
                Every question answered propels you closer to a sustainable and
                successful voyage. Don't miss the chance to refine your course
                and make a positive impact. Your sustainable map awaits
                completion!
              </p>
              <Button
                onClick={handleAssesment}
                className="bg-[#64A70B] text-[20pxpx] leading-5 w-[180px] mt-[20px]"
              >
                Continue Assessment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SavedAssesment;
