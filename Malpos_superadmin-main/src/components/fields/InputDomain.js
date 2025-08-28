import React from 'react'
import { Form ,InputGroup} from 'react-bootstrap'
export default function InputDomain() {
  return (
    <div>
        <label class="mc-label-field-title label-sub-domain"> Sub domain</label>
         <InputGroup className="input-domain">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>
    </div>
  )
}
