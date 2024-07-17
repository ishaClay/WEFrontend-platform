import { SidebarContext } from "@/context/Sidebarcontext";
import { useAppSelector } from "@/hooks/use-redux";
import { QUERY_KEYS } from "@/lib/constants";
import { LogOut } from "@/services/apiServices/authService";
import { fetchChatUserList } from "@/services/apiServices/chatServices";
import { ResponseError } from "@/types/Errors";
import { MessageDataEntity } from "@/types/message";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/wing.png";
import Loading from "./comman/Error/Loading";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "./ui/use-toast";
import sidebarlogo from "/assets/img/sidebarlogo.png";

interface SidebarItem {
  label: string;
  Icon: IconType;
  link: string;
  children: {
    label: string;
    link: string;
  }[];
}

const Sidebar = ({ sidebarItems }: { sidebarItems: SidebarItem[] }) => {
  const location = useLocation();
  const { UserId } = useAppSelector((state) => state?.user);
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const { sidebarOpen } = useContext(SidebarContext);
  const mavigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const toggleDropdown = (
    children: { label: string; link: string }[],
    index: number
  ) => {
    if (children?.length > 0) {
      setIsOpen({ ...isOpen, [`bar${index + 1}`]: !isOpen[`bar${index + 1}`] });
    }
  };

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item?.children?.length > 0) {
        setIsOpen({ ...isOpen, [`bar${index + 1}`]: false });
      }
    });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => {
      localStorage.removeItem("user");
      mavigate("/");
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error?.data?.message || "Internal server error",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    const userId = userData?.query?.id;
    mutate(userId);
  };

  const { data: chatUserList } = useQuery({
    queryKey: [QUERY_KEYS.chatUserList],
    queryFn: () => fetchChatUserList(UserId as string),
  });
  const newMessage = chatUserList?.data?.data?.some(
    (item: MessageDataEntity) => item?.count > 0
  );

  return (
    <div
      className={`top-0 left-0 lg:flex flex-col justify-between ${
        sidebarOpen ? "2xl:w-[260px] w-[235px]" : "2xl:w-[60px] w-[235px]"
      } 2xl:w-[260px] w-[235px] duration-500 bg-[#FFFFFF] overflow-hidden`}
    >
      <div className="h-screen">
        {sidebarOpen ? (
          <div className="ml-[40px] mt-[20px]">
            <Link to={"/"}>
              <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center my-[20px]">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-[40px]" />
            </Link>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4 relative">
          {sidebarItems.map((item, index) => {
            const Icon = item.Icon;
            console.log("item++++", item);

            return (
              <div key={index}>
                {item.label !== "Logout" ? (
                  <>
                    {sidebarOpen && (
                      <Link
                        to={item.link}
                        onClick={() => toggleDropdown(item.children, index)}
                        className={`group flex items-center ${
                          sidebarOpen ? "justify-between" : "justify-center"
                        } text-[16px] leading-5 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri ${
                          item.children.find(
                            (child) =>
                              child.link === location.pathname ||
                              isOpen?.[`bar${index + 1}`]
                          )
                            ? "bg-[#00778B] text-white"
                            : "bg-[#fff]"
                        } `}
                      >
                        <div className="flex items-center gap-2">
                          {item?.label === "Message" && newMessage && (
                            <GoDotFill
                              className="absolute -top-[10px] left-[15px]"
                              fill={"#008000"}
                            />
                          )}
                          <Icon size={22} />
                          {sidebarOpen && <h2>{item.label}</h2>}
                        </div>
                        {sidebarOpen &&
                          item.children?.length > 0 &&
                          !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                        {sidebarOpen &&
                          item.children?.length > 0 &&
                          isOpen[`bar${index + 1}`] && <HiChevronDown />}
                      </Link>
                    )}
                    {!sidebarOpen &&
                      (item.children?.length === 0 ? (
                        <Link
                          to={item.link}
                          onClick={() => toggleDropdown(item.children, index)}
                          className={`group flex items-center ${
                            sidebarOpen ? "justify-between" : "justify-center"
                          } text-[16px] leading-5 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri ${
                            item.children.find(
                              (child) =>
                                child.link === location.pathname ||
                                isOpen?.[`bar${index + 1}`]
                            ) || location.pathname.includes(item.link)
                              ? "bg-[#00778B] text-white"
                              : "bg-[#fff]"
                          } `}
                        >
                          <div className="flex items-center gap-2">
                            {item?.label === "Message" && newMessage && (
                              <GoDotFill
                                className="absolute -top-[10px] left-[15px]"
                                fill={"#008000"}
                              />
                            )}
                            <Icon size={22} />
                            {sidebarOpen && <h2>{item.label}</h2>}
                          </div>
                          {sidebarOpen &&
                            item.children?.length > 0 &&
                            !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                          {sidebarOpen &&
                            item.children?.length > 0 &&
                            isOpen[`bar${index + 1}`] && <HiChevronDown />}
                        </Link>
                      ) : (
                        <Popover
                          onOpenChange={() =>
                            toggleDropdown(item.children, index)
                          }
                          open={isOpen[`bar${index + 1}`]}
                        >
                          <PopoverTrigger
                            className={`flex items-center justify-center rounded-md w-full h-full p-[10px] hover:bg-[#00778B] hover:text-white ${
                              item.children.find(
                                (child) =>
                                  child.link === location.pathname ||
                                  isOpen?.[`bar${index + 1}`]
                              )
                                ? "bg-[#00778B] text-white"
                                : "bg-[#fff]"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <Icon size={22} />
                              {sidebarOpen && <h2>{item.label}</h2>}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent side="right">
                            <ul className="bg-white rounded-md list-disc list-inside px-6 py-3 w-[245px]">
                              {item.children.map(
                                (child, childIndex: number) => (
                                  <li
                                    className={`text-[16px] leading-5 text-[#606060] py-1 font-calibri ${
                                      location.pathname.includes(child.link)
                                        ? "font-[700]"
                                        : "font-[400]"
                                    }`}
                                    key={childIndex}
                                  >
                                    <Link
                                      to={child.link}
                                      onClick={() =>
                                        toggleDropdown(item.children, index)
                                      }
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      ))}
                    {sidebarOpen &&
                      item.children?.length > 0 &&
                      isOpen[`bar${index + 1}`] && (
                        <ul className="bg-white rounded-md list-disc pl-6 w-[245px]">
                          {item.children.map((child, childIndex: number) => (
                            <li
                              className={`ml-[20px] text-[16px] leading-5 mt-2 text-[#606060] font-calibri ${
                                location.pathname.includes(child.link)
                                  ? "font-[700]"
                                  : "font-[400]"
                              }`}
                              key={childIndex}
                            >
                              <Link to={child.link}>{child.label}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </>
                ) : (
                  <Button
                    variant={"ghost"}
                    onClick={handleLogout}
                    className={`group flex items-center ${
                      sidebarOpen ? "justify-start" : "justify-center"
                    } text-[16px] leading-5 gap-2 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri w-full text-left`}
                  >
                    <Icon size={22} />
                    {sidebarOpen && <h2>{item.label}</h2>}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isPending && <Loading isLoading={isPending} />}
    </div>
  );
};

export default Sidebar;
