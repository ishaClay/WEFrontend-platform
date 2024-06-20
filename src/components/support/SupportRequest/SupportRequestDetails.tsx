import Requests_icon from "@/assets/images/MyRequests.png";
import Resolved_icon from "@/assets/images/Resolved.png";
import Ticket_icon from "@/assets/images/ticket_star.png";
import Ellipse_one from "@/assets/images/Ellipse1.png";
import Ellipse_two from "@/assets/images/Ellipse2.png";
import Ellipse_three from "@/assets/images/Ellipse3.png";

const SupportRequestDetails = () => {
  const requestDetails = [
    {
      image: Requests_icon,
      count: 375,
      title: "My Requests",
    },
    {
      image: Resolved_icon,
      count: 100,
      title: "Resolved",
    },
    {
      image: Ticket_icon,
      count: 375,
      title: "Ticket",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-5">
        {requestDetails.map((data: any, index: number) => {
          return (
            <div
              className="col-span-1 xl:p-5 p-3 shadow-md rounded-lg relative"
              key={index}
            >
              <div className="flex items-center">
                <div className="xl:w-20 w-14 xl:h-20 h-14 rounded-full bg-[#F5F7FF] flex justify-center items-center">
                  <img src={data.image} alt="img" />
                </div>
                <div className="ps-5">
                  <h3 className="font-nunito font-bold xl:text-[32px] text-2xl text-black">
                    {data.count}
                  </h3>
                  <h5 className="font-nunito text-black xl:text-base text-sm">
                    {data.title}
                  </h5>
                </div>
              </div>
              <img
                src={Ellipse_one}
                alt="ellipse"
                className="absolute bottom-0 right-[10%]"
              />
              <img
                src={Ellipse_two}
                alt="ellipse"
                className="absolute top-0 right-0"
              />
              <img
                src={Ellipse_three}
                alt="ellipse"
                className="absolute top-0 right-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportRequestDetails;
