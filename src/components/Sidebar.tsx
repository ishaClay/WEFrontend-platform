import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "./comman/Error/Loading";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import sidebarlogo from "/assets/img/sidebarlogo.png";

interface SidebarItem {
  label: string;
  Icon: JSX.Element;
  link: string;
  children?: any;
}

const Sidebar = ({ sidebarItems }: { sidebarItems: SidebarItem[] }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const mavigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user") as string);

  const toggleDropdown = (children: any, index: number) => {
    if (children?.length > 0) {
      setIsOpen({ ...isOpen, [`bar${index + 1}`]: !isOpen[`bar${index + 1}`] });
    }
  };

  useEffect(() => {
    sidebarItems.forEach((item, index) => {
      if (item.children?.length > 0) {
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
        description: error?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    const userId = userData?.query?.id;
    mutate(userId);
  };

  return (
    <div className="top-0 left-0 lg:flex flex-col justify-between w-60 duration-500 bg-[#FFFFFF] overflow-hidden">
      <div className="w-[235px] h-screen">
        <div className="ml-[40px] mt-[20px]">
          <Link to={"/"}>
            <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.label !== "Logout" ? (
                <>
                  <Link
                    to={item.link}
                    onClick={() => toggleDropdown(item.children, index)}
                    className="group flex items-center text-[16px] leading-5 gap-3.5 font-[400] py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri"
                  >
                    {item.Icon}
                    <h2>{item.label}</h2>
                    {item.children?.length > 0 &&
                      !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                    {item.children?.length > 0 && isOpen[`bar${index + 1}`] && (
                      <HiChevronDown />
                    )}
                  </Link>
                  {item.children?.length > 0 && isOpen[`bar${index + 1}`] && (
                    <ul className="bg-white rounded-md list-disc pl-6 w-[245px]">
                      {item.children.map((child: any, childIndex: number) => (
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
                  className="group flex items-center justify-start text-[16px] leading-5 gap-3.5 font-[400] py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri w-full text-left"
                >
                  {item.Icon}
                  <h2>{item.label}</h2>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {isPending && <Loading isLoading={isPending} />}
    </div>
  );
};

export default Sidebar;
