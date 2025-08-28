import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const DraggableTable = ({ documents }) => {
  const initialColumns = [
    { key: "DocNum", label: "Doc Num" },
    { key: "DocDate", label: "Date" },
    { key: "Status", label: "Status" },
    { key: "UserName", label: "User" },
    { key: "Warehouse", label: "Warehouse" },
    { key: "IssueQty", label: "Issue Qty" },
    { key: "RequiredQty", label: "Required Qty" },
    { key: "RemainingQty", label: "Remaining Qty" },
    { key: "Actions", label: "Actions" },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [draggedColIndex, setDraggedColIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedColIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedColIndex === null || draggedColIndex === index) return;
    const updated = [...columns];
    const [moved] = updated.splice(draggedColIndex, 1);
    updated.splice(index, 0, moved);
    setColumns(updated);
    setDraggedColIndex(null);
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={col.key}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              style={{ cursor: "move" }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {documents.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={col.key}>
                {col.key === "Actions" ? (
                  <Link to={`/details/${item.DocNum}`}>View</Link>
                ) : (
                  item[col.key] ?? ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DraggableTable;
