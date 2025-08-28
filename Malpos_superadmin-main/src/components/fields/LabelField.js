import React from "react";
import { Form } from "react-bootstrap";
import { Box, Input, Label, Select, Option } from "../elements";

export default function LabelField({
  label,
  labelDir,
  fieldSize,
  option,
  type,
  placeholder,
  required,
  ...rest
}) {
  return (
    <Box
      className={`mc-label-field-group ${label ? labelDir || "label-col" : ""}`}
    >
      {label && <Label className="mc-label-field-title">{label}</Label>}
      {type ? (
        <Input
          required={required}
          type={type || "text"}
          placeholder={placeholder || "Type here..."}
          className={`mc-label-field-input px-20 ${
            fieldSize || "w-md h-sm"
          } pl-4 pr-4 pt-3 pb-3 `}
          {...rest}
        />
      ) : (
        <Select
          className={`mc-label-field-select  ${fieldSize || "w-md h-sm"} px-3 `}
          {...rest}
        >
          {option.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
}
