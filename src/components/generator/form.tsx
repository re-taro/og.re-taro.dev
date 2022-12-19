import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";

import type { OgImageOption } from "@/types/og";

import { Input } from "../shared/form/input";

type FormProps = {
  register: UseFormRegister<OgImageOption>;
};

export const Form: FC<FormProps> = ({ register }) => {
  return (
    <>
      <Input
        {...register("title")}
        label="Title"
        size="lg"
        placeholder="Title text"
      />
      <Input
        {...register("date")}
        label="Date"
        size="sm"
        placeholder="Date text with format of (YYYY-MM-DD)"
      />
      <Input
        {...register("domain")}
        label="Domain"
        size="sm"
        placeholder="Domain text"
      />
    </>
  );
};
