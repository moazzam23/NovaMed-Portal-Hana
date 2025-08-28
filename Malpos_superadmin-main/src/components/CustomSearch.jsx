import { Form } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomSearch = ({ value, onChange }) => {
  return (
    <div style={{ position: "relative" }}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="search-pl"
        value={value}
        onChange={onChange}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      >
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </span>
    </div>
  );
};

export default CustomSearch;
