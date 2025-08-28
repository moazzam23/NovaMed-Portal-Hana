import React,{useState} from 'react'
import { Form } from 'react-bootstrap';
export default function CheckboxSelectField() {
    const [options, setOptions] = useState([
        { label: 'Option 1', checked: false },
        { label: 'Option 2', checked: false },
        { label: 'Option 3', checked: false },
      ]);
      const handleCheckboxChange = (index) => {
        const newOptions = [...options];
        newOptions[index].checked = !newOptions[index].checked;
        setOptions(newOptions);
      };
  return (
    <div>
        <Form.Select multiple>
      {options.map((option, index) => (
        <option key={index}>
          <Form.Check
            type="checkbox"
            label={option.label}
            checked={option.checked}
            onChange={() => handleCheckboxChange(index)}
          />
        </option>
      ))}
    </Form.Select>
    </div>
  )
}
