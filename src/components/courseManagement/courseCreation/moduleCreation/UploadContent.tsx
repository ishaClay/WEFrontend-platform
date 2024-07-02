import uploadImg from "@/assets/images/drop_file-img.png";
import Modal from "@/components/comman/Modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleX } from "lucide-react";
import { DragEvent, useEffect, useState } from "react";
import SelectDoumentType from "./SelectDoumentType";
import { Input } from "@/components/ui/input";
import { SectionCreation } from "@/types/modulecreation";
import { Label } from "@/components/ui/label";
import { fileValidation, getFileType } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "@/services/apiServices/moduleCreation";
import FormError from "@/components/comman/FormError";
import { useToast } from "@/components/ui/use-toast";

interface UploadContentProps {
  data: SectionCreation;
  moduleIndex?: number;
  sectionIndex?: number;
  register: any;
  setValue: any;
  errors: any;
}

const UploadContent = ({
  errors,
  register,
  setValue,
  data,
  moduleIndex,
  sectionIndex,
}: UploadContentProps) => {
  const [isOpenUploadDocumnet, setIsOpenUploadDocumnet] = useState(false);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  //@ts-ignore
  const FileType = getFileType(data.uploadContentType);


  useEffect(() => {
    if (data.uploadedContentUrl) {
      const filename = data.uploadedContentUrl.split("/").at(-1);
      setFileName(filename || "");
      setUploadProgress(100);
    }
  }, [data]);

  const onSelectedDocumentType = (type: number) => {
    setIsOpenUploadDocumnet(false);
    if (moduleIndex !== undefined && sectionIndex !== undefined) {
      setValue(
        `modules.${moduleIndex}.section.${sectionIndex}.uploadContentType`,
        type
      );
    } else {
      setValue(
        `uploadContentType`,
        type
      );
    }
  };

  const progress = (val: any) => {
    setUploadProgress(val);
  };

  const { mutate: FileUpload } = useMutation({
    mutationFn: (data: any) => uploadFile(data, progress),
    onSuccess: (data) => {
      if (moduleIndex !== undefined && sectionIndex !== undefined) {
        setValue(
          `modules.${moduleIndex}.section.${sectionIndex}.uploadedContentUrl`,
          data.data.data.file
        );
      } else {
        setValue(
          `uploadedContentUrl`,
          data.data.data.file
        );
      }
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    setDragging(false);
    event.preventDefault();
  };

  const removeFile = () => {
    if (moduleIndex !== undefined && sectionIndex !== undefined) {
      setValue(
        `modules.${moduleIndex}.section.${sectionIndex}.uploadedContentUrl`,
        ""
      );
    } else {
      setValue(
        `uploadedContentUrl`,
        ""
      );
    }
    setFileName("");
    setUploadProgress(0);
  };

  const handleDropEvent = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const validate = fileValidation(file.name, FileType?.fileType)
      if (validate) {
        setFileName(file.name);
        setUploadProgress(0);
        FileUpload(file);
      } else {
        toast({
          variant: 'destructive',
          title: `Only ${FileType?.fileType.join(', ')} files are allowed.`,
        })
      }
    }
  };

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const validate = fileValidation(file.name, FileType?.fileType)
      if (validate) {
        setFileName(file.name);
        setUploadProgress(0);
        FileUpload(file);
      } else {
        toast({
          variant: 'destructive',
          title: `Only ${FileType?.fileType.join(', ')} files are allowed.`,
        })
      }
    }
  };

  console.log("🚀 ~ FileType:", FileType)


  let registerkey;
  let errorkey;
  if (moduleIndex !== undefined && sectionIndex !== undefined) {
    registerkey = `modules.${moduleIndex}.section.${sectionIndex}.`;
    errorkey = errors.modules?.[moduleIndex]?.section?.[sectionIndex];
  } else {
    registerkey = "";
    errorkey = errors;
  }


  return (
    <div className="">
      {!data.uploadContentType ? (
        <div className="pb-5">
          <h6 className="text-base font-calibri text-[#515151] pb-2">
            Upload Content
          </h6>
          <div className="border border-[#D9D9D9] rounded-md px-4 py-2 w-full">
            <Button
              type="button"
              className="bg-[#42A7C3] font-bold text-xs font-calibri"
              onClick={() => setIsOpenUploadDocumnet(true)}
            >
              Select Upload Document Type
            </Button>
          </div>
          {errorkey?.uploadContentType && (
            <FormError
              className="font-calibri not-italic"
              message={errorkey.uploadContentType?.message}
            />
          )}
        </div>
      ) : (
        <div className="pb-4">
          <h6 className="text-base font-calibri text-[#515151] pb-2">
            Upload Content
          </h6>
          <div className="p-4 border border-[#D9D9D9] rounded-md bg-[#FBFBFB]">
            <div className="flex items-center">
              <div className="w-2/5">
                <div className="text-sm font-calibri font-normal text-[#515151] flex items-center mb-[18px]">
                  Selected Document Type :{" "}
                  <img
                    src={FileType && FileType.image}
                    alt="Selected Document"
                    className="h-6 w-6"
                  />
                </div>
                <Label
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDropEvent}
                  // htmlFor="fileUpload"
                  className={` bg-white p-5 border border-[#D9D9D9] border-dashed inline-block w-full rounded-lg ${dragging ? "border-blue-500" : ""
                    }`}
                >
                  <div className="text-center">
                    <img src={uploadImg} alt="" className="mx-auto mb-5" />
                    <h6 className="text-[#9E9E9E] text-xs font-calibri pb-4">
                      Drag and drop files here
                    </h6>
                    <h6 className="text-[#9E9E9E] text-xs font-calibri font-bold pb-4">
                      -OR-
                    </h6>
                    <Label
                      htmlFor="fileUpload"
                      className="py-3 px-7 bg-[#42A7C3] text-xs font-calibri cursor-pointer rounded text-white"
                    >
                      {/* <Button className="py-3 px-7 bg-[#42A7C3] text-xs font-calibri"> */}
                      Browse Files
                      {/* </Button> */}
                      <input
                        type="file"
                        className="hidden"
                        id="fileUpload"
                        accept={FileType && FileType.fileTypeText}
                        onChange={(e) => handleFileSelect(e)}
                      />
                    </Label>
                  </div>
                </Label>
              </div>
              <div className="w-3/5 p-5">
                <div className="2xl:ps-10 ps-0">
                  <div className="flex justify-between items-center pb-3">
                    <h5 className="text-black text-sm font-calibri">
                      Upload Document
                    </h5>
                    <h6 className="font-calibri text-[10px]">
                      Supported File:- {FileType && FileType.fileTypeText}
                    </h6>
                  </div>
                  <div className="p-5 bg-white rounded-lg shadow-sm relative mb-5">
                    <div className="flex">
                      <div className="">
                        <img
                          src={FileType && FileType.image}
                          alt="Selected Document"
                          className="h-6 w-6"
                        />
                      </div>
                      <div className="flex justify-between items-center ps-5 w-full">
                        <h5 className="text-xs text-black font-calibri">
                          {fileName}
                        </h5>
                        {uploadProgress === 100 && (
                          <h6 className="text-[#159800] text-[10px] font-calibri">
                            Completed
                          </h6>
                        )}
                      </div>
                    </div>
                    <div className="pt-5">
                      <Progress
                        color="#159800"
                        className="w-full h-[3px]"
                        value={uploadProgress}
                      />
                    </div>
                    {fileName && (
                      <div
                        onClick={removeFile}
                        className="absolute top-[5px] right-[5px]"
                      >
                        <CircleX width={16} />
                      </div>
                    )}
                  </div>
                  {errorkey?.uploadedContentUrl && (
                    <FormError
                      className="font-calibri not-italic"
                      message={errorkey.uploadedContentUrl?.message}
                    />
                  )}
                  <div className="">
                    <h5 className="text-[#515151] text-sm font-calibri pb-3">
                      Reading Time
                    </h5>
                    <div className="flex">
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                        <Input
                          type="number"
                          {...register(`${registerkey}readingTime.hour`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) })}
                          className="border-none w-full outline-none text-sm text-black h-[20px]"
                        />
                        <h6 className="text-[10px] text-[#515151] font-calibri">
                          Hour
                        </h6>
                      </div>
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] me-5 flex justify-between items-center">
                        <Input
                          type="number"
                          {...register(`${registerkey}readingTime.minute`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) })}
                          value={data.readingTime.minute}
                          className="border-none w-full outline-none text-sm text-black h-[20px]"
                        />
                        <h6 className="text-[10px] text-[#515151] font-calibri">
                          Minute
                        </h6>
                      </div>
                      <div className="border border-[#D9D9D9] rounded-md p-3 w-[145px] flex justify-between items-center">
                        <Input
                          type="number"
                          {...register(`${registerkey}readingTime.second`, { setValueAs: (value: string) => value === '' ? undefined : Number(value) })}
                          className="border-none w-full outline-none text-sm text-black h-[20px]"
                        />
                        <h6 className="text-[10px] text-[#515151] font-calibri">
                          Second
                        </h6>
                      </div>
                    </div>
                    {errorkey?.readingTime?.hour && (
                      <FormError
                        className="font-calibri not-italic"
                        message={errorkey.readingTime?.hour?.message}
                      />
                    )}
                    {errorkey?.readingTime?.minute && (
                      <FormError
                        className="font-calibri not-italic"
                        message={errorkey.readingTime?.minute?.message}
                      />
                    )}
                    {errorkey?.readingTime?.second && (
                      <FormError
                        className="font-calibri not-italic"
                        message={errorkey.readingTime?.minute?.second}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={isOpenUploadDocumnet}
        onClose={() => setIsOpenUploadDocumnet(false)}
        className="max-w-3xl"
      >
        <SelectDoumentType
          onSelectedDocumentType={(e) => onSelectedDocumentType(e)}
        />
      </Modal>
    </div>
  );
};

export default UploadContent;
