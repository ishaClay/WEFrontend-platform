import FileUpload from "@/components/comman/FileUpload";
import { QUERY_KEYS } from "@/lib/constants";
import {
  fetchcertificate,
  Updatecertificate,
} from "@/services/apiServices/certificate";
import { uploadFile } from "@/services/apiServices/uploadServices";
import { ErrorType } from "@/types/Errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {  useParams } from "react-router-dom";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import Loading from "../comman/Error/Loading";
import InputWithLabel from "../comman/InputWithLabel";
import Loader from "../comman/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { updateCertificate } from "@/types/certificate";
import { useAppDispatch } from "@/hooks/use-redux";
import { setPath } from "@/redux/reducer/PathReducer";
type RouteParams = {
  id: string;
};
const Addcertificate = () => {
  const Role = location.pathname.split("/")[1];
  const dispatch = useAppDispatch();
  const { id: certificateId } = useParams<RouteParams>();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filename, setFilename] = useState<string>("");
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const schema = z.object({
    templateName: z.string({ required_error: "Template Name is required" }),
    backgroundImage: z.string({
      message: "backgroundImage is required",
    }),
    cretificateText: z.string({
      message: "logoImage is required",
    }),
    title: z.string({ required_error: "Certificate Title is required" }),
    bodyText: z
      .string({ required_error: "Body is required" })
      .max(100, { message: "Body must be at most 100 characters long" }),

    administratorTitle: z.string({
      required_error: "Administrator Title is required",
    }),
    instructorTitle: z.string({
      required_error: "Instructor Title is required",
    }),
    companyLogo: z.string({
      message: "administrator Signature is required",
    }),
    instructorSignature: z.string({
      message: "instructor Signature is required",
    }),
  });

  type ValidationSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const { data: Single_certificate, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.certificateDetail, { certificateId }],
    queryFn: () => fetchcertificate(certificateId!),
  });
  useEffect(() => {
    setValue("templateName", Single_certificate?.data?.templateName);
    setValue("backgroundImage", Single_certificate?.data?.backgroundImage);
    setValue("cretificateText", Single_certificate?.data?.cretificateText);
    setValue("title", Single_certificate?.data?.title);
    setValue("bodyText", Single_certificate?.data?.bodyText);
    setValue(
      "administratorTitle",
      Single_certificate?.data?.administratorTitle
    );
    setValue("companyLogo", Single_certificate?.data?.companyLogo);
    setValue("instructorTitle", Single_certificate?.data?.instructorTitle);
    setValue(
      "instructorSignature",
      Single_certificate?.data?.instructorSignature
    );
  }, [Single_certificate]);

  const { mutate: createImageUpload, isPending: imagepending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast({ title: "Image Uploaded Successfully", variant: "default" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });

      if (filename) {
        setValue(filename as any, data?.data?.data?.file);
      }
      setFilename("");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });
  const handleUploadFile = (e:any) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      createImageUpload(files[0]);
      setFilename(name.toString());
    }
    if (name) {
      setFilename(name.toString());
    }
  };

  const { mutate: update_certificate, isPending: update_Panding } = useMutation(
    {
      mutationFn: Updatecertificate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.certificateDetail],
        });
        dispatch(
          setPath([
            {
              label: "Certificate Management",
              link: null,
            },
            {
              label: "Certificate List",
              link: `/${Role}/certificate-template`,
            },
          ])
        );
        toast({
          variant: "default",
          title: "Certificate Update Successfully",
        });
      },
      onError: (error: ErrorType) => {
        toast({
          variant: "destructive",
          title: error.data.message,
        });
      },
    }
  );

  const onSubmit = async (data: FieldValues) => {
    const payload: updateCertificate | any = {
      user: userData?.query?.id,
      templateName: data?.templateName,
      backgroundImage: data?.backgroundImage,
      cretificateText: data?.cretificateText,
      title: data?.title,
      bodyText: data?.bodyText,
      administratorTitle: data?.administratorTitle,
      companyLogo: data?.companyLogo,
      instructorTitle: data?.instructorTitle,
      instructorSignature: data?.instructorSignature,
      createdAt: Single_certificate?.data?.createdAt,
      updatedAt: Single_certificate?.data?.updatedAt,
      message: "",
    };
    update_certificate({ data: payload, id: certificateId || "" });
  };
  return (
    <div className="lg:bg-white bg-transparent rounded-xl">
      <div className="border-b-2 border-solid gray flex justify-between items-center p-[16px]">
        <div>
          <h2 className="font-[700] text-[16px] font-abhaya">
            Edit Certificate
          </h2>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch(
                setPath([
                  { label: "Certificate Managment", link: null },
                  {
                    label: "Certificate List",
                    link: `/${Role}/certificate-template`,
                  },
                ])
              );
            }}
            className="text-[16px] flex font-semibold items-center gap-[15px]"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="p-5">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex gap-[30px]">
            <div className="sticky top-0 h-[501px] max-w-[calc(100%-391px)] w-full">
              <div className="relative h-full w-full">
                <div className="absolute inset-0">
                  {watch("backgroundImage") && (
                    <img
                      src={watch("backgroundImage")}
                      className="object-cover w-full h-full"
                      alt="Background"
                    />
                  )}
                </div>
                <div className="absolute top-[10%] w-full text-center">
                  {watch("cretificateText") && (
                    <div className="flex justify-center">
                      <img
                        src={watch("cretificateText")}
                        className="object-cover bg-transparent"
                        alt="Logo"
                      />
                    </div>
                  )}
                </div>

                <div className="absolute top-[30%] w-full text-center ">
                  {watch("title") && (
                    <div className="pb-5 text-[28px]">
                      <h1 className="">OF PARTICIPATION</h1>
                      <h1 className="  mt-[10px]">{watch("title")}</h1>
                    </div>
                  )}
                  <div>
                    <h1
                      className=" font-abhaya  font-mediummt-[10px] text-5xl"
                      style={{ fontFamily: "cursive" }}
                    >
                      Employe Name
                    </h1>
                  </div>
                  {watch("bodyText") && (
                    <div className=" p-4 mt-[10px]">
                      <p className="text-[28px] font-abhaya w-[50%] m-auto">
                        {watch("bodyText")}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 justify-between p-3">
                    <div className="flex justify-between pt-5">
                      {watch("administratorTitle") && (
                        <div className="border-t border-black font-abhaya text-[14px]">
                          <h2>{watch("administratorTitle")}</h2>
                          <h2>Head Of Marketing</h2>
                        </div>
                      )}
                      {watch("companyLogo") && (
                        <div className=" w-[70px] h-[70px] ">
                          <img
                            src={watch("companyLogo")}
                            className="h-[70px]"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between pt-5">
                      {watch("instructorSignature") && (
                        <div className=" w-[70px] h-[70px]  overflow-hidden">
                          <img
                            src={watch("instructorSignature")}
                            className=""
                          />
                        </div>
                      )}
                      {watch("instructorTitle") && (
                        <div className="border-t border-black font-abhaya text-[14px]">
                          <h2>{watch("instructorTitle")}</h2>
                          <h2>Head Of Marketing</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[361px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className=" rounded-lg font-abhaya">
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0 ">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Template
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Certificate Template Name"
                            type="text"
                            labelClassName="font-semibold text-[16px] pb-1 pt-1"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="Certificate template name"
                            {...register("templateName")}
                          />
                          {errors?.templateName && (
                            <ErrorMessage
                              message={errors?.templateName?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="border mt-5 p-2">
                    <div className="mt-2 p-2">
                      <h2 className="font-semibold font-abhaya mb-1">
                        Upload Background Image
                      </h2>
                      <div className="">
                        <FileUpload
                          handleDrop={(e) => {
                            setValue("backgroundImage", e);
                            handleUploadFile(e);
                          }}
                          acceptType=".jpg,.png"
                          className=" cursor-pointer p-[11px] "
                        >
                          <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                            <span className="border p-1 rounded-md text-[#515151]">
                              Choose File
                            </span>
                            <span className="p-0">No file chosen</span>
                          </div>
                          {imagepending && <Loader />}
                        </FileUpload>
                        {errors?.backgroundImage && (
                          <ErrorMessage
                            message={errors?.backgroundImage?.message as string}
                          />
                        )}
                        <h3 className="text-[#A3A3A3] text-[15px] font-abhaya mt-2 w-[155px] h-[44px]">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                    <div className=" p-2">
                      <h2 className="font-semibold font-abhaya mb-1">
                        Upload Logo Image
                      </h2>
                      <div>
                        <FileUpload
                          handleDrop={(e) => {
                            setValue("cretificateText", e);
                            handleUploadFile(e);
                          }}
                          className=" cursor-pointer p-[11px]"
                          acceptType=".jpg,.png"
                        >
                          <div className="flex items-center gap-3 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                            <span className="border p-1 rounded-md text-[#515151]">
                              Choose File
                            </span>
                            <span className="p-0">No file chosen</span>
                          </div>
                          {imagepending && <Loader />}
                        </FileUpload>
                        {errors?.cretificateText && (
                          <ErrorMessage
                            message={errors?.cretificateText?.message as string}
                          />
                        )}
                        <h3 className="text-[#A3A3A3] text-[15px] font-abhaya mt-2 w-[155px] h-[44px]">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 mt-5 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Title
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Enter Certificate Title"
                            type="text"
                            labelClassName="font-semibold text-[16px] pb-1 pt-1 font-abhaya"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="Certificate title"
                            {...register("title")}
                          />
                          {errors?.title && (
                            <ErrorMessage
                              message={errors?.title?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="rounded-lg mt-5">
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 mt-5 rounded-lg "
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Employee Name
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Employee Name"
                            type="text"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            className="mt-2 p-[11px] font-abhaya"
                            placeholder="0"
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px]">
                          <h2 className="font-semibold font-abhaya">Body</h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-4 border-t">
                          <InputWithLabel
                            label="Enter certificate body text"
                            type="text"
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="[name] [course] Lorem ipsum dolor sit amet, consectetur adipiscing elit. A id amet metus pellentesque ac diam feugiat. Proin neque, enim sit tellus enim. Sed in nulla feugiat enim est lobortis euismod neque in."
                            {...register("bodyText")}
                          />
                          {errors?.bodyText && (
                            <ErrorMessage
                              message={errors?.bodyText?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-2 h-[48px] ">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 01
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-2 pb-2 border-t">
                          <InputWithLabel
                            label="Title"
                            type="text"
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="Administrator"
                            {...register("administratorTitle")}
                          />
                          {errors?.administratorTitle && (
                            <ErrorMessage
                              message={
                                errors?.administratorTitle?.message as string
                              }
                            />
                          )}
                        </AccordionContent>

                        <AccordionContent className="p-2 pb-4">
                          <Label className="font-semibold font-abhaya ">
                            Signature
                          </Label>
                          <FileUpload
                            handleDrop={(e) => {
                              setValue("companyLogo", e);
                              handleUploadFile(e);
                            }}
                            className=" cursor-pointer p-[11px] mt-2"
                          >
                            <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                              <span className="border p-1 rounded-md text-[#515151]">
                                Choose File
                              </span>
                              <span className="p-0">No file chosen</span>
                            </div>
                            {imagepending && <Loader />}
                          </FileUpload>
                          {errors?.companyLogo && (
                            <ErrorMessage
                              message={errors?.companyLogo?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div>
                    <Accordion
                      type="single"
                      collapsible
                      className="p-0 rounded-lg mt-5"
                    >
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 ">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 02
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3 border-t">
                          <InputWithLabel
                            label="Title"
                            type="text"
                            className="mt-2 p-[11px] font-abhaya"
                            labelClassName="font-semibold font-abhaya text-[16px] pb-1 pt-1"
                            placeholder="Instructor"
                            {...register("instructorTitle")}
                          />
                          {errors?.instructorTitle && (
                            <ErrorMessage
                              message={
                                errors?.instructorTitle?.message as string
                              }
                            />
                          )}
                        </AccordionContent>

                        <AccordionContent className="p-3 pt-0">
                          <Label className="font-semibold font-abhaya ">
                            Signature
                          </Label>
                          <FileUpload
                            handleDrop={(e) => {
                              setValue("instructorSignature", e);
                              handleUploadFile(e);
                            }}
                            className=" cursor-pointer p-[11px] mt-2"
                          >
                            <div className="flex items-center gap-2 sm:mb-0 mb-3 font-semibold font-abhaya w-[323px] ">
                              <span className="border p-1 rounded-md text-[#515151]">
                                Choose File
                              </span>
                              <span className="p-0">No file chosen</span>
                            </div>
                            {imagepending && <Loader />}
                          </FileUpload>
                          {errors?.instructorSignature && (
                            <ErrorMessage
                              message={
                                errors?.instructorSignature?.message as string
                              }
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="mt-5 text-center ">
                    <Button
                      type="submit"
                      className="py-[10px] px-[30px] bg-[#58BA66] text-color rounded-sm inline-block lg:mt-0 w-full"
                    >
                      SAVE CERTIFICATE
                    </Button>
                  </div>
                </div>
                {update_Panding && <Loader />}
              </form>
            </div>
          </div>
        )}
      </div>
      <Loading isLoading={update_Panding} />
    </div>
  );
};

export default Addcertificate;
