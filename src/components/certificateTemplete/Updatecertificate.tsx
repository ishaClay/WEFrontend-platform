import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import InputWithLabel from "../comman/InputWithLabel";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "../comman/Error/ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import Loader from "../comman/Loader";
import { uploadFile } from "@/services/apiServices/uploadServices";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { fetchcertificate } from "@/services/apiServices/certificate";

const Addcertificate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filename, setFilename] = useState<string>("");
  // const UserId = useSelector((state: RootState) => state?.user);
  // const userData = JSON.parse(localStorage.getItem("user") as string);
  const schema = z.object({
    templateName: z.string({ required_error: "Template Name is required" }),
    backgroundImage: z.instanceof(File, {
      message: "backgroundImage is required",
    }),
    logoImage: z.instanceof(File, {
      message: "logoImage is required",
    }),
    title: z.string({ required_error: "Certificate Title is required" }),
    employeName: z.string({ required_error: "Employee Name is required" }),
    bodyText: z.string({ required_error: "Body is required" }),

    administratorTitle: z.string({
      required_error: "Administrator Title is required",
    }),
    instructorTitle: z.string({
      required_error: "Instructor Title is required",
    }),
    administratorSignature: z.instanceof(File, {
      message: "administrator Signature is required",
    }),
    instructorSignature: z.instanceof(File, {
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

  const { data: fetchSinglecertificate, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.employeeDetails, { id: params.id }],
    queryFn: () => fetchcertificate(params.id!),
  });

  const isValue = watch();
  useEffect(() => {
    setValue("templateName", fetchSinglecertificate?.data?.templateName);
    setValue("backgroundImage", fetchSinglecertificate?.data?.backgroundImage);
    setValue("logoImage", fetchSinglecertificate?.data?.logoImage);
    setValue("title", fetchSinglecertificate?.data?.title);
    setValue("bodyText", fetchSinglecertificate?.data?.bodyText);
    setValue(
      "administratorTitle",
      fetchSinglecertificate?.data?.administratorTitle
    );
    setValue(
      "administratorSignature",
      fetchSinglecertificate?.data?.administratorSignature
    );
    setValue("instructorTitle", fetchSinglecertificate?.data?.instructorTitle);
    setValue(
      "instructorSignature",
      fetchSinglecertificate?.data?.instructorTitle
    );
  }, [fetchSinglecertificate]);

  const { mutate: createImageUpload, isPending: imagepending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      toast({ title: "Image Uploaded Successfully", variant: "default" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getSingleCourse],
      });
      console.log("filenamefilename",filename);
      if (filename) {
        console.log(filename,"filename==============")
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
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      createImageUpload(files[0]);
      setFilename(name.toString());
    }
    if (name) {
      setFilename(name.toString());
    }
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("hello");
    console.log(data, "data=================");
    console.log(isValue, "isvalue==============");

    // console.log(data, "certificatedata===========");
    // const payload: CertificateSubmitPayload = {
    //   user: userData?.query?.id,
    //   templateName: data.templateName,
    //   backgroundImage: data.backgroundImage,
    //   logoImage: data.logoImage,
    //   title: data.title,
    //   employeName: data.employeName,
    //   bodyText: data.bodyText,
    //   administratorTitle: data.administratorTitle,
    //   administratorSignature: data.administratorSignature,
    //   instructorTitle: data.instructorTitle,
    //   instructorSignature: data.instructorSignature,
    // };
    // createCertificatetemplate(payload);
  };

  return (
    <div className="lg:bg-white bg-transparent rounded-xl">
      <div className="border-b-2 border-solid gray flex justify-between items-center p-[16px]">
        <div>
          <h2 className="font-[700] text-[16px] font-abhaya">
            Add New Certificate
          </h2>
        </div>
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-[16px] flex font-semibold items-center gap-[15px]"
          >
            <HiOutlineArrowNarrowLeft />
            Back
          </button>
        </div>
      </div>
      <div className="p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {isValue && (
              <div className="sticky top-0 h-[501px]">
                <div className="relative h-[80vh] w-full">
                  <div className="absolute inset-0">
                    {isValue?.backgroundImage && (
                      <img
                        src={`${isValue?.backgroundImage}`}
                        className="object-cover w-full h-full"
                        alt="Background"
                      />
                    )}
                  </div>
                  <div className="absolute top-[10%] left-[40%] w-[200px] ">
                    {isValue?.logoImage && (
                      <img
                        src={`${isValue?.logoImage}`}
                        className="object-cover"
                        alt="Logo"
                      />
                    )}
                  </div>

                  <div className="absolute top-[22%] w-full text-center ">
                    <div>
                      <h1 className="text-2xl font-abhaya uppercase ">
                        {isValue?.templateName}
                      </h1>
                      <h1 className="capitalize text-lg font-abhaya mt-[10px]">
                        {isValue?.title}
                      </h1>
                    </div>
                    <div>
                      <h1 className=" font-abhaya text-4xl font-mediummt-[10px] border-black">
                        {isValue?.employeName}
                      </h1>
                    </div>

                    <div className=" p-4 mt-[10px]">
                      <p className="text-[14px] font-abhaya">
                        {isValue?.bodyText}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 p-2 gap-2 mt-[20px]">
                      <div className="grid grid-cols-2 gap-3 ">
                        <div className="">
                          {isValue?.administratorTitle && (
                            <h1 className="font-abhaya text-2xl capitalize border-t border-black">
                              {isValue?.administratorTitle}
                            </h1>
                          )}
                          {isValue?.administratorTitle && (
                            <span className="font-abhaya text-xl ">
                              Head Of Marketing
                            </span>
                          )}
                        </div>
                        <div className=" w-[150px] h-[50px]">
                          {isValue?.administratorSignature && (
                            <img
                              src={`${isValue?.administratorSignature}`}
                              className="object-contain w-[50px]"
                            />
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 ">
                        <div className=" w-[150px] h-[50px]">
                          {isValue?.instructorSignature && (
                            <img
                              src={`${isValue?.instructorSignature}`}
                              className="object-contain w-[50px]"
                            />
                          )}
                        </div>
                        <div className="">
                          {isValue?.instructorTitle && (
                            <h1 className="font-abhaya text-2xl capitalize border-t border-black">
                              {isValue?.instructorTitle}
                            </h1>
                          )}
                          {isValue?.instructorTitle && (
                            <span className="font-abhaya text-xl ">
                              President Director
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="rounded-lg">
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Template
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                          <InputWithLabel
                            label="Certificate Template Name"
                            type="text"
                            value={isValue?.templateName}
                            className="border mt-2 p-3"
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

                  <div className="border mt-5 p-2 rounded-lg">
                    <div className="mt-2 p-2">
                      <h2 className="font-semibold font-abhaya mb-5">
                        Upload Background Image
                      </h2>
                      <div>
                        <Input
                          type="file"
                          className="w-[300px]"
                          accept=".jpg,.png"
                          name="backgroundImage"
                          onChange={(e) => handleUploadFile(e)}
                        />
                        {imagepending && <Loader />}
                        <h3 className="text-[#A3A3A3] font-abhaya mt-2">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                    <div className="mt-2 p-2">
                      <h2 className="font-semibold font-abhaya mb-5">
                        Upload Logo Image
                      </h2>
                      <div>
                        <Input
                          type="file"
                          className="w-[300px]"
                          accept=".jpg,.png"
                          name="logoImage"
                          onChange={(e) => handleUploadFile(e)}
                        />
                        {imagepending && <Loader />}
                        <h3 className="text-[#A3A3A3] font-abhaya mt-2">
                          Accepted Files: JPG, PNG <br />
                          Accepted Size: 1030 x 734
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg mt-5 ">
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">
                            Certificate Title
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                          <InputWithLabel
                            label="Enter Certificate Title"
                            type="text"
                            value={isValue?.title}
                            className="border  mt-2 p-3"
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
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">
                            Employee Name
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                          <InputWithLabel
                            label="Employee Name"
                            type="text"
                            className="border mt-2 p-3"
                            placeholder="Employee name"
                            {...register("employeName")}
                          />
                          {errors?.employeName && (
                            <ErrorMessage
                              message={errors?.employeName?.message as string}
                            />
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="rounded-lg mt-5">
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">Body</h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                          <InputWithLabel
                            label="Enter certificate body text"
                            type="text"
                            className="border mt-2 p-3"
                            value={isValue?.bodyText}
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

                  <div className="rounded-lg mt-5">
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 01
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3 ">
                          <InputWithLabel
                            label="Title"
                            value={isValue?.administratorTitle}
                            type="text"
                            className="border p-3 mt-2"
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

                        <AccordionContent className="p-3 pt-0">
                          <InputWithLabel
                            type="file"
                            className="w-[300px] mt-2"
                            label="Signature"
                            name="administratorSignature"
                            onChange={(e) => handleUploadFile(e)}
                          />
                          {imagepending && <Loader />}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="rounded-lg mt-5">
                    <Accordion type="single" collapsible className="p-0">
                      <AccordionItem value="item-1" className="p-0">
                        <AccordionTrigger className="p-3 border-b">
                          <h2 className="font-semibold font-abhaya">
                            Signature Title 02
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-3">
                          <InputWithLabel
                            label="Title"
                            type="text"
                            value={isValue?.instructorTitle}
                            className="border mt-2 p-3"
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
                          <InputWithLabel
                            type="file"
                            className="w-[300px] mt-2"
                            label="Signature"
                            name="instructorSignature"
                            onChange={(e) => handleUploadFile(e)}
                          />
                          {imagepending && <Loader />}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="mt-5 text-center">
                    <Button className="py-[10px] px-[30px] bg-[#58BA66] text-color rounded-sm inline-block lg:mt-0 ">
                      ADD CERTIFICATE
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Addcertificate;
