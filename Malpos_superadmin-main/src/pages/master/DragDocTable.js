// // import React, { useState } from "react";
// // import { Table } from "react-bootstrap";

// // const DraggableTable = ({ data }) => {
// //   const initialColumns = [
// //     { key: "ItemCode", label: "Item Code" },
// //     { key: "ItemName", label: "Item Name" },
// //     { key: "FromWarehouseCode", label: "From Warehouse" },
// //     { key: "ToWarehouseCode", label: "To Warehouse" },
// //     { key: "IssueQty", label: "Issue Qty" },
// //     { key: "RequiredQty", label: "Required Qty" },
// //     { key: "RemainingQty", label: "Remaining Qty" },
// //     { key: "UOM", label: "UOM" }
// //   ];

// //   const [columns, setColumns] = useState(initialColumns);

// //   const handleDragStart = (e, index) => {
// //     e.dataTransfer.setData("colIndex", index);
// //   };

// //   const handleDrop = (e, index) => {
// //     const draggedColIndex = parseInt(e.dataTransfer.getData("colIndex"));
// //     if (isNaN(draggedColIndex)) return;

// //     const cols = [...columns];
// //     const [dragged] = cols.splice(draggedColIndex, 1);
// //     cols.splice(index, 0, dragged);
// //     setColumns(cols);
// //   };

