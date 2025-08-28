import React from "react";
import { Form } from "react-bootstrap";

export default function CustomSelect({ options }) {
  return (
    <Form.Select>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          <Form.Check type="checkbox" label={option.label} />
        </option>
      ))}
    </Form.Select>
  );
}