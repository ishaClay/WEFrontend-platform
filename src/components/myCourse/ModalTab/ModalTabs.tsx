import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSetting from "./ProfileSetting";
import AccountSetting from "./AccountSetting";

const ModalTabs = () => {
  return (
    <Tabs defaultValue="profile" className="w-full grid grid-cols-12">
      <div className="col-span-3">
        <TabsList className="p-0 flex flex-col justify-start gap-3 w-full h-full">
          <TabsTrigger
            value="profile"
            className="text-[13px] font-Poppins w-full py-2.5 hover:bg-[#00778B] hover:text-white rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B]"
          >
            Profile Setting
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="text-[13px] font-Poppins w-full hover:bg-[#00778B] hover:text-white py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B]"
          >
            Account Setting
          </TabsTrigger>
          {/* <TabsTrigger
            value="logout"
            className="text-[13px] font-Poppins w-full py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block data-[state=active]:text-[#fff] data-[state=active]:bg-[#00778B]"
          >
            Log Out
          </TabsTrigger> */}
          <Button
            variant={"ghost"}
            className="text-[13px] font-Poppins w-full py-2.5 rounded-md bg-[#F5F5F5] text-[#606060] inline-block hover:bg-[#00778B] hover:text-white"
          >
            Logout
          </Button>
        </TabsList>
      </div>
      <div className="col-span-9 ps-5 border-l border-[#3E4E4E4] ms-5">
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
