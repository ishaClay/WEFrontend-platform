
import ErrorMessage from '@/components/comman/Error/ErrorMessage';
import Loading from '@/components/comman/Error/Loading';
import FileUpload from '@/components/comman/FileUpload';
import { Button } from '@/components/ui/button';
import { InputWithLable } from '@/components/ui/inputwithlable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { QUERY_KEYS } from '@/lib/constants';
import { createSupportTicket, fetchSupportTicketCompany } from '@/services/apiServices/supportRequestServices';
import { SubmitPayload, SupportTicketCompanyType } from '@/types/SupportRequest';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { FiImage, FiVideo } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { z } from 'zod';

function SupportAddNewTicket() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const {clientId} = useSelector((state: any) => state.user);
    const [selectAssignTo, setSelectAssignTo] = useState("");
    const [selectTicketPriority, setSelectTicketPriority] = useState("");
    const [file, setFile] = useState("");
    const [video, setVideo] = useState<any>(undefined);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    const schema = z.object({
        assignTo: z.string({ required_error: "Assign To is required" }),
        ticketPriority: z.string({ required_error: "Ticket Priority is required" }),
        ticketSubject: z.string({ required_error: "Ticket Subject is required" }).min(1, { message: "Ticket Subject is required" }),
        description: z.string({ required_error: "Description is required" }).min(1, { message: "Description is required" }),
        uploadDocument: z.string({ required_error: "Upload Document is required" }).optional(),
        uploadVideo: z.string({ required_error: "Upload Video is required" }).optional(),
    });

    type ValidationSchema = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm<ValidationSchema>({
        resolver: zodResolver(schema),
        mode: "all",
    });

    const { data: fetchSupportCompany, isPending: supportCompanyPending } = useQuery({
        queryKey: [QUERY_KEYS.fetchSupportTicketCompany],
        queryFn: () => fetchSupportTicketCompany(String(clientId), String(user?.query?.role)),
        enabled: true
    });

    const { mutate: createSupportRequestTicket, isPending: createPanding } =
        useMutation({
            mutationFn: (e: SubmitPayload) => createSupportTicket(e),
            onSuccess: () => {
                reset()
                setFile("")
                setVideo(undefined)
                toast({ title: "Ticket created Successfully", variant: "default" });
                // redirect('/support-request')
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.supportTicketList],
                });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                });
            },
        });

    const onSubmit = (data: FieldValues) => {
        const payload: SubmitPayload = {
            assignTo: +data.assignTo,
            priority: data.ticketPriority,
            subject: data.ticketSubject,
            description: data.description,
            documentUrl: data.uploadDocument ? data.uploadDocument : "",
            videoUrl: data.uploadVideo ? data.uploadVideo : "",
            openBy: user?.query?.id,
            email: user?.query?.email
        }
        createSupportRequestTicket(payload)
    }


    return (
        <div className="h-full bg-[white] rounded-[10px] font-nunitoSans overflow-auto">
            <div className="h-[70px] border-b-2 border-solid gray flex justify-between items-center pl-[20px] pr-[28px] ">
                <h2 className="font-[700] text-[16px]">Add New Ticket</h2>
                {/* <div>
					<button
						onClick={() =>
							dispatch(
								setPath([{ name: "Support Request", link: "support-request" }])
							)
						}
						className="text-[16px] font-[600] flex items-center gap-[15px] "
					>
						<HiOutlineArrowNarrowLeft />
						Back
					</button>
				</div> */}
            </div>
            <div className="p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-[36px] mb-5">
                        <div className="w-full">
                            <Select
                                onValueChange={(e) => {
                                    setValue("assignTo", e);
                                    setSelectAssignTo(e as string);
                                }}
                                value={selectAssignTo}
                                {...register("assignTo")}
                            >
                                <SelectGroup>
                                    <SelectLabel className="mb-[11px] text-base p-0 font-[600]">
                                        Assign To <span className="text-red-400">*</span>
                                    </SelectLabel>
                                    <SelectTrigger
                                        className={`w-full px-[15px] py-4 h-[52px] placeholder:text-neutral-400 `}>
                                        <SelectValue placeholder={`Select Name`} />
                                    </SelectTrigger>
                                </SelectGroup>
                                <SelectContent>
                                    {
                                        supportCompanyPending ? <span className='flex justify-center py-3'><Loader2 className='w-5 h-5 animate-spin' /></span> : 
                                        fetchSupportCompany?.data?.data.length > 0 ? fetchSupportCompany?.data?.data?.map((item: SupportTicketCompanyType) => {
                                            return <>
                                                {item?.clientDetails && <SelectItem key={item.id} value={String(item?.clientDetails?.id)}><span className="w-[150px] text-neutral-400 inline-block text-left">Client Admin</span> <span className="mr-10 text-neutral-400">--</span> {item?.clientDetails?.name}</SelectItem>}
                                                {item?.trainerCompanyDetails && <SelectItem key={item.id} value={String(item?.trainerCompanyDetails?.id)}><span className="w-[150px] text-neutral-400 inline-block text-left">Trainer Provider</span> <span className="mr-10 text-neutral-400">--</span> {item?.trainerCompanyDetails?.providerName}</SelectItem>}
                                            </>
                                        }) : <span>No data found</span>
                                    }
                                </SelectContent>
                            </Select>
                            {
                                !errors?.assignTo?.ref?.value && <ErrorMessage message={errors?.assignTo?.message as string} />
                            }
                        </div>
                        <div className="w-full">
                            <Select onValueChange={(e) => { setValue("ticketPriority", e); setSelectTicketPriority(e) }}
                                value={selectTicketPriority}
                                {...register("ticketPriority")}
                            >
                                <SelectGroup>
                                    <SelectLabel className="mb-[11px] text-base p-0 font-[600]">
                                        Ticket Priority <span className="text-red-400">*</span>
                                    </SelectLabel>
                                    <SelectTrigger
                                        className={`w-full px-[15px] py-4 h-[52px] placeholder:text-neutral-400 `}>
                                        <SelectValue placeholder={`Select Name`} />
                                    </SelectTrigger>
                                </SelectGroup>
                                <SelectContent>
                                    <SelectItem value={"Poor"}>Poor</SelectItem>
                                    <SelectItem value={"Normal"}>Normal</SelectItem>
                                    <SelectItem value={"High"}>High</SelectItem>
                                </SelectContent>
                            </Select>
                            {
                                !errors?.ticketPriority?.ref?.value && <ErrorMessage message={errors?.ticketPriority?.message as string} />
                            }
                        </div>
                    </div>
                    <InputWithLable
                        label="Ticket Subject"
                        type="text"
                        placeholder="Enter ticket subject"
                        className={`text-[16px] h-[52px] bg-white px-5 py-[15px]`}
                        isMendatory
                        {...register("ticketSubject")}
                    />
                    {
                        errors?.ticketSubject && <ErrorMessage message={errors?.ticketSubject?.message as string} />
                    }
                    <div className="mt-5">
                        <Label className="mb-[10px] text-base p-0 font-[600] block">Description <span className="text-red-400">*</span></Label>
                        <Textarea
                            className="px-[13px] py-21px] resize-none bg-white border border-solid border-[#d9d9d9]"
                            placeholder="Enter details"
                            rows={8}
                            {...register("description")}
                        />
                        {
                            errors?.description && <ErrorMessage message={errors?.description?.message as string} />
                        }
                    </div>
                    <div className="flex justify-between mt-[34px]">
                        <div className="flex gap-[32px]">
                            <FileUpload
                                handleDrop={(e) => { setValue("uploadDocument", e); setFile(e) }}
                                className="border-none cursor-pointer !p-0 w-[200px]"
                                acceptType=".pdf"
                            >
                                <div className="flex justify-center items-center gap-[17px]">
                                    <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                                        <FiImage className="w-6 h-6" />
                                    </div>
                                    <span>Upload Document</span>
                                </div>
                                {
                                    file && <a href={file} target="_blank" rel="noreferrer" className="mt-3 w-full overflow-hidden text-ellipsis">
                                        {file}
                                    </a>
                                }
                            </FileUpload>
                            <FileUpload
                                handleDrop={(e) => { setValue("uploadVideo", e); setVideo(e) }}
                                className="border-none cursor-pointer !p-0 w-[200px]"
                                acceptType=".mp4"
                            >
                                <div className="flex justify-center items-center gap-[17px]">
                                    <div className="flex items-center justify-center bg-[#E3E5F5] h-[42px] w-[42px] rounded-full ">
                                        <FiVideo className="w-6 h-6" />
                                    </div>
                                    <span>Upload Video</span>
                                </div>
                                {
                                    video && <video
                                        src={video}
                                        className="w-full h-[100px] rounded-sm mt-3 object-cover"></video>
                                }
                            </FileUpload>
                        </div>
                        <div>
                            <Button className="py-[15px] px-[30px]">SUBMIT</Button>
                        </div>
                    </div>
                </form>
            </div>
            <Loading isLoading={createPanding} />
        </div>
    )
}

export default SupportAddNewTicket;