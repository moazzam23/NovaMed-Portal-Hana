import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Box } from "../elements";

export default function MultiSelectField({ title, options, value, onChange }) {
  const [selected, setSelected] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelected(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value);
    onChange(selectedIds);
  };

  
  return (
    <Box className="multi-select-opt">
      <label>{title}</label>
      <MultiSelect
        options={options}
        value={value}
        onChange={handleChange}
        labelledBy="Select"
        hasSelectAll={false}
      />
    </Box>
  );
}
