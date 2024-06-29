import { Button } from "@/components/ui/button";
import { CirclePlus, CircleX, Link } from "lucide-react";
import UploadContent from "./UploadContent";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionCreation } from "@/types/modulecreation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/services/apiServices/moduleCreation";
import { Label } from "@/components/ui/label";
import { UseFieldArrayRemove, useFieldArray } from "react-hook-form";
import FormError from "@/components/comman/FormError";

interface ModuleCreationItemsProps {
  index: number;
  moduleListlength: number;
  register: any;
  removeModule: UseFieldArrayRemove;
  watch: any;
  control: any;
  setValue: any;
  errors: any;
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
}: ModuleCreationItemsProps) => {
  const [sectionIndex, setSectionIndex] = useState(0);

  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: `modules.${index}.section`,
  });

  const { mutate: uploadAttechment } = useMutation({
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

  const handleFileSelect = (e: any, sectionIndex: number) => {
    setSectionIndex(sectionIndex);
    const file = e.target.files[0];
    uploadAttechment(file);
  };


  return (
    <div className="">
      <div className="border border-[#D9D9D9] rounded-lg mb-5">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h4 className="font-bold font-calibri text-xl pb-4">
              Module {moduleListlength ? moduleListlength + 1 : index + 1}
            </h4>
            {(index !== 0 || moduleListlength > 0) && (
              <Button
                type="button"
                onClick={() => removeModule(index)}
                className="text-[#FF5252] text-sm bg-transparent hover:bg-transparent font-calibri"
              >
                <CircleX className="me-1" width={18} />
                Add Remove
              </Button>
            )}
          </div>
          <div className="">
            <h6 className="text-base font-calibri text-[#515151] pb-2">
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
          console.log('sectionItem', sectionItem, `modules.${index}.section.${sectionIndex}`);

          return (
            <div key={index} className="p-5 border-t border-[#D9D9D9]">
              <div className="pb-5">
                <div className="pb-2 flex justify-between items-center">
                  <h6 className="text-base font-calibri text-[#515151]">
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
                    <h6 className="text-base flex items-center font-calibri text-[#515151]">
                      <Switch
                        checked={sectionItem.isLive}
                        onCheckedChange={(val) => {
                          setValue(
                            `modules.${index}.section.${sectionindex}.isLive`,
                            val
                          )
                        }}
                        className="me-3"
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
                <h6 className="text-base font-calibri text-[#515151] pb-2">
                  Information{" "}
                  <span className="text-xs">(Max 1000words only)</span>
                </h6>
                <Textarea
                  {...register(
                    `modules.${index}.section.${sectionindex}.information`
                  )}
                  className="px-4 py-5 w-full h-[150px] border border-[#D9D9D9] rounded-md text-base font-calibri text-black outline-none"
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
                    ?.uploadedContentUrl?.uploadContentType?.youtubeUrl && !sectionItem.youtubeUrl && !sectionItem.uploadedContentUrl && (
                      <FormError
                        className="font-calibri not-italic"
                        message={
                          errors.modules?.[index]?.section?.[sectionindex]
                            ?.uploadedContentUrl?.uploadContentType?.youtubeUrl?.message
                        }
                      />
                    )}
                  <div className="pb-5">
                    <h6 className="text-base font-calibri text-[#515151] pb-2">
                      OR Enter Youtube Video URL
                    </h6>
                    <Input
                      {...register(
                        `modules.${index}.section.${sectionindex}.youtubeUrl`
                      )}
                      className="border border-[#D9D9D9] rounded-md px-4 py-3 w-full outline-none text-base text-[#1D2026] font-calibri"
                    />
                    {errors.modules?.[index]?.section?.[sectionindex]
                      ?.youtubeUrl && (
                        <FormError
                          className="font-calibri not-italic"
                          message={
                            errors.modules[index].section[sectionindex].youtubeUrl
                              ?.message
                          }
                        />
                      )}
                  </div>
                  <div className="pb-5">
                    <h6 className="text-base font-calibri text-[#515151] pb-2">
                      Upload Related Document to Download
                      <span className="text-xs">
                        (Supported File:- .Pdf, .Ppt, docx)
                      </span>
                    </h6>
                    <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full flex justify-between items-center">
                      <input
                        placeholder={sectionItem.uploadDocument?.split("/").at(-1)}
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
                          onChange={(e) => handleFileSelect(e, sectionindex)}
                        />
                      </Label>
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
                <div className="">
                  <div className="flex">
                    <div className="">
                      <h6 className="text-base text-[#515151] font-calibri pb-3">
                        Section Duration (HH)
                      </h6>
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                        {/* <Textarea className="border-none w-full outline-none text-sm text-black" /> */}
                        <Input
                          type="number"
                          {...register(
                            `modules.${index}.section.${sectionindex}.livesessionDuration.hour`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) }
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
                      <h6 className="text-base text-[#515151] font-calibri pb-3">
                        Section Minute (MM)
                      </h6>
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                        <Input
                          value={sectionItem.livesessionDuration?.minute}
                          {...register(
                            `modules.${index}.section.${sectionindex}.livesessionDuration.minute`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) }
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
                      <h6 className="text-base text-[#515151] font-calibri pb-3">
                        Section Seconds (SS)
                      </h6>
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                        <Input
                          {...register(
                            `modules.${index}.section.${sectionindex}.livesessionDuration.second`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) }
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
                </div>
              )}
            </div>
          )
        })}
        <div className="text-right px-5 pb-5">
          <Button
            type="button"
            className="bg-[#42A7C3] px-4 py-2 me-4 font-inter text-xs"
          >
            <CirclePlus width={20} className="me-2" /> Add Assessment
          </Button>
          <Button
            type="button"
            onClick={() => appendSection({ ...intialSectionCreation })}
            className="bg-[#42A7C3] px-4 py-2 font-inter text-xs"
          >
            <CirclePlus width={20} className="me-2" /> Add More Section
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleCreationItems;
