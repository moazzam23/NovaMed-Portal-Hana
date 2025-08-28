// import React, { useState } from "react";
// import { Col, Row, Form } from "react-bootstrap";
// import { Box } from "../elements";
// import { Table } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import data from "../../data/master/categoriesList.json";

// export default function AccountsCatTab() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleWindow = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <div>
//       <Box className="category-ingredients">
//         <Box className="category-ingredients-left">
//           <Col md={12}>
//             <Row>
//               <Col md={4}>
//                 <div style={{ position: "relative" }}>
//                   <Form.Control
//                     type="search"
//                     placeholder="Search"
//                     className="search-pl"
//                   />
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: "50%",
//                       right: "10px",
//                       transform: "translateY(-50%)",
//                     }}
//                   >
//                     <button type="submit">
//                       <FontAwesomeIcon icon={faSearch} />
//                     </button>
//                   </span>
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//         </Box>
//         <Box className="category-ingredients-right">
//           <Col md={12}>
//             <Row>
//               <Col md={8}></Col>

//               <Col md={4} className="cateMenu-btn-col-6">
//                 <button className="cateMenu-btn">+ Create</button>
//               </Col>
//             </Row>
//           </Col>
//         </Box>
//       </Box>
//       <Box className="tabContent">
//         <Col md={12}>
//           <Row>
//             <Col md={12}>
//               <Table>
//                 <thead className="thead-recipe">
//                   <tr>
//                     <th>Name</th>

//                     <th className="text-end-td">...</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data?.accountingCategory.tbody.map((item, i) => (
//                     <tr key={i}>
//                       <td>{item.heading}</td>
//                       <td className="text-end-td ">
//                         <button
//                           onClick={handleWindow}
//                           className="accounts-Tab-dot-box Tab-dot-box"
//                         >
//                           {isOpen && (
//                             <Box className="dot-box-details">
//                               <Box className="inner-dot-box-details">
//                                 <Box className="inner-dot-box-item dot-box-item-border ">
//                                   Edit
//                                 </Box>
//                                 <Box className="inner-dot-box-item">Remove</Box>
//                               </Box>
//                             </Box>
//                           )}
//                           ...
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Col>
//           </Row>
//         </Col>
//       </Box>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Box } from "../elements";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import data from "../../data/master/categoriesList.json";

export default function AccountsCatTab() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    // add logic to open edit modal or perform other actions
  };

  const handleRemove = (item) => {
    // add logic to remove item from data or perform other actions
  };

  const handleWindow = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div>
      <Box className="category-ingredients">
        <Box className="category-ingredients-left">
          <Col md={12}>
            <Row>
              <Col md={4}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="search-pl"
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
              </Col>
            </Row>
          </Col>
        </Box>
        <Box className="category-ingredients-right">
          <Col md={12}>
            <Row>
              <Col md={8}></Col>

              <Col md={4} className="cateMenu-btn-col-6">
                <button className="cateMenu-btn">+ Create</button>
              </Col>
            </Row>
          </Col>
        </Box>
      </Box>
      <Box className="tabContent">
        <Col md={12}>
          <Row>
            <Col md={12}>
              <Table>
                <thead className="thead-recipe">
                  <tr>
                    <th>Name</th>

                    <th className="text-end-td">...</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.accountingCategory.tbody.map((item, i) => (
                    <tr key={i}>
                      <td>{item.heading}</td>
                      <td className="text-end-td ">
                        <button
                          onClick={() => handleWindow(item)}
                          className="accounts-Tab-dot-box Tab-dot-box"
                        >
                          {selectedItem === item && (
                            <Box className="dot-box-details">
                              <Box className="inner-dot-box-details">
                                <Box
                                  className="inner-dot-box-item dot-box-item-border"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </Box>
                                <Box
                                  className="inner-dot-box-item"
                                  onClick={() => handleRemove(item)}
                                >
                                  Remove
                                </Box>
                              </Box>
                            </Box>
                          )}
                          ...
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Box>
    </div>
  );
}
