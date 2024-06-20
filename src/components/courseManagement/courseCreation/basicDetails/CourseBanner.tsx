import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createCourseTwoPage } from "@/services/apiServices/courseManagement";
import { uploadImage } from "@/services/apiServices/upload";
import { ResponseError } from "@/types/Errors";
import { useMutation } from "@tanstack/react-query";
import { Image } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseBanner = () => {
  const [editorData, setEditorData] = React.useState("");
  const [keyData, setKeyData] = React.useState("");
  const [image, setImage] = React.useState("");

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log(data);
      setImage(data.data?.data?.image);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsversion = new URLSearchParams(search).get("version");

  const { mutate: create, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Course created successfully",
        variant: "success",
      });
      navigate(
        `/trainer/create_course?tab=${2}&id=${params}&version=${paramsversion}`,
        {
          replace: true,
        }
      );
    },
    onError: (error: ResponseError) => {
      toast({
        title: "Error",
        description: error.data?.message,
        variant: "destructive",
      });
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    mutate(formData);
  };

  const onSubmit = () => {
    const payload = {
      description: editorData,
      bannerImage: image,
      keys: keyData,
    };
    create({
      data: payload,
      id: params || "",
      paramsversion: paramsversion || "",
    });
  };

  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Information
          </h6>
          <CKEditorComponent
            value={editorData}
            onChange={(e, data) => {
              console.log(e, data.getData(), "editorData");
              setEditorData(data.getData());
            }}
          />
        </div>
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Banner Image
          </h6>
          <div className="border flex items-center border-[#D9D9D9] p-4 rounded-md">
            <div className="">
              <div className="w-[270px] h-[190px] rounded-md bg-[#F3F3F3] flex justify-center items-center cursor-pointer">
                {isUploading ? (
                  <Loader />
                ) : image ? (
                  <img src={image} alt="banner" className="w-full h-full" />
                ) : (
                  <span className="flex items-center text-[#9E9E9E] ">
                    <Image /> Upload Image
                  </span>
                )}
              </div>
            </div>
            <div className="xl:w-[40%] text-center ps-4 xl:ps-0">
              <h6 className="text-base font-calibri pb-3">
                Size: 1024x768 pixels Max size 500KB
              </h6>
              <h6 className="text-base font-calibri pb-3">
                File Support: jpg, .jpeg
              </h6>
              <input
                type="file"
                className="hidden"
                id="file"
                accept="image/* .jpeg .jpg"
                onChange={handleUpload}
              />
              <label htmlFor="file">
                <div className="flex items-center justify-center max-w-[160px] mx-auto rounded-[5px] text-white bg-[#42A7C3] px-4 py-3">
                  <Image className="me-2" />
                  Upload Photo
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="pb-5">
          <h6 className="text-[#515151] font-calibri text-base pb-4">
            Key Outcomes
          </h6>
          <CKEditorComponent
            value={keyData}
            onChange={(e, data) => {
              console.log(e, data.getData(), "editorData");
              setKeyData(data.getData());
            }}
          />
        </div>
      </div>
      <div className="text-right">
        <Button
          type="button"
          onClick={onSubmit}
          className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
        >
          {isPending ? <Loader containerClassName="h-auto" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default CourseBanner;
