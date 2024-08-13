import FormError from "@/components/comman/FormError";
import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "@/services/apiServices/moduleCreation";
import { SectionCreation } from "@/types/modulecreation";
import { useMutation } from "@tanstack/react-query";
import { CirclePlus, CircleX, Link } from "lucide-react";
import { useState } from "react";
import { UseFieldArrayRemove, useFieldArray } from "react-hook-form";
import AssessmentModal from "../courseView/AssessmentModal";
import UploadContent from "./UploadContent";

interface ModuleCreationItemsProps {
  index: number;
  moduleListlength: number;
  register: any;
  removeModule: UseFieldArrayRemove;
  watch: any;
  control: any;
  setValue: any;
  errors: any;
  setUrlError: ((e: any) => void | undefined) | any;
  urlError?: string
}

const intialSectionCreation: SectionCreation = {
  sectionTitle: "",
  information: "",
  uploadContentType: 0,
  uploadedContentUrl: "",
  readingTime: {
    hour: 0,
    minute: 0,
    second: 0,
  },
  youtubeUrl: "",
  uploadDocument: "",
  isLive: false,
  livesessionDuration: {
    hour: 0,
    minute: 0,
    second: 0,
  },
};

const ModuleCreationItems = ({
  register,
  control,
  errors,
  setValue,
  index,
  removeModule,
  watch,
  moduleListlength,
  urlError,
  setUrlError
}: ModuleCreationItemsProps) => {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isOpenAssessmentModal, setIsOpenAssessmentModal] = useState(false);
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: `modules.${index}.section`,
  });

  const { mutate: uploadAttechment, isPending } = useMutation({
    mutationFn: (data: any) => uploadFile(data),
    onSuccess: (data: any) => {
      setValue(
        `modules.${index}.section.${sectionIndex}.uploadDocument`,
        data.data.data.file
      );
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  const handleRemoveFile = (sectionIndex: number) => {
    setValue(`modules.${index}.section.${sectionIndex}.uploadDocument`, "");
  };

  const handleFileSelect = (e: any, sectionIndex: number) => {
    setSectionIndex(sectionIndex);
    const file = e.target.files[0];

    if (
      file.name?.split(".").pop() === "pdf" ||
      file.name?.split(".").pop() === "docx" ||
      file.name?.split(".").pop() === "pptx" ||
      file.name?.split(".").pop() === "ppt"
    ) {
      uploadAttechment(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Only pdf, docx, pptx files are allowed",
        variant: "destructive",
      });
    }
  };

  const handleAddURL = (e:string, name: any) => {
    if(!e.match(/^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:music\.)?youtu(?:\.be|\.com)\/(?:(?:embed\/|e\/|v\/|watch\?v=|watch\/\S*\/)?)([\w\-]{11})(?:\S*)?$/)){
      setUrlError("please enter Invalid YouTube URL");
    }else{
      setUrlError("");
      setValue(name, e);
    }
  }

  console.log("watchwatch123", watch());

  return (
    <div className="border border-[#D9D9D9] rounded-lg mb-5">
      <div className="sm:p-5 p-4">
        <div className="flex justify-between items-center pb-4">
          <h4 className="font-bold font-calibri sm:text-xl text-base">
            Module {moduleListlength ? moduleListlength + 1 : index + 1}
          </h4>
          {(index !== 0 || moduleListlength > 0) && (
            <Button
              type="button"
              onClick={() => removeModule(index)}
              className="text-[#FF5252] text-sm bg-transparent hover:bg-transparent font-calibri p-0 gap-1 h-auto"
            >
              <CircleX width={16} />
              Remove
            </Button>
          )}
        </div>
        <div className="">
          <h6 className="sm:text-base text-sm font-calibri text-[#515151] pb-2">
            Module Title
          </h6>
          <Input
            {...register(`modules.${index}.moduleTitle`)}
            className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
          />
          {errors.modules?.[index]?.moduleTitle && (
            // <span className="font-primary text-xs font-calibri text-red-500">{errors.modules[index].moduleTitle?.message}</span>
            <FormError
              className="font-calibri not-italic"
              message={errors.modules?.[index]?.moduleTitle?.message}
            />
          )}
        </div>
      </div>
      {sections.map((_: any, sectionindex: number) => {
        const sectionItem = watch(`modules.${index}.section.${sectionindex}`);

        return (
          <div key={index} className="sm:p-5 p-4 border-t border-[#D9D9D9]">
            <div className="pb-5">
              <div className="pb-2 flex flex-wrap justify-between items-center ">
                <h6 className="sm:text-base text-sm font-calibri text-[#515151]">
                  Section Title
                </h6>
                <div className="flex items-center">
                  {sectionindex !== 0 && (
                    <Button
                      onClick={() => removeSection(sectionindex)}
                      className="text-[#FF5252] flex items-center text-sm bg-transparent hover:bg-transparent font-calibri"
                    >
                      <CircleX className="me-1" width={18} />
                      Add Remove
                    </Button>
                  )}
                  <h6 className="sm:text-base text-sm flex gap-2 items-center font-calibri text-[#515151]">
                    <Switch
                      checked={sectionItem?.isLive}
                      onCheckedChange={(val) => {
                        setValue(
                          `modules.${index}.section.${sectionindex}.isLive`,
                          val
                        );
                      }}
                    />
                    Live Session
                  </h6>
                </div>
              </div>
              <Input
                {...register(
                  `modules.${index}.section.${sectionindex}.sectionTitle`
                )}
                className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
              />
              {errors.modules?.[index]?.section?.[sectionindex]
                ?.sectionTitle && (
                <FormError
                  className="font-calibri not-italic"
                  message={
                    errors.modules[index].section[sectionindex].sectionTitle
                      ?.message
                  }
                />
              )}
            </div>
            <div className="pb-5">
              <h6 className="sm:text-base text-sm font-calibri text-[#515151] pb-2">
                Information{" "}
                <span className="text-xs">(Max 1000words only)</span>
              </h6>
              <CKEditorComponent
                value={watch("information")}
                {...register(
                  `modules.${index}.section.${sectionindex}.information`
                )}
                onChange={(e, data) => {
                  console.log("e", e);
                  setValue(
                    `modules.${index}.section.${sectionindex}.information`,
                    data.getData()
                  );
                }}
                className="w-full"
              />
              {errors.modules?.[index]?.section?.[sectionindex]
                ?.information && (
                <FormError
                  className="font-calibri not-italic"
                  message={
                    errors.modules[index].section[sectionindex].information
                      ?.message
                  }
                />
              )}
            </div>
            {!sectionItem.isLive ? (
              <>
                <UploadContent
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  data={sectionItem}
                  moduleIndex={index}
                  sectionIndex={sectionindex}
                />
                {errors.modules?.[index]?.section?.[sectionindex]
                  ?.uploadedContentUrl?.uploadContentType?.youtubeUrl &&
                  !sectionItem.youtubeUrl &&
                  !sectionItem.uploadedContentUrl && (
                    <FormError
                      className="font-calibri not-italic"
                      message={
                        errors.modules?.[index]?.section?.[sectionindex]
                          ?.uploadedContentUrl?.uploadContentType?.youtubeUrl
                          ?.message
                      }
                    />
                  )}
                <div className="pb-5">
                  <h6 className="sm:text-base text-sm font-calibri text-[#515151] pb-2">
                    OR Enter Youtube Video URL
                  </h6>
                  <Input
                    {...register(
                      `modules.${index}.section.${sectionindex}.youtubeUrl`
                    )}
                    onChange={(e:any) => handleAddURL(e?.target?.value, `modules.${index}.section.${sectionindex}.youtubeUrl`)}
                    className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
                  />
                  {errors.modules?.[index]?.section?.[sectionindex]
                    ?.youtubeUrl || urlError && (
                    <FormError
                      className="font-calibri not-italic"
                      message={
                        errors?.modules?.[index]?.section?.[sectionindex]?.youtubeUrl
                          ?.message || urlError
                      }
                    />
                  )}
                </div>
                <div className="">
                  <div className="flex items-center justify-between pb-2">
                    <h6 className="sm:text-base text-sm font-calibri text-[#515151]">
                      Upload Related Document to Download
                      <span className="text-xs">
                        (Supported File:- .Pdf, .Ppt, docx)
                      </span>
                    </h6>
                    {sectionItem.uploadDocument && (
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() => handleRemoveFile(sectionindex)}
                        className="p-0 h-auto hover:bg-transparent text-[#ff0000]"
                      >
                        Remove File
                      </Button>
                    )}
                  </div>
                  <div className="border border-[#D9D9D9] rounded-md sm:px-4 sm:py-2 p-2 w-full flex justify-between items-center">
                    <input
                      placeholder={sectionItem.uploadDocument
                        ?.split("/")
                        .at(-1)}
                      className="border-bone w-full outline-none sm:text-base text-sm bg-transparent text-[#606060] font-calibri"
                      disabled
                    />
                    <Label
                      htmlFor="AttechmentUpload"
                      className="bg-[#42A7C3] flex sm:h-10 h-8 items-center min-w-[144px] font-bold text-xs font-calibri text-white px-2 sm:py-3 py-1 rounded-lg"
                    >
                      {" "}
                      <Link width={18} className="me-2" />
                      Upload Attachment
                      <input
                        type="file"
                        className="hidden"
                        id="AttechmentUpload"
                        accept=".pdf,.ppt,.docx,.pptx"
                        onChange={(e) => handleFileSelect(e, sectionindex)}
                      />
                    </Label>
                    {isPending && <Loader containerClassName="h-auto ml-3" />}
                  </div>
                </div>
                {errors.modules?.[index]?.section?.[sectionindex]
                  ?.uploadDocument && (
                  <FormError
                    className="font-calibri not-italic"
                    message={
                      errors.modules[index].section[sectionindex].uploadDocument
                        ?.message
                    }
                  />
                )}
              </>
            ) : (
              <div className="flex sm:flex-row flex-col gap-5">
                <div className="">
                  <h6 className="sm:text-base text-sm text-[#515151] font-calibri pb-3">
                    Section Duration (HH)
                  </h6>
                  <div className="border border-[#D9D9D9] rounded-md p-3 sm:w-[145px] sm:h-[53px] h-9 w-full flex justify-between items-center">
                    {/* <Textarea className="border-none w-full outline-none text-sm text-black" /> */}
                    <Input
                      type="number"
                      {...register(
                        `modules.${index}.section.${sectionindex}.livesessionDuration.hour`,
                        {
                          setValueAs: (value: string) =>
                            value === "" ? undefined : Number(value),
                        }
                      )}
                      className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                    />
                    <h6 className="text-[10px] text-[#515151] font-calibri">
                      Hours
                    </h6>
                  </div>
                </div>
                {errors.modules?.[index]?.section?.[sectionindex]
                  ?.livesessionDuration?.hour && (
                  <FormError
                    className="font-calibri not-italic"
                    message={
                      errors.modules?.[index]?.section?.[sectionindex]
                        ?.livesessionDuration?.hour?.message
                    }
                  />
                )}
                <div className="">
                  <h6 className="sm:text-base text-sm text-[#515151] font-calibri pb-3">
                    Section Minute (MM)
                  </h6>
                  <div className="border border-[#D9D9D9] rounded-md p-3 sm:w-[145px] w-full sm:h-[53px] h-9 flex justify-between items-center">
                    <Input
                      value={sectionItem.livesessionDuration?.minute}
                      {...register(
                        `modules.${index}.section.${sectionindex}.livesessionDuration.minute`,
                        {
                          setValueAs: (value: string) =>
                            value === "" ? undefined : Number(value),
                        }
                      )}
                      type="number"
                      className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                    />
                    <h6 className="text-[10px] text-[#515151] font-calibri">
                      Minute
                    </h6>
                  </div>
                  {errors.modules?.[index]?.section?.[sectionindex]
                    ?.livesessionDuration?.minute && (
                    <FormError
                      className="font-calibri not-italic"
                      message={
                        errors.modules?.[index]?.section?.[sectionindex]
                          ?.livesessionDuration?.minute?.message
                      }
                    />
                  )}
                </div>
                <div className="">
                  <h6 className="sm:text-base text-sm text-[#515151] font-calibri pb-3">
                    Section Seconds (SS)
                  </h6>
                  <div className="border border-[#D9D9D9] rounded-md p-3 sm:w-[145px] w-full sm:h-[53px] h-9 flex justify-between items-center">
                    <Input
                      {...register(
                        `modules.${index}.section.${sectionindex}.livesessionDuration.second`,
                        {
                          setValueAs: (value: string) =>
                            value === "" ? undefined : Number(value),
                        }
                      )}
                      type="number"
                      className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                    />
                    <h6 className="text-[10px] text-[#515151] font-calibri">
                      Second
                    </h6>
                  </div>
                  {errors.modules?.[index]?.section?.[sectionindex]
                    ?.livesessionDuration?.second && (
                    <FormError
                      className="font-calibri not-italic"
                      message={
                        errors.modules?.[index]?.section?.[sectionindex]
                          ?.livesessionDuration.second?.message
                      }
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="flex sm:justify-end justify-center sm:gap-4 gap-2.5 sm:px-5 px-4 sm:pb-5 pb-4">
        <Button
          type="button"
          className="bg-[#42A7C3] sm:px-2 px-1 py-2 font-inter text-xs sm:gap-2 gap-1 sm:w-[141px] w-[131px] h-9"
          onClick={() => setIsOpenAssessmentModal(true)}
          disabled
        >
          <CirclePlus width={18} /> Add Assessment
        </Button>
        <Button
          type="button"
          onClick={() => appendSection({ ...intialSectionCreation })}
          className="bg-[#42A7C3] sm:px-2 px-1 py-2 font-inter text-xs sm:gap-2 gap-1 sm:w-[147px] w-[133px] h-9"
        >
          <CirclePlus width={18} /> Add More Section
        </Button>
      </div>
      <Modal
        open={isOpenAssessmentModal}
        onClose={() => setIsOpenAssessmentModal(false)}
        className="max-w-3xl"
      >
        <AssessmentModal setIsOpenAssessmentModal={setIsOpenAssessmentModal} />
      </Modal>
    </div>
  );
};

export default ModuleCreationItems;
