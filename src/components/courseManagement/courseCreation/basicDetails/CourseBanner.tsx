import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { createCourseTwoPage, fetchSingleCourseById, updateCourse } from "@/services/apiServices/courseManagement";
import { uploadImage } from "@/services/apiServices/upload";
import { ResponseError } from "@/types/Errors";
import { CourseData } from "@/types/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

const CourseBanner = () => {
  const [editorData, setEditorData] = React.useState("");
  const [keyData, setKeyData] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search).get("id");
  const paramsTab = new URLSearchParams(search).get("tab");
  const paramsversion = new URLSearchParams(search).get("version");
  const pathName = location?.pathname?.split("/")[1];
  const courseId: string = location?.pathname?.split("/")[3];
  console.log("paramsTab", paramsTab);
  
  const schema = zod.object({
    description: zod.string({required_error: "Description is required"}).min(1, "Information is required"),
    bannerImage: zod.string({required_error: "Banner Image is required"}).min(1, "Banner Image is required"),
    keys: zod.string({required_error: "Key Outcomes is required"}).min(1, "Key Outcomes is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const {data: getSingleCourse} = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, {paramsversion}],
    queryFn: () => fetchSingleCourseById(String(paramsversion)),
    enabled: +courseId ? !!paramsversion : false,
  })

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data:CourseData | any = getSingleCourse?.data?.course;
      (Object.keys(data) as Array<keyof CourseData>).forEach((key: any) => {
        setValue(key, data[key]);
        setEditorData(data?.description || "");
        setKeyData(data?.keys || "");
        setImage(data?.bannerImage);
      });
    }
  }, [getSingleCourse]);

  const { mutate: updateCourseFun, isPending: isUpdatePending } = useMutation({
    mutationFn: (e: any) => updateCourse(e),
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      navigate(
        `/${pathName}/create_course/${courseId}?tab=${1}&version=${paramsversion}`,
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

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.data?.data?.image);
      setValue("bannerImage", data?.data?.data?.image);
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const { mutate: create, isPending } = useMutation({
    mutationFn: createCourseTwoPage,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data?.data?.message,
        variant: "success",
      });
      navigate(
        `/${pathName}/create_course?tab=${1}&id=${params}&version=${paramsversion}`,
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
    if (+courseId) {
      updateCourseFun({
        payload,
        id: +courseId,
        version: getSingleCourse?.data?.version
      });
    } else {
      create({
        data: payload,
        id: params || "",
        paramsversion: paramsversion || "",
      });
    }
  };


  return (
    <div className="border border-[#D9D9D9] rounded-md p-7">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-5">
            <h6 className="text-[#515151] font-calibri text-base pb-4">
              Information
            </h6>
            <CKEditorComponent
              value={editorData}
              {...register("description")}
              onChange={(e, data) => {
                console.log(e);
                setEditorData(data.getData());
                setValue("description", data.getData());
              }}
            />
            {/* {!errors?.description?.ref?.value && <ErrorMessage message={errors?.description?.message as string} />} */}
            {!editorData && errors?.description && (
                <ErrorMessage message={errors?.description?.message as string} />
              )}
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
                  accept=".jpeg, .jpg"
                  {...register("bannerImage")}
                  onChange={handleUpload}
                />
                <div>
                  <label htmlFor="file" className="cursor-pointer inline-block">
                    <div className="flex items-center justify-center max-w-[160px] mx-auto rounded-[5px] text-white bg-[#42A7C3] px-4 py-3">
                      <Image className="me-2" />
                      Upload Photo
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {image === "" && errors?.bannerImage && (
                <ErrorMessage message={"Banner image is required"} />
              )}
          </div>
          <div className="pb-5">
            <h6 className="text-[#515151] font-calibri text-base pb-4">
              Key Outcomes
            </h6>
            <CKEditorComponent
              value={keyData}
              {...register("keys")}
              onChange={(e, data) => {
                console.log("e", e);
                setKeyData(data.getData());
                setValue("keys", data.getData());
              }}
            />
            {!keyData && errors?.keys && (
                <ErrorMessage message={errors?.keys?.message as string} />
              )}
          </div>
          <div className="text-right">
            <Button
              type="submit"
              className="outline-none text-base font-inter text-white bg-[#58BA66] py-6 px-8"
            >
              {isPending || isUpdatePending ? <Loader containerClassName="h-auto" /> : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseBanner;
