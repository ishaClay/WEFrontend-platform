import FormError from "@/components/comman/FormError";
import CKEditorComponent from "@/components/comman/JoditEditor";
import Loader from "@/components/comman/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from "@/services/apiServices/moduleCreation";
import { useMutation } from "@tanstack/react-query";
import { CircleX, Link, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import UploadContent from "./UploadContent";

interface SectionFormProps {
  sectionID?: number;
  handleRemoveSection: () => void;
  getValues: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  setErrors: any;
  isLoading: boolean;
  urlError: string;
  setUrlError: (e: any) => void;
  setInformationError: (e: any) => void;
}

const SectionForm = ({
  errors,
  watch,
  setValue,
  register,
  sectionID,
  isLoading,
  urlError,
  setUrlError,
  setErrors,
  setInformationError,
  handleRemoveSection,
}: SectionFormProps) => {
  const [attechmentName, setAttechment] = useState("");
  const [charCount, setCharCount] = useState(0);

  const section = watch();
  useEffect(() => {
    if (sectionID) {
      const attechment =
        section.uploadDocument && section.uploadDocument.split("/").at(-1);
      setAttechment(attechment || "");
    }
  }, [sectionID]);

  const handleRemoveFile = () => {
    setValue("uploadDocument", "");
    setAttechment("");
  };

  const { mutate: uploadAttechment, isPending } = useMutation({
    mutationFn: (data: any) => uploadFile(data),
    onSuccess: (data: any) => {
      setValue("uploadDocument", data.data.data.file);
      const filename = data.data.data.file.split("/").at(-1);
      setAttechment(filename);
    },
    onError: (error: any) => {
      console.error("error", error);
    },
  });

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (!file?.name.match(/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)?$/)) {
      toast({
        variant: "destructive",
        title:
          "Invalid file name. please use only letters, digits, underscores, hyphens, and a single period.",
      });
      return;
    }
    if (
      file.name?.split(".").pop() === "pdf" ||
      file.name?.split(".").pop() === "docx" ||
      file.name?.split(".").pop() === "pptx" ||
      file.name?.split(".").pop() === "ppt"
    ) {
      uploadAttechment(file);
      setAttechment(file.name);
    } else {
      toast({
        title: "Invalid file type",
        description: "Only pdf, docx, pptx files are allowed",
        variant: "destructive",
      });
    }
  };

  const handleAddURL = (e: string, name: any) => {
    if (
      !e.match(
        /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:music\.)?youtu(?:\.be|\.com)\/(?:(?:embed\/|e\/|v\/|watch\?v=|watch\/\S*\/)?)([\w\-]{11})(?:\S*)?$/
      )
    ) {
      setUrlError("please enter valid YouTube URL");
    } else {
      setUrlError("");
      setValue(name, e);
    }
  };

  const stripHtmlTags = (html: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="p-5 border-t border-[#D9D9D9]">
      <div className="pb-5">
        <div className="pb-2 flex justify-between items-center">
          <h6 className="text-base font-droid text-[#515151]">Section Title</h6>
          <div className="flex items-center">
            <Button
              type="button"
              onClick={() => handleRemoveSection()}
              className="text-[#FF5252] flex items-center text-sm bg-transparent hover:bg-transparent font-droid"
            >
              <CircleX className="me-1" width={18} />
              {sectionID ? "Cancel" : "Remove"}
            </Button>
            <h6 className="text-base flex items-center font-droid text-[#515151]">
              <Switch
                checked={section.isLive}
                onCheckedChange={() => {
                  setValue(`isLive`, !section.isLive);
                  setErrors("information", { message: "" });
                }}
                className={`me-3 text-[#0F172A] ${
                  sectionID ? "pointer-events-none" : ""
                }`}
              />
              Live Session
            </h6>
          </div>
        </div>
        <Input
          {...register("sectionTitle")}
          className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full  text-base text-[#1D2026] font-droid"
        />
        {errors?.sectionTitle && (
          <FormError
            className="font-droid not-italic"
            message={errors?.sectionTitle?.message}
          />
        )}
      </div>
      <div className="pb-5">
        <h6 className="text-base font-droid text-[#515151] pb-2">
          Information{" "}
          <span className="text-xs">(Max 5000 characters only)</span>
        </h6>
        <div className="relative">
          <CKEditorComponent
            value={watch("information")}
            {...register("information")}
            onChange={(_, editor) => {
              const data = editor.getData();
              const plainText = stripHtmlTags(data);

              if (plainText.length > 5000) {
                setCharCount(5000);
                setInformationError("It should be Max 5000 chracters only");
                setValue(`information`, data);
              } else {
                setCharCount(plainText.length);
                setInformationError("");
                setValue(`information`, data);
              }
            }}
            className="w-full h-[190px]"
          />
          <div className="absolute bottom-0 right-0 p-2 text-sm text-[#606060]">
            {charCount}/5000
          </div>
        </div>
        {errors?.information && (
          <FormError
            className="font-droid not-italic"
            message={errors.information?.message}
          />
        )}
      </div>
      {!section.isLive ? (
        <>
          <UploadContent
            errors={errors}
            register={register}
            setValue={setValue}
            data={section}
            setUrlError={setUrlError}
          />
          <div className="pb-5">
            <h6 className="text-base font-droid text-[#515151] pb-2">
              OR Enter Youtube Video URL
            </h6>
            <Input
              {...register("youtubeUrl")}
              onChange={(e: any) =>
                handleAddURL(e?.target?.value, `youtubeUrl`)
              }
              disabled={section?.uploadContentType > 0}
              className={`border border-[#D9D9D9] rounded-md px-4 py-3 w-full  text-base text-[#1D2026] font-droid
                ${
                  section?.uploadContentType > 0
                    ? "bg-[#FBFBFB] border-[#d7d7d7]"
                    : ""
                }`}
            />
            {errors?.youtubeUrl ||
              (urlError && (
                <FormError
                  className="font-droid not-italic"
                  message={errors?.youtubeUrl?.message || urlError}
                />
              ))}
          </div>
          <div className="pb-5">
            <div className="flex items-center justify-between">
              <h6 className="text-base font-droid text-[#515151] pb-2">
                Upload Related Document to Download
                <span className="text-xs ml-1">
                  (Supported File:- .Pdf, .Ppt, docx)
                </span>
              </h6>
              {attechmentName && (
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={handleRemoveFile}
                  className="p-0 h-auto hover:bg-transparent text-[#ff0000]"
                >
                  Remove
                </Button>
              )}
            </div>
            <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full flex justify-between items-center">
              <input
                placeholder={attechmentName}
                className="border-bone w-full  text-base text-[#606060] font-droid focus:border focus:border-[#4b4b4b] shadow-none outline-none"
                disabled
              />
              <Label
                htmlFor="AttechmentUpload"
                className="bg-[#42A7C3] flex items-center min-w-[150px] font-medium text-xs font-droid text-white px-2 py-3 rounded-lg"
              >
                <Link width={20} className="me-2" />
                Upload Attachment
                <input
                  type="file"
                  className="hidden"
                  id="AttechmentUpload"
                  accept=".pdf,.ppt,.docx, .pptx"
                  onChange={(e) => handleFileSelect(e)}
                />
              </Label>
              {isPending && <Loader containerClassName="h-auto ml-3" />}
            </div>
          </div>
          {errors?.uploadDocument && (
            <FormError
              className="font-droid not-italic"
              message={errors.uploadDocument?.message}
            />
          )}
          <div className="mb-5">
            <h5 className="text-[#515151] text-sm font-droid pb-2">
              Duration (Reading or Watching Time)
            </h5>
            <div className="flex sm:flex-row flex-col gap-5">
              <div className="sm:w-[145px] sm:h-[46px] h-9 w-full">
                <div className="flex justify-between items-center relative">
                  <Input
                    type="number"
                    {...register(`readingTime.hour`, {
                      setValueAs: (value: string) =>
                        value === "" ? undefined : Number(value),
                    })}
                    defaultValue={watch("readingTime.hour")}
                    className="w-full p-3 pr-10 text-sm text-black h-full"
                  />
                  <h6 className="text-[10px] text-[#515151] font-droid absolute right-0 pr-3">
                    Hour
                  </h6>
                </div>
                {errors.readingTime?.hour && (
                  <FormError
                    className="font-droid not-italic"
                    message={errors.readingTime?.hour?.message}
                  />
                )}
              </div>
              <div className="sm:w-[145px] sm:h-[46px] h-9 w-full">
                <div className="flex justify-between items-center relative">
                  <Input
                    type="number"
                    {...register(`readingTime.minute`, {
                      setValueAs: (value: string) =>
                        value === "" ? undefined : Number(value),
                    })}
                    defaultValue={watch("readingTime.minute")}
                    className="p-3 w-full pr-12 text-sm text-black h-full"
                  />
                  <h6 className="text-[10px] text-[#515151] font-droid absolute right-3">
                    Minute
                  </h6>
                </div>
                {errors?.readingTime?.minute && (
                  <FormError
                    className="font-droid not-italic"
                    message={errors.readingTime?.minute?.message}
                  />
                )}
              </div>
              <div className="sm:w-[145px] sm:h-[46px] h-9 w-full">
                <div className="flex justify-between items-center relative">
                  <Input
                    type="number"
                    {...register("readingTime.second", {
                      setValueAs: (value: string) =>
                        value === "" ? undefined : Number(value),
                    })}
                    defaultValue={watch("readingTime.second")}
                    className="p-3 w-full pr-12 text-sm text-black h-full"
                  />
                  <h6 className="text-[10px] text-[#515151] font-droid absolute right-3">
                    Second
                  </h6>
                </div>
                {errors?.readingTime?.second && (
                  <FormError
                    className="font-droid not-italic"
                    message={errors.readingTime?.second?.message}
                  />
                )}
              </div>
            </div>
          </div>
          {errors.youtubeUrl &&
            !section.youtubeUrl &&
            !section.uploadedContentUrl && (
              <FormError
                className="font-droid not-italic"
                message={errors?.youtubeUrl?.message}
              />
            )}
        </>
      ) : (
        <div className="">
          <div className="flex">
            <div className="">
              <h6 className="text-base text-[#515151] font-droid pb-3">
                Section Duration (HH)
              </h6>
              <div className="h-11 w-[145px] me-5 flex justify-between items-center relative">
                {/* <Textarea className="border-none w-full  text-sm text-black" /> */}
                <Input
                  {...register(`livesessionDuration.hour`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  type="number"
                  min={0}
                  defaultValue={watch("livesessionDuration.hour") || 0}
                  className="w-full p-3 pr-10 text-sm text-black h-full"
                />
                <h6 className="text-[10px] text-[#515151] font-droid absolute right-3">
                  Hours
                </h6>
              </div>
              {errors?.livesessionDuration?.hour && (
                <FormError
                  className="font-droid not-italic"
                  message={errors?.livesessionDuration?.hour?.message}
                />
              )}
            </div>
            <div className="">
              <h6 className="text-base text-[#515151] font-droid pb-3">
                Section Minute (MM)
              </h6>
              <div className="h-11 w-[145px] me-5 flex justify-between items-center relative">
                <Input
                  type="number"
                  {...register(`livesessionDuration.minute`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  min={0}
                  defaultValue={watch("livesessionDuration.minute") || 0}
                  className="w-full p-3 pr-12 text-sm text-black h-full"
                />
                <h6 className="text-[10px] text-[#515151] font-droid absolute right-3">
                  Minute
                </h6>
              </div>
              {errors?.livesessionDuration?.minute && (
                <FormError
                  className="font-droid not-italic"
                  message={errors?.livesessionDuration?.minute?.message}
                />
              )}
            </div>
            <div className="">
              <h6 className="text-base text-[#515151] font-droid pb-3">
                Section Seconds (SS)
              </h6>
              <div className="h-11 w-[145px] me-5 flex justify-between items-center relative">
                <Input
                  type="number"
                  {...register(`livesessionDuration.second`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  min={0}
                  defaultValue={watch("livesessionDuration.second") || 0}
                  className="w-full p-3 pr-12 text-sm text-black h-full"
                />
                <h6 className="text-[10px] text-[#515151] font-droid absolute right-3">
                  Second
                </h6>
              </div>
              {errors?.livesessionDuration?.second && (
                <FormError
                  className="font-droid not-italic"
                  message={errors?.livesessionDuration?.second?.message}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {sectionID && (
        <div className="text-right m-5">
          <Button
            type="submit"
            // onClick={handleSectionSave}
            className="bg-[#58BA66] px-5 py-3 font-droid text-md"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />} Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionForm;
