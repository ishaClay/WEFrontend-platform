import ErrorMessage from "@/components/comman/Error/ErrorMessage";
import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import {
  createCourseTwoPage,
  fetchSingleCourseById,
  updateCourse,
} from "@/services/apiServices/courseManagement";
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
    description: zod
      .string({ required_error: "Description is required" })
      .min(1, "Information is required"),
    bannerImage: zod
      .string({ required_error: "Banner Image is required" })
      .min(1, "Banner Image is required"),
    keys: zod
      .string({ required_error: "Key Outcomes is required" })
      .min(1, "Key Outcomes is required"),
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

  const { data: getSingleCourse } = useQuery({
    queryKey: [QUERY_KEYS.getSingleCourse, { paramsversion, params }],
    queryFn: () => fetchSingleCourseById(String(+courseId ? paramsversion : params)),
    enabled: (+courseId || params) ? (!!paramsversion || !!params) : false,
  });

  useEffect(() => {
    if (getSingleCourse && getSingleCourse?.data?.course) {
      const data: CourseData | any = getSingleCourse?.data?.course;
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
        `/${pathName}/create_course?tab=${1}&id=${params}&version=${paramsversion}`
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
        version: getSingleCourse?.data?.version,
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
    <>
      <div className="text-base text-[#00778B] font-semibold leading-[22px] pb-2.5 sm:hidden block">
        Course Banner
      </div>
      <div className="border border-[#D9D9D9] rounded-md xl:p-[30px] md:p-[25px] p-[15px]">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:pb-5 pb-[15px]">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
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
                <ErrorMessage
                  message={errors?.description?.message as string}
                />
              )}
            </div>
            <div className="sm:pb-5 pb-[15px]">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
                Banner Image
              </h6>
              <div className="border flex items-center border-[#D9D9D9] sm:p-4 p-[10px] rounded-md">
                <div className="">
                  <div className="md:w-[270px] md:h-[190px] sm:w-[200px] sm:h-[150px] w-[100px] h-[100px] rounded-md bg-[#F3F3F3] flex justify-center items-center cursor-pointer">
                    {isUploading ? (
                      <Loader />
                    ) : image ? (
                      <img src={image} alt="banner" className="w-full h-full" />
                    ) : (
                      <span className="flex sm:flex-row flex-col items-center text-[#9E9E9E] gap-2 sm:text-base text-sm">
                        <Image /> Upload Image
                      </span>
                    )}
                  </div>
                </div>
                <div className="xl:w-[40%] sm:text-center text-left sm:ps-4 ps-[10px] xl:ps-0">
                  <h6 className="sm:text-base text-sm font-calibri sm:pb-3 pb-2">
                    Size: 1024x768 pixels Max size 500KB
                  </h6>
                  <h6 className="sm:text-base text-sm font-calibri pb-3">
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
                    <label
                      htmlFor="file"
                      className="cursor-pointer inline-block"
                    >
                      <div className="flex items-center justify-center sm:w-[140px] w-[130px] sm:h-[42px] h-[38px] mx-auto rounded-[5px] text-white bg-[#42A7C3] sm:text-base text-sm">
                        <Image className="sm:me-1 me-[6px] sm:w-auto w-[14px]" />
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
            <div className="">
              <h6 className="text-[#515151] font-calibri text-base pb-3">
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
            <div className="text-right mt-5">
              <Button
                type="submit"
                className="outline-none text-base font-inter text-white bg-[#58BA66] sm:w-[120px] sm:h-[52px] w-[100px] h-[36px]"
                disabled={isPending || isUpdatePending}
              >
                {isPending || isUpdatePending ? (
                  <Loader containerClassName="h-auto" />
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseBanner;
