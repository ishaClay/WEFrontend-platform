import profile_image from "@/assets/images/face_1.jfif";

const EmployeeMessagView = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="min-w-10 min-h-10 w-10 h-10 rounded-full overflow-hidden">
        <img src={profile_image} alt="" className="" />
      </div>
      <h3 className="text-lg font-abhaya font-semibold text-black">
        Messaging
      </h3>
    </div>
  );
};

export default EmployeeMessagView;
