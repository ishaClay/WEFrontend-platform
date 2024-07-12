import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSetting";

const ModalTabs = ({ tab = "profile" }: { tab?: string }) => {
  return (
    <Tabs defaultValue={tab} className="w-full grid grid-cols-12">
      <div className="sm:col-span-3 col-span-12 sm:mb-0 mb-4">
        <TabsList className="p-0 flex sm:flex-col justify-start gap-3 w-full h-full">
          <TabsTrigger
            value="profile"
            className="sm:text-[13px] text-xs font-Poppins w-full py-2.5 hover:bg-[#00778B] hover:text-white rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-left"
          >
            Profile Setting
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="sm:text-[13px] text-xs font-Poppins w-full hover:bg-[#00778B] hover:text-white py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B] px-3 text-left"
          >
            Account Setting
          </TabsTrigger>
          {/* <TabsTrigger
            value="logout"
            className="sm:text-[13px] text-xs font-Poppins w-full py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B]"
          >
            Log Out
          </TabsTrigger> */}
          <Button
            variant={"ghost"}
            className="sm:text-[13px] text-xs font-Poppins w-full py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block hover:bg-[#00778B] hover:text-white px-3 text-left"
          >
            Log Out
          </Button>
        </TabsList>
      </div>
      <div className="sm:col-span-9 col-span-12 sm:ps-5 ps-0 sm:border-l border-l-none border-[#3E4E4E4] sm:ms-5 ms-0">
        <TabsContent value="profile" className="m-0">
          <ProfileSetting />
        </TabsContent>
        <TabsContent value="account" className="m-0">
          <AccountSetting />
        </TabsContent>
        {/* <TabsContent value="logout" className="m-0">
          Log Out
        </TabsContent> */}
      </div>
    </Tabs>
  );
};

export default ModalTabs;
