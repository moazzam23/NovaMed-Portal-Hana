import { Form } from "react-bootstrap";

export default function SelectField({
  label,
  name,
  type,
  placeholder,
  options,
  value,
  onChange,
  ...props
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
