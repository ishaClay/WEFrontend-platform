import Footer from "@/components/Footer";
import TeaserScoreHeader from "@/components/TeaserScoreHeader";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/lib/constants";
import { enumApi } from "@/services/apiServices/enum";
import { QuestionType } from "@/types/Question";
import { useQuery } from "@tanstack/react-query";
import {useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SavedAssesment() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const {allPillar } = useSelector(
    (state: any) => state.question
  );

  console.log(allPillar)


  // const { data: pillarList } = useQuery({
  //   queryKey: [QUERY_KEYS.pillarList],
  //   queryFn: () => fetchPillarList(),
  // });

  // useEffect(() => {
  //   const pillarName = (
  //     pillarList?.data?.data
  //   )?.map((i:any) => i?.pillarName);

  //   if (pillarName?.length) {
  //     dispatch(setPillarName(pillarName));
  //   }
  // }, [pillarList]);


  const question = useSelector((state: any) => state.question);

  const UserId = useSelector((state: any) => state.user.UserId);

  const { data: enums } = useQuery({
    queryKey: [QUERY_KEYS.authenums],
    queryFn: () => enumApi(UserId),
  });

  const handleAssesment = () =>{

    const pathStatus = enums?.data.data.pathStatus;
  
    console.log(pathStatus)

    switch (pathStatus) {
      case 1:
        navigate("/assessment");
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
      navigate("/assessment")
        break;
    }

  }


  return (
    <div>
      <div>
        <div className=" border-b-[2px]  ">
          <TeaserScoreHeader />
        </div>
        <div className="flex">
          <div className="mt-[20px] h-[1170px] bg-[#F6F6F6] ">
            <img className="" src="../assets/img/Group 1000001826.png" />
          </div>

          <div className="w-[694px]">
            <div className="w-[720px] h-[400px] relative mt-[142px] ml-[40px]">
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
              <div className="pt-8 pl-[px] pb-5 w-[800px] flex flex-wrap gap-5">
     
                {allPillar.map((category: string, index: number) => {
                  const pillarQuestions = question[category];

                  const pillarTotal = pillarQuestions
                    ? pillarQuestions.length
                    : 0;
                  const pillarAttempted = Array.isArray(pillarQuestions)
                    ? pillarQuestions.filter((que: QuestionType) =>
                        que.options.some((opt: any) => opt.checked)
                      ).length
                    : 0;

                  return (
                    <div className="">
                      <div
                        key={index}
                        className="border border-solid border-[#D9D9D9] w-[223.4px] h-[150px] rounded-[14.06px] flex flex-col  items-center p-3"
                      >
                        <img
                          src="../assets/img/EnvironmentalGray.png"
                          alt="img"
                          className="w-[52px] h-[52px]"
                        />
                        <h4 className="mt-3">{category}</h4>

                        <span className="mt-[6px] text-[32px] leading-[39.06px] font-bold ">
                          {Math.round((pillarAttempted / pillarTotal)*100)} %
                        </span>
                      </div>
                    </div>
                  );
                })}
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
