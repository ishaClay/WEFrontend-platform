import Loading from "@/components/comman/Error/Loading";
import AccordionHome from "@/components/homePage/AccordionHome";
import Companies from "@/components/homePage/Companies";
import FeaturedCourses from "@/components/homePage/FeaturedCourses";
import GuidingPlatform from "@/components/homePage/GuidingPlatform";
import HomeBanner from "@/components/homePage/HomeBanner";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
import Journey from "@/components/homePage/Journey";
import Steps from "@/components/homePage/Steps";
import TrainingProviders from "@/components/homePage/TrainingProviders";
import { QUERY_KEYS } from "@/lib/constants";
import { setClientId } from "@/redux/reducer/CompanyReducer";
import { fetchDataByClientwise } from "@/services/apiServices/courseSlider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const domain = document.location.origin;
  const dispatch = useDispatch();

  const { data: fetchByClientwise, isPending: fetchByClientwisePending } =
    useQuery({
      queryKey: [QUERY_KEYS.fetchDataByClientwise],
      queryFn: () => fetchDataByClientwise(domain),
      // queryFn: () => fetchDataByClientwise("weidev.clay.in"),
    });

  useEffect(() => {
    if (fetchByClientwise?.data?.data) {
      dispatch(setClientId(fetchByClientwise?.data?.data?.id));
    }
  }, [dispatch, fetchByClientwise?.data?.data]);
  return (
    <>
      <HomeHeader />
      <HomeBanner />
      <Companies />
      <GuidingPlatform />
      <Steps />
      <TrainingProviders />
      <FeaturedCourses />
      <AccordionHome />
      <Journey />
      <HomeFooter />
      <Loading isLoading={fetchByClientwisePending} />
    </>
  );
};

export default HomePage;
