import FormError from "@/components/comman/FormError";
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
import CKEditorComponent from "@/components/comman/JoditEditor";

interface SectionFormProps {
  sectionID?: number;
  handleRemoveSection: () => void;
  getValues: any;
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  isLoading: boolean;
}

const SectionForm = ({
  errors,
  watch,
  setValue,
  register,
  sectionID,
  isLoading,
  handleRemoveSection,
}: SectionFormProps) => {
  const [attechmentName, setAttechment] = useState("");
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
      console.log("error", error);
    },
  });

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
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

  return (
    <div className="p-5 border-t border-[#D9D9D9]">
      <div className="pb-5">
        <div className="pb-2 flex justify-between items-center">
          <h6 className="text-base font-calibri text-[#515151]">
            Section Title
          </h6>
          <div className="flex items-center">
            <Button
              type="button"
              onClick={() => handleRemoveSection()}
              className="text-[#FF5252] flex items-center text-sm bg-transparent hover:bg-transparent font-calibri"
            >
              <CircleX className="me-1" width={18} />
              {sectionID ? "Cancel Editing" : "Add Remove"}
            </Button>
            <h6 className="text-base flex items-center font-calibri text-[#515151]">
              <Switch
                checked={section.isLive}
                onCheckedChange={() => {
                  setValue(`isLive`, !section.isLive);
                }}
                className="me-3"
              />
              Live Session
            </h6>
          </div>
        </div>
        <Input
          {...register("sectionTitle")}
          className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
        />
        {errors?.sectionTitle && (
          <FormError
            className="font-calibri not-italic"
            message={errors?.sectionTitle?.message}
          />
        )}
      </div>
      <div className="pb-5">
        <h6 className="text-base font-calibri text-[#515151] pb-2">
          Information <span className="text-xs">(Max 1000words only)</span>
        </h6>
        <CKEditorComponent
          value={watch("information")}
          {...register("information")}
          onChange={(e, data) => {
              console.log("e", e);
              setValue("information",data.getData()
            );
          }}
          className="w-full"
        />
        {errors?.information && (
          <FormError
            className="font-calibri not-italic"
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
          />
          {errors.youtubeUrl &&
            !section.youtubeUrl &&
            !section.uploadedContentUrl && (
              <FormError
                className="font-calibri not-italic"
                message={errors?.youtubeUrl?.message}
              />
            )}
          <div className="pb-5">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
              OR Enter Youtube Video URL
            </h6>
            <Input
              {...register("youtubeUrl")}
              className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
            />
            {errors?.youtubeUrl && (
              <FormError
                className="font-calibri not-italic"
                message={errors?.youtubeUrl?.message}
              />
            )}
          </div>
          <div className="pb-5">
            <div className="flex items-center justify-between">
              <h6 className="text-base font-calibri text-[#515151] pb-2">
                Upload Related Document to Download
                <span className="text-xs">
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
                  Remove File
                </Button>
              )}
            </div>
            <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full flex justify-between items-center">
              <input
                placeholder={attechmentName}
                className="border-bone w-full outline-none text-base text-[#606060] font-calibri"
                disabled
              />
              <Label
                htmlFor="AttechmentUpload"
                className="bg-[#42A7C3] flex items-center min-w-[144px] font-bold text-xs font-calibri text-white px-2 py-3 rounded-lg"
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
              className="font-calibri not-italic"
              message={errors.uploadDocument?.message}
            />
          )}
        </>
      ) : (
        <div className="">
          <div className="flex">
            <div className="">
              <h6 className="text-base text-[#515151] font-calibri pb-3">
                Section Duration (HH)
              </h6>
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                {/* <Textarea className="border-none w-full outline-none text-sm text-black" /> */}
                <Input
                  {...register(`livesessionDuration.hour`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  type="number"
                  className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                />
                <h6 className="text-[10px] text-[#515151] font-calibri">
                  Hours
                </h6>
              </div>
              {errors?.livesessionDuration?.hour && (
                <FormError
                  className="font-calibri not-italic"
                  message={errors?.livesessionDuration?.hour?.message}
                />
              )}
            </div>
            <div className="">
              <h6 className="text-base text-[#515151] font-calibri pb-3">
                Section Minute (MM)
              </h6>
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                <Input
                  type="number"
                  {...register(`livesessionDuration.minute`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                />
                <h6 className="text-[10px] text-[#515151] font-calibri">
                  Minute
                </h6>
              </div>
              {errors?.livesessionDuration?.minute && (
                <FormError
                  className="font-calibri not-italic"
                  message={errors?.livesessionDuration?.minute?.message}
                />
              )}
            </div>
            <div className="">
              <h6 className="text-base text-[#515151] font-calibri pb-3">
                Section Seconds (SS)
              </h6>
              <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                <Input
                  type="number"
                  {...register(`livesessionDuration.second`, {
                    setValueAs: (value: string) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="border-none h-[20px] w-full outline-none text-sm text-black p-0"
                />
                <h6 className="text-[10px] text-[#515151] font-calibri">
                  Second
                </h6>
              </div>
              {errors?.livesessionDuration?.second && (
                <FormError
                  className="font-calibri not-italic"
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
            className="bg-[#58BA66] px-5 py-3 font-inter text-md"
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
