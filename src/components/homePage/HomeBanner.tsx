import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { getHomeBanner } from "@/services/apiServices/bannerSlider";
import { GetHomeBannerResponse } from "@/types/banner";
import { useQuery } from "@tanstack/react-query";
import Loading from "../comman/Error/Loading";
import { SecondaryButton } from "../comman/Button/CustomButton";

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
        {clientwiseBannerList?.data?.map((item) => {
          console.log("item", item);

          return (
            <div className="relative">
              <img
                className="w-full xl:h-[610px] lg:h-[480px] h-[410px]"
                src={item.banner}
              />
              <div className="xl:max-w-[1160px] max-w-full w-full mx-auto xl:px-0 px-5 ">
                <div className="absolute top-[35%] -translate-y-[35%]">
                  <div className="text-white">
                    <div>
                      <h2 className="text-[32px] font-normal secondary-text font-abhaya xl:mb-5 mb-4">
                        {item.title}
                      </h2>
                      <p className="w-[500px] secondary-text text-lg font-abhaya font-normal line-clamp-3 leading-5 xl:mb-[66px] mb-[35px]">
                        {item.content}
                      </p>
                      <SecondaryButton
                        name={item.primaryButtonTitle}
                        href={item.primaryButtonUrl}
                        symbol={<img src="../assets/img/Move Right.png" />}
                        className="xl:w-[278px] w-[240px] xl:h-[59px] h-[50px] flex gap-[10px] justify-center items-center rounded-[4px] text-lg font-normal font-abhaya"
                        isLink
                      />
                      <SecondaryButton
                        name={item.secondaryButtonTitle}
                        href={item.secondaryButtonUrl}
                        symbol={<img src="../assets/img/Move Right.png" />}
                        className="xl:w-[278px] w-[240px] xl:h-[59px] h-[50px] xl:mt-[29px] mt-[20px] flex gap-[10px] justify-center items-center rounded-[4px] text-lg font-normal font-abhaya"
                        isLink
                      />
                      <div className="w-full secondary-text text-[18px] flex items-center gap-1 mt-10">
                        <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                          ENGAGE
                        </h3>
                        <div>
                          <img src="../assets/img/Arrow Right (1).png" />
                        </div>

                        <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                          ASSESS
                        </h3>
                        <div>
                          <img src="../assets/img/Arrow Right (1).png" />
                        </div>

                        <h3 className="xl:text-lg text-base font-bold font-abhaya leading-5">
                          SET TARGETS
                        </h3>
                        <div>
                          <img src="../assets/img/Arrow Right (1).png" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <Loading isLoading={clientwiseBannerListPending} /> */}
      </div>
    </>
  );
};

export default HomeBanner;
