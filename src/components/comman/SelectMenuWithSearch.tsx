/* eslint-disable @typescript-eslint/ban-ts-comment */
import { OptionType } from "@/types/common";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import Loader from "./Loader";

type SelectMenuWithSearchProps = {
  options: OptionType[];
  onChange: (value: string) => void;
  value: string;
  placeholder?: string;
  isLoading?: boolean;
};
export default function SelectMenuWithSearch({
  options,
  onChange,
  value,
  placeholder,
  isLoading,
}: SelectMenuWithSearchProps) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="w-full">
      <Combobox
        value={selectedOption}
        onChange={(val: any) => {
          // @ts-ignore
          onChange(val?.value);
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative border border-border bg-white rounded-md ">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 px-4 py-[14px] text-sm/6",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            displayValue={(option: OptionType) => option?.label}
            onChange={(event: any) => setQuery(event.target.value)}
            // value={query}
            placeholder={placeholder}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDown className="size-4 " />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {isLoading ? (
            <Loader containerClassName="h-[50px]" />
          ) : (
            filteredOptions.map((option) => (
              <ComboboxOption
                key={option.value}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6">{option.label}</div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
