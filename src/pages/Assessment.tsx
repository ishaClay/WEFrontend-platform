import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QUERY_KEYS } from "@/lib/constants";
import { getImages } from "@/lib/utils";
import { enumUpadate } from "@/services/apiServices/enum";
import { UserData } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const UserId = useSelector((state: UserData) => state.user.UserId);

  const { mutate: EnumUpadate } = useMutation({
    mutationFn: () => enumUpadate({ path: "1" }, UserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.enumUpadateList],
      });
    },
  });
  console.log("EnumUpadate", EnumUpadate);

  const handleAssesment = () => {
    EnumUpadate();
    navigate("/question");
  };

  return (
    <div className="mainContailner w-full m-auto">
      <Header />

      <div className="flex flex-row gap-[48px] ">
        <div>
          <img
            className="xl:min-w-[590px] min-w-full w-full h-full object-cover"
            src="../assets/img/Group 1000001826.png"
          />
        </div>

        <div className="w-full ">
          <div className="mt-[100px] xl:mb-0 mb-[100px] ">
            <div className="flex items-end gap-x-[14px]">
              <h3 className="font-abhaya text-[24px] font-[400]">
                Perfect. Now to jump right in…
              </h3>
              <img className="mb-[7px]" src="../assets/img/pngwing 25.png" />
            </div>

            <img className="w-[380px]" src="../assets/img/Line 23.png" />

            <p className="w-[525px] text-[16px] font-[400] font-[calibri] text-[#332626] leading-[17px] mt-[22px]">
              Find how you score across 6 sustainability pillars with 30
              questions.
            </p>

            <h2 className="font-[700] text-[24px] font-abhaya mt-[63px]">
              The 6 sustainability pillars you’ll be assessed by:
            </h2>
            {/* flex-col 2xl:flex-row gap-8 2xl: */}
            <div className="font-calibri flex items-center justify-between">
              <div>
                <div className="flex 2xl:gap-x-[42px] gap-x-[24px] items-center mt-[24px]">
                  <div className="flex flex-col gap-y-[16px]">
                    <div className="flex gap-x-[10px] items-center">
                      <img
                        src={getImages("Environment", false)}
                        className=""
                        alt="Environment"
                      />
                      <p>Environment</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className=""
                        src={getImages("Social", false)}
                        alt="Social"
                      />
                      <p>Social</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className=""
                        src={getImages("Economic", false)}
                        alt="Economic"
                      />
                      <p>Economic</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-[16px]">
                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className=""
                        src={getImages("Strategy", false)}
                        alt="Strategy"
                      />
                      <p>Strategy</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/Light On.png"
                      />
                      <p>Technology & Innovation</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/Morale.png"
                      />
                      <p>Governance</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img src="../assets/img/Group 60.png" className="w-full" />
              </div>
            </div>

            <PrimaryButton
              onClick={handleAssesment}
              name="Start Me Now"
              className="w-[266px] primary-background  h-[55px] mt-[24px] text-[20px] !font-calibri"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Assessment;
