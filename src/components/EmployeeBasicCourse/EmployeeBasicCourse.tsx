import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Information from "./Information";
import Module from "./Module";
import EmployeeHeader from "../EmployeeHeader";
import { Button } from "../ui/button";
import { PencilLine } from "lucide-react";
import { useState } from "react";
import Modal from "../comman/Modal";
import ReviewModal from "./ReviewModal";

const EmployeeBasicCourse = () => {
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  return (
    <>
      <Modal
        open={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
        className="lg:max-w-3xl sm:max-w-lg max-w-[335px] lg:p-6 p-4 rounded-xl"
      >
        <ReviewModal />
      </Modal>
      <div className="bg-white rounded-xl min-h-[calc(100vh_-_130px)]">
        <div className="px-5 py-2.5 mb-5">
          <EmployeeHeader title="My Courses" />
        </div>
        <div className="">
          <div className="sm:flex block justify-between items-center px-5">
            <h4 className="xl:text-[28px] md:text-[22px] text-[18px] font-bold font-nunito text-black sm:pb-0 pb-3">
              Wind energy basic course
            </h4>
            <Button
              className="bg-[#00778B] text-base h-12 px-5 flex items-center"
              onClick={() => setIsOpenReviewModal(true)}
            >
              <PencilLine />
              Write a Review
            </Button>
          </div>
          <div className="">
            <Tabs defaultValue="information" className="w-full">
              <TabsList className="p-0">
                <TabsTrigger
                  value="information"
                  className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                >
                  Information
                </TabsTrigger>
                <TabsTrigger
                  value="module"
                  className="text-base font-nunito text-black data-[state=active]:text-[#00778B] data-[state=active]:border-[#00778B] border-b rounded-none border-transparent"
                >
                  Module
                </TabsTrigger>
              </TabsList>
              <TabsContent value="information" className="p-5 mt-0">
                <Information />
              </TabsContent>
              <TabsContent value="module" className="p-5 mt-0">
                <Module />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeBasicCourse;
