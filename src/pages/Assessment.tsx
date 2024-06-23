import { PrimaryButton } from "@/components/comman/Button/CustomButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { QUERY_KEYS } from "@/lib/constants";
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
    <div className="max-w-[1512px] w-full m-auto">
      <Header />

      <div className="flex flex-row xl:gap-[78px] gap-[30px]">
        <div>
          <img
            src="../assets/img/Group 1000001824.png"
            className="xl:max-w-[800px] max-w-[400px]"
          />
        </div>

        <div className="2xl:max-w-[calc(100%_-_800px)] xl:max-w-[calc(100%_-_600px)] w-full xl:mr-[-50px]">
          <div className="mt-[140px]">
            <div className="flex items-end gap-x-[14px]">
              <h3 className="font-[UniNeue] italic text-[24px] font-[400]">
                Navigate your Green Compass
              </h3>
              <img className="mb-[7px]" src="../assets/img/pngwing 25.png" />
            </div>

            <img className="w-[380px]" src="../assets/img/Line 23.png" />

            <p className="w-[525px] text-[16px] font-[400] font-[calibri] text-[#332626] leading-[17px] mt-[22px]">
              Steer through 30 pivotal questions under 6 sustainability pillars
              to chart your company's course towards environmental stewardship.
              <br></br>
              <br></br>
              Anchor your answers to draft a sustainable map for your
              enterprise, revealing pathways to greener practices and
              innovations.
            </p>

            <h2 className="font-[700] text-[24px] font-calibri mt-[24px]">
              What's all covered under this assessment?
            </h2>
            {/* flex-col 2xl:flex-row gap-8 2xl: */}
            <div className="font-calibri flex items-center 2xl:w-[800px]">
              <div>
                <p className="">
                  This self-assessment covers a variety of essential topics,
                  including:
                </p>
                <div className="flex 2xl:gap-x-[42px] gap-x-[24px] items-center mt-[24px]">
                  <div className="flex flex-col gap-y-[16px]">
                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/TreePlantingBlack.png"
                      />
                      <p>Environment</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/Neighbour.png"
                      />
                      <p>Social</p>
                    </div>

                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/Weak Financial Growth.png"
                      />
                      <p>Economic</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-[16px]">
                    <div className="flex gap-x-[10px] items-center">
                      <img
                        className="w-[26px]"
                        src="../assets/img/Path Steps.png"
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
                <img src="../assets/img/Group 60.png" className="" />
              </div>
            </div>

            <p className="2xl:w-[685px] xl:w-[500px] font-[400] text-[16px] mt-[24px]">
              Embarking on this assessment voyage sets your sails towards market
              distinction through sustainability. It's your sextant to gauge and
              refine your green practices, ensuring your journey not only charts
              a course for success but also for a healthier planet
            </p>

            <PrimaryButton
              onClick={handleAssesment}
              name="Take assessment"
              className="w-[266px] h-[55px] mt-[24px] text-[20px] !font-calibri"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Assessment;
