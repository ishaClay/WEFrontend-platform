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
                  className="w-full xl:h-[610px] lg:h-[480px] h-[410px]"
                  src={item.banner}
                />
                <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 ">
                  <div className="absolute top-[35%] -translate-y-[35%]">
                    <h6 className="text-[32px] font-bold secondary-text font-abhaya xl:mb-5 mb-4 w-[380px] break-all leading-8">
                      {item.title}
                    </h6>
                    <p className="w-[500px] font-semibold secondary-text text-lg font-abhaya line-clamp-3 leading-5 xl:mb-[66px] mb-[35px]">
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
                      symbol={<img src="../assets/img/Move Right.png" />}
                      className="xl:w-[278px] w-[240px] xl:h-[59px] h-[50px] flex gap-[10px] justify-center items-center rounded-[4px] text-lg font-semibold font-abhaya"
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
                      symbol={<img src="../assets/img/Move Right.png" />}
                      className="xl:w-[278px] w-[240px] xl:h-[59px] h-[50px] xl:mt-[29px] mt-[20px] flex gap-[10px] justify-center items-center rounded-[4px] text-lg font-semibold font-abhaya"
                      isLink={!!item?.secondaryButtonUrl}
                    />
                    <div className="w-full text-[#ACEBF5] text-[18px] flex items-center gap-1 mt-10">
                      <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                        One Platform To Advance Sustainability
                      </h3>
                      <div>
                        <img src="../assets/img/Arrow Right (1).png" />
                      </div>

                      <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                        Get The Guidance You Need
                      </h3>
                      <div>
                        <img src="../assets/img/Arrow Right (1).png" />
                      </div>

                      <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                        Achieve Your Green Aspirations
                      </h3>
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
