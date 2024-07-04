import { LogOut } from "@/services/apiServices/authService";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "./comman/Error/Loading";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import sidebarlogo from "/assets/img/sidebarlogo.png";
import Drawer from "./comman/Drawer";

interface SidebarItem {
  label: string;
  Icon: IconType;
  link: string;
  children: {
    label: string;
    link: string;
  }[];
}

const DrawerPage = ({
  sidebarItems,
  open,
  setOpen,
}: {
  sidebarItems: SidebarItem[];
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
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

  return (
    <>
      <Drawer
        open={open}
        className="sm:max-w-[280px] p-0"
        onClose={() => setOpen(false)}
      >
        <div className="top-0 left-0 lg:flex flex-col justify-between duration-500 bg-[#FFFFFF] overflow-hidden">
          <div className="h-[100vh] p-5">
            <div className="ml-[40px] mt-[20px]">
              <Button
                type="button"
                onClick={() => {
                  mavigate("/");
                  setOpen(false);
                }}
                className="flex items-center gap-2"
                variant="ghost"
              >
                <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
              {sidebarItems.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <div key={index}>
                    {item.label !== "Logout" ? (
                      <>
                        <Link
                          to={item.link}
                          onClick={() => {
                            toggleDropdown(item.children, index);
                            item.children?.length === 0 && setOpen(false);
                          }}
                          className="group flex items-center justify-between text-[16px] leading-5 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri"
                        >
                          <div className="flex items-center gap-2">
                            <Icon size={22} />
                            <h2>{item.label}</h2>
                          </div>
                          {item.children?.length > 0 &&
                            !isOpen[`bar${index + 1}`] && <HiChevronRight />}
                          {item.children?.length > 0 &&
                            isOpen[`bar${index + 1}`] && <HiChevronDown />}
                        </Link>
                        {item.children?.length > 0 &&
                          isOpen[`bar${index + 1}`] && (
                            <ul className="bg-white rounded-md list-disc pl-6 w-[245px]">
                              {item.children.map(
                                (child, childIndex: number) => (
                                  <li
                                    className={`ml-[20px] text-[16px] leading-5 mt-2 text-[#606060] font-calibri ${
                                      location.pathname.includes(child.link)
                                        ? "font-[700]"
                                        : "font-[400]"
                                    }`}
                                    key={childIndex}
                                  >
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        mavigate(child.link);
                                        setOpen(false);
                                      }}
                                      className="flex items-center gap-2"
                                      variant="ghost"
                                    >
                                      {child.label}
                                    </Button>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </>
                    ) : (
                      <Button
                        variant={"ghost"}
                        onClick={handleLogout}
                        className="group flex items-center justify-start text-[16px] leading-5 gap-2 font-[400] p-[10px] hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri w-full text-left"
                      >
                        <Icon size={22} />
                        <h2>{item.label}</h2>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {isPending && <Loading isLoading={isPending} />}
        </div>
      </Drawer>
    </>
  );
};

export default DrawerPage;
