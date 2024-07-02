const SelectDoumentTypeItems = ({ data, onClick }: { data: any, onClick: () => void }) => {
  return (
    <div className="w-1/4">
      <div className="w-[120px] h-[120px] border border-[#D9D9D9] rounded-md mx-5 flex justify-center items-center my-4 hover:border-[#58BA66]" onClick={onClick}>
        <img src={data.documentSelectOption} />
      </div>
    </div>
  );
};

export default SelectDoumentTypeItems;
