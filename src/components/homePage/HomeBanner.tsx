import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getHomeBanner } from "@/services/apiServices/bannerSlider";
import { GetHomeBannerResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import { SecondaryButton } from "../comman/Button/CustomButton";
import Loader from "../comman/Loader";

const HomeBanner = () => {
  const { clientId } = useAppSelector((state) => state.user);
  const { data: clientwiseBannerList, isPending: clientwiseBannerListPending } =
    useQuery<GetHomeBannerResponse>({
      queryKey: [QUERY_KEYS.clientwiseBannerSlider, { clientId }],
      queryFn: () => getHomeBanner(clientId?.toString(), "Active"),
      enabled: !!clientId,
    });
  return (
    <>
      <div>
        {clientwiseBannerListPending ? (
          <Loader />
        ) : (
          clientwiseBannerList?.data?.map((item) => {
            console.log("item", item);

            return (
              <div className="relative">
                <img
                  className="w-full xl:h-[610px] md:h-[480px] h-[810px]"
                  src={item.banner}
                />
                <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 ">
                  <div className="absolute top-[35%] -translate-y-[35%] md:left-auto md:right-auto md:m-0 left-0 right-0 m-auto">
                    <div className="flex flex-col md:gap-y-10 gap-y-80">
                      <div className="md:bg-transparent bg-[#1a5762] md:shadow-none rounded-lg shadow-md md:py-0 md:px-0 py-5 px-4 md:m-0 m-5">
                        <h6 className="text-[36px] font-bold secondary-text font-abhaya xl:mb-5 sm:mb-4 mb-2.5 sm:w-[380px] w-[260px] break-all leading-8">
                          {item.title}
                        </h6>
                        <p className="sm:w-[500px] w-[260px] font-semibold secondary-text md:text-lg text-base font-abhaya line-clamp-3 leading-5 xl:mb-[66px] sm:mb-[35px] mb-2.5">
                          {item.content}
                        </p>
                        <SecondaryButton
                          name={item.primaryButtonTitle}
                          href={item.primaryButtonUrl}
                          onClick={() => {
                            const element = document.getElementById("company");
                            element?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                          symbol={
                            <img
                              src="../assets/img/Move Right.png"
                              className="md:w-[26px] md:h-[26px] w-[15px] h-[15px]"
                            />
                          }
                          className="xl:w-[278px] w-[258px] xl:h-[59px] md:h-[50px] h-7 flex gap-[10px] justify-center items-center rounded-[4px] md:text-lg text-sm font-semibold font-abhaya"
                          isLink={!!item?.primaryButtonUrl}
                        />
                        <SecondaryButton
                          name={item.secondaryButtonTitle}
                          href={item.secondaryButtonUrl}
                          onClick={() => {
                            const element = document.getElementById("trainer");
                            element?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                          symbol={
                            <img
                              src="../assets/img/Move Right.png"
                              className="md:w-[26px] md:h-[26px] w-[15px] h-[15px]"
                            />
                          }
                          className="xl:w-[278px] w-[258px] xl:h-[59px] md:h-[50px] h-7 xl:mt-[29px] sm:mt-[20px] mt-2.5 flex gap-[10px] justify-center items-center rounded-[4px] md:text-lg text-sm font-semibold font-abhaya"
                          isLink={!!item?.secondaryButtonUrl}
                        />
                      </div>
                      <div className="md:bg-transparent bg-[#1a5762] md:shadow-none shadow-md text-[#ACEBF5] text-[18px] flex md:flex-row flex-col md:items-center items-start md:gap-1 sm:gap-3 gap-6 md:py-0 md:px-0 py-5 px-4">
                        <h3 className="xl:text-lg sm:text-base text-sm font-bold font-abhaya leading-5">
                          One Platform To Advance Sustainability
                        </h3>
                        <div className="flex md:gap-1 gap-3 items-center">
                          <div>
                            <img src="../assets/img/Arrow Right (1).png" />
                          </div>

                          <h3 className="xl:text-lg sm:text-base text-sm font-bold font-abhaya leading-5">
                            Get The Guidance You Need
                          </h3>
                        </div>
                        <div className="flex md:gap-1 gap-3 items-center">
                          <div>
                            <img src="../assets/img/Arrow Right (1).png" />
                          </div>

                          <h3 className="xl:text-lg sm:text-base text-sm font-bold font-abhaya leading-5">
                            Achieve Your Green Aspirations
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default HomeBanner;
