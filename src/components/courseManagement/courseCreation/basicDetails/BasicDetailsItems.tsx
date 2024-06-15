import React from "react";

const BasicDetailsItems = ({ data }: { data: any }) => {
  return (
    <div>
      <div className="pb-4">
        <h6 className="text-base text-[#515151] font-calibri pb-3">
          {data.qestion}
        </h6>
        <input
          placeholder={data.answer}
          className="border border-[#D9D9D9] rounded-md w-full px-4 py-3 outline-none font-base font-calibri text-[#1D2026]"
        />
      </div>
    </div>
  );
};

export default BasicDetailsItems;