// //   return (
// //     <Table striped bordered size="sm" className="mt-2">
// //       <thead>
// //         <tr>
// //           {columns.map((col, index) => (
// //             <th
// //               key={col.key}
// //               draggable
// //               onDragStart={(e) => handleDragStart(e, index)}
// //               onDragOver={(e) => e.preventDefault()}
// //               onDrop={(e) => handleDrop(e, index)}
// //               style={{ cursor: "move" }}
// //             >
// //               {col.label}
// //             </th>
// //           ))}
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {data?.map((row, idx) => (
// //           <tr key={idx}>
// //             {columns.map((col) => (
// //               <td key={col.key}>{row[col.key]}</td>
// //             ))}
// //           </tr>
// //         ))}
// //       </tbody>
// //     </Table>
// //   );
// // };

// // export default DraggableTable;


// import React, { useState } from "react";
// import { Table } from "react-bootstrap";
// import SelectField from "../../components/fields/SelectField"; // Import your custom select component

// const DraggableTable = ({
//   data,
//   selectedRows,
//   handleCheckboxChange,
//   handleLineChange,
//   handleWarehouseChange,
//   warehouseOptions,
// }) => {
//   const initialColumns = [
//     { key: "select", label: "Select" },
//     { key: "item_code", label: "Item Code" },
//     { key: "item_name", label: "Item Name" },
//     { key: "warehouse", label: "Warehouse" },
//     { key: "WarehouseStock", label: "Warehouse Stock" },
//     { key: "TotalInStock", label: "In Stock" },
//     { key: "project", label: "Project" },
//     { key: "department", label: "Department" },
//     { key: "reason", label: "Issue Type" },
//     { key: "EmployeeName", label: "Emp Name" },
//     { key: "requiredqty", label: "Req Qty" },
//     { key: "issuedqty", label: "Issued Qty" },
//     { key: "remainingqty", label: "Remaining Qty" },
//     { key: "ConfirmedQty", label: "Entered Qty" },
//     { key: "PurchaseReqQty", label: "PR Req Qty" },
//     { key: "PurchaseReqDocNUM", label: "PR Req Doc" },
//   ];

//   const [columns, setColumns] = useState(initialColumns);

//   const handleDragStart = (e, index) => {
//     e.dataTransfer.setData("colIndex", index);
//   };

//   const handleDrop = (e, index) => {
//     const draggedColIndex = parseInt(e.dataTransfer.getData("colIndex"));
//     if (isNaN(draggedColIndex)) return;

//     const cols = [...columns];
//     const [dragged] = cols.splice(draggedColIndex, 1);
//     cols.splice(index, 0, dragged);
//     setColumns(cols);
//   };

//   return (
//     <div style={{ overflowX: "auto" }}>
//       <Table striped bordered size="sm" className="mt-2" style={{ minWidth: "1300px" }}>
//         <thead className="mc-table-head primary text-center">
//           <tr style={{ fontSize: "12px", fontWeight: "bold" }}>
//             {columns.map((col, index) => (
//               <th
//                 key={col.key}
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, index)}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => handleDrop(e, index)}
//                 style={{ fontSize: "10px", cursor: "move", minWidth: "100px" }}
//               >
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((row, idx) => (
//             <tr key={idx} style={{ fontSize: "12px" }}>
//               {columns.map((col) => {
//                 const key = col.key;
//                 const globalIndex = idx;

//                 switch (key) {
//                   case "select":
//                     return (
//                       <td key="select" className="text-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.includes(globalIndex)}
//                           onChange={() => handleCheckboxChange(globalIndex)}
//                         />
//                       </td>
//                     );

//                   case "warehouse":
//                     return (
//                       <td key="warehouse">
//                         <SelectField
//                           options={warehouseOptions}
//                           value={row.warehouse}
//                           name="warehouse"
//                           onChange={(selected) =>
//                             handleWarehouseChange(globalIndex, selected)
//                           }
//                           style={{ fontSize: "12px", marginTop: "-18px" }}
//                         />
//                       </td>
//                     );

//                   case "ConfirmedQty":
//                   case "PurchaseReqQty":
//                     return (
//                       <td key={key}>
//                         <input
//                           type="number"
//                           name={key}
//                           className="form-control form-control-sm"
//                           value={row[key]}
//                           onChange={(e) => handleLineChange(globalIndex, e)}
//                         />
//                       </td>
//                     );

//                   case "WarehouseStock":
//                   case "TotalInStock":
//                   case "requiredqty":
//                   case "issuedqty":
//                   case "remainingqty":
//                     return (
//                       <td key={key} className="text-center">
//                         {Number(row[key] || 0).toFixed(2)}
//                       </td>
//                     );

//                   case "PurchaseReqDocNUM":
//                     return <td key={key}>{row[key] || "—"}</td>;

//                   default:
//                     return <td key={key}>{row[key]}</td>;
//                 }
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default DraggableTable;



// DraggableTable.jsx
import React, { useState } from "react";
import { Table, Collapse, Form } from "react-bootstrap";

const DraggableTable = ({
  docIndex,
  document,
  selectedRows,
  handleCheckboxChange,
  handleLineChange,
  handleWarehouseChange,
  warehouseOptions,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-3 border p-2 rounded">
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        #{document.DocNum} | {document.DocDate} | {document.CardName}
      </div>

      <Collapse in={open}>
        <div>
          <Table bordered hover size="sm" className="mt-2">
            <thead>
              <tr>
                <th>Select</th>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Req. Qty</th>
                <th>Issued Qty</th>
                <th>Remaining Qty</th>
                <th>Issue Qty</th>
                <th>Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {document.lines.map((line, rowIndex) => {
                const rowKey = `${document.DocNum}-${rowIndex}`;
                return (
                  <tr key={rowKey}>
                    <td>
                      <Form.Check
                        checked={selectedRows.includes(rowKey)}
                        onChange={() => handleCheckboxChange(docIndex, rowIndex)}
                      />
                    </td>
                    <td>{line.ItemCode}</td>
                    <td>{line.ItemName}</td>
                    <td>{line.ReqQty}</td>
                    <td>{line.IssuedQty}</td>
                    <td>{line.ReqQty - line.IssuedQty}</td>
                    <td>
                      <Form.Control
                        type="number"
                        name="IssueQty"
                        value={line.IssueQty || ""}
                        onChange={(e) =>
                          handleLineChange(docIndex, rowIndex, "IssueQty", e.target.value)
                        }
                        min="0"
                        max={line.ReqQty - line.IssuedQty}
                      />
                    </td>
                    <td>
                      <Form.Select
                        value={line.Warehouse || ""}
                        onChange={(e) =>
                          handleWarehouseChange(docIndex, rowIndex, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {warehouseOptions.map((wh) => (
                          <option key={wh.code} value={wh.code}>
                            {wh.name}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Collapse>
    </div>
  );
};

export default DraggableTable;
