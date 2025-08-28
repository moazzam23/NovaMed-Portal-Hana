import React from "react";
import { FormProvider } from "react-hook-form";

export default function FormGeneric({
  useFormReturn,
  children,
  className,
  onSubmit,
}) {
  const { handleSubmit } = useFormReturn;
  return (
    <FormProvider {...useFormReturn}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}