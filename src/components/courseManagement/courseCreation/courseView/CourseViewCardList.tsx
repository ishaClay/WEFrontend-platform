import FormError from "@/components/comman/FormError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { QUERY_KEYS } from "@/lib/constants";
import { calculateTotalReadingTime } from "@/lib/utils";
import {
  deleteModule,
  updateModule,
} from "@/services/apiServices/moduleCreation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dot, FilePenLine, Trash2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

type CourseViewCardProps = {
  data: {
    title: string;
    section: any[];
    reading: string;
    id: number;
  };
};
const CourseViewCardList = ({ data }: CourseViewCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const schema = z.object({
    moduleTitle: z.string().min(1, "Module Title is required"),
  });

  type ValidationSchema = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  const reading = calculateTotalReadingTime(data.section);
  // const reading = 0;

  console.log("🚀 ~ CourseViewCardList ~ data:", data.id);

  const { mutate: DeleteModule } = useMutation({
    mutationFn: (moduleId: number) => deleteModule(moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Module deleted successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error in deleting module",
      });
    },
  });

  const { mutate: UpdateModule } = useMutation({
    mutationFn: (module: any) => updateModule(module, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.fetchAllCourseModule],
      });
      toast({
        variant: "success",
        title: "Module updated successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error in updating module",
      });
    },
  });

  const onEditModule = () => {
    setIsEdit(true);
    setValue("moduleTitle", data.title);
  };

  const onSubmit = (data: FieldValues) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const title = watch("moduleTitle");

    UpdateModule(title);
    setIsEdit(false);
  };

  console.log("data=====>", data);

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex items-center justify-between gap-4">
        {!isEdit ? (
          <div>
            <h3 className="text-base font-bold font-calibri sm:pb-2 pb-1 text-left">
              Module: {data.title}
            </h3>
            <div className="flex items-center">
              <h6 className="text-xs text-[#313131] font-inter pe-4">
                Section: {data.section?.length}
              </h6>
              <h6 className="text-xs text-[#313131] font-inter flex items-center">
                <Dot />
                {reading}
              </h6>
            </div>
          </div>
        ) : (
          <div>
            <Input {...register("moduleTitle")} />
            {errors?.moduleTitle && (
              <FormError
                className="font-calibri not-italic"
                message={errors.moduleTitle?.message}
              />
            )}
          </div>
        )}
        {!isEdit ? (
          <div
            className="flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <FilePenLine
              width={18}
              className="me-3 text-[#575757] cursor-pointer"
              onClick={() => onEditModule()}
            />
            <Trash2
              width={18}
              className="me-3 text-[#575757] cursor-pointer"
              onClick={() => DeleteModule(data.id)}
            />
          </div>
        ) : (
          <div
            className="flex items-center gap-2 mr-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button type="submit" className="text-sm font-nunito">
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsEdit(false);
                reset();
              }}
              className="text-sm font-nunito"
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CourseViewCardList;
