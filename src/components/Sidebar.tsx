import sidebarlogo from "/assets/img/sidebarlogo.png";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

interface SidebarItem {
  label: string;
  Icon: JSX.Element;
  link: string;
  children?: any;
}

const Sidebar = ({ sidebarItems }: { sidebarItems: SidebarItem[] }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

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

  return (
    <div className="top-0 left-0 lg:flex flex-col justify-between w-60 duration-500 bg-[#FFFFFF] overflow-hidden">
      <div className="w-[235px] h-screen">
        <div className="ml-[40px] mt-[20px]">
          <img src={sidebarlogo} alt="logo" width={121.17} height={80} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.link}
                onClick={() => toggleDropdown(item.children, index)}
                className="group flex items-center text-[16px] leading-5 gap-3.5 font-[400] py-2 px-4 hover:bg-[#00778B] hover:text-white rounded-md text-[#606060] font-calibri"
              >
                {item.Icon}
                <h2>{item.label}</h2>
                {item.children?.length > 0 && !isOpen[`bar${index + 1}`] && (
                  <HiChevronRight />
                )}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
