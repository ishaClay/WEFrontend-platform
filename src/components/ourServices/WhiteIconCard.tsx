import { FC } from "react";

interface iconProps {
  imgsrc: string;
  headone: string;
  textone: string;
  texttwo?: string;
}

const WhiteIconCard: FC<iconProps> = ({
  headone,
  textone,
  texttwo,
  imgsrc,
}) => {
  return (
    <>
      <div
        className="p-[20px] mb-[10px] rounded-[10px] border-[1px] border-[#dee2e6] bg-[#ffffff] justify-center items-center"
        style={{ height: "-webkit-fill-available" }}
      >
        <div className="mb-3">
          <img src={imgsrc} className="w-[80px] h-[80px] mx-auto " />
        </div>
        <div className="flex flex-col text-center mb-[20px]">
          <h1 className="font-[700] text-headingtext text-[20px] font-primary leading-[24px] mb-[7px] ">
            {headone}
          </h1>
          <p className="text-headingtext font-primary text-[16px] font-[400] leading-[24px] ">
            {textone} <br /> {texttwo}
          </p>
        </div>
      </div>
    </>
  );
};

export default WhiteIconCard;
