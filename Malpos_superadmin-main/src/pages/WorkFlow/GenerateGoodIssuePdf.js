// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generateGoodIssuePDF = (doc) => {
//   const pdf = new jsPDF();

//   // ✅ Add Logo (replace with your logo path or base64)
//   // Example: width = 20, height = 20
//   // Make sure the image is available in public folder
 
// //   const logoPath = "/images/CO_LOGO-1.png";

// //   doc.addImage(logoPath, "PNG", 10, 10, 30, 15);

//   // Title next to logo
//   pdf.setFontSize(16);
//   pdf.text("Inventory Request Document", 105, 18, { align: "center" });

//   // Document Info (two fields per row)
//   pdf.setFontSize(11);
//   let yPos = 35;

//   pdf.text(`Portal Document No: ${doc.U_Portal_Doc || "-"}`, 34, yPos);
//   pdf.text(`SAP Document No: ${doc.DocNum || "-"}`, 130, yPos);

//   yPos += 7;
//     pdf.text(`SAP Inventory Req No: ${doc.InventoryRequestDocNum || "-"}`, 130, yPos);
//   pdf.text(`Creator: ${doc.CreatedBy?.toUpperCase() || "-"}`, 34, yPos);


//   // Table Columns and Rows
//   const tableColumn = [
//     " Code",
//     "Description",
//     "Quantity",
//     "Warehouse",
//     "Issue Type",
//     "Employee",
//     "Cost Center",
//     "Project",
//   ];

//   const tableRows = (doc.items || []).map((item) => [
//     item.ItemCode || "",
//     item.Dscription || "",
//     item.Quantity || "",
//     item.WhsCode || "",
//     item.U_Reasons || "",
//     item.U_Emp_Name || "",
//     item.OcrCode || "",
//     item.Project || "",
//   ]);

//   // ✅ Smaller font size for table
//   autoTable(pdf, {
//     head: [tableColumn],
//     body: tableRows,
//     startY: yPos + 10,
//     styles: { fontSize: 9 },
//     headStyles: { fillColor: [12, 0, 117], fontSize: 10 },
//     margin: { top: 40 },
//     didDrawPage: (data) => {
//       // Footer - Page number
//       let pageCount = pdf.internal.getNumberOfPages();
//       let pageSize = pdf.internal.pageSize;
//       let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

//       pdf.setFontSize(8);
//       pdf.text(
//         `Page ${pdf.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
//         pageSize.width / 2,
//         pageHeight - 5,
//         { align: "center" }
//       );
//     },
//   });

//   // Save the PDF
//   pdf.save(`Good_Issue_${doc.DocNum || "Document"}.pdf`);
// };

// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export const generateGoodIssuePDF = (doc) => {
//   const pdf = new jsPDF();

//   const logoBase64 =  imageToBase64("/images/CO_LOGO-1.png");

//   // Add logo to PDF
//   pdf.addImage(logoBase64, "PNG", 10, 10, 30, 15);
//   // Title
//   pdf.setFontSize(16);
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Inventory Request Document", 105, 18, { align: "center" });

//   // Document Info
//   pdf.setFontSize(11);
//   pdf.setFont("helvetica", "bold");
//   let yPos = 35;

//   pdf.text("Portal Document No:", 34, yPos);
//   pdf.setFont("helvetica", "normal");
//   pdf.text(`${doc.U_Portal_Doc || "-"}`, 80, yPos);

//   pdf.setFont("helvetica", "bold");
//   pdf.text("SAP Document No:", 130, yPos);
//   pdf.setFont("helvetica", "normal");
//   pdf.text(`${doc.DocNum || "-"}`, 175, yPos);

//   yPos += 7;

//   pdf.setFont("helvetica", "bold");
//   pdf.text("Creator:", 34, yPos);
//   pdf.setFont("helvetica", "normal");
//   pdf.text(`${doc.CreatedBy?.toUpperCase() || "-"}`, 80, yPos);

//   pdf.setFont("helvetica", "bold");
//   pdf.text("SAP Inventory Req No:", 130, yPos);
//   pdf.setFont("helvetica", "normal");
//   pdf.text(`${doc.InventoryRequestDocNum || "-"}`, 175, yPos);

//   // Table data
//   const tableColumn = [
//     "Code",
//     "Description",
//     "Quantity",
//     "Warehouse",
//     "Issue Type",
//     "Employee",
//     "Cost Center",
//     "Project",
//   ];

//   const tableRows = (doc.items || []).map((item) => [
//     item.ItemCode || "",
//     item.Dscription || "",
//     item.Quantity || "",
//     item.WhsCode || "",
//     item.U_Reasons || "",
//     item.U_Emp_Name || "",
//     item.OcrCode || "",
//     item.Project || "",
//   ]);

//   const startY = yPos + 15;
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const tableWidth = pageWidth - 20;

//   autoTable(pdf, {
//     head: [tableColumn],
//     body: tableRows,
//     startY: startY,
//     styles: { fontSize: 9, lineWidth: 0.2, lineColor: [0, 0, 0] },
//     headStyles: {
//       fillColor: [12, 0, 117],
//       fontSize: 10,
//       halign: "center",
//       textColor: 255,
//     },
//     theme: "grid",
//     margin: { top: 40, left: 10, right: 10 },
//     didDrawPage: (data) => {
//       // Footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       const pageSize = pdf.internal.pageSize;
//       const pageHeight = pageSize.height || pageSize.getHeight();

//       pdf.setFontSize(8);
//       pdf.text(
//         `Page ${pdf.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
//         pageSize.width / 2,
//         pageHeight - 5,
//         { align: "center" }
//       );
//     },
//     didDrawCell: (data) => {
//       // Draw rounded header background
//       if (data.section === "head" && data.row.index === 0 && data.column.index === 0) {
//         const { x, y, height } = data.cell;
//         pdf.setDrawColor(0);
//         pdf.setLineWidth(0.5);
//         // pdf.roundedRect(x, y, tableWidth, height, 3, 3, "S");
//       }
//     },
//   });

//   pdf.save(`Good_Issue_${doc.DocNum || "Document"}.pdf`);
// };


// const imageToBase64 = (imagePath) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "Anonymous"; // important if loading from external source
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);
//       resolve(canvas.toDataURL("image/png")); // can be "image/jpeg"
//     };
//     img.onerror = (err) => reject(err);
//     img.src = imagePath;
//   });
// };
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateGoodIssuePDF = async (doc) => {
  const pdf = new jsPDF();

  // ✅ Wait for base64 string
  const logoBase64 = await imageToBase64("/images/CO_LOGO-1.png");

  // Add logo to PDF
  pdf.addImage(logoBase64, "PNG", 10, 10, 40, 15);

  // Title
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Inventory Request Document", 105, 18, { align: "center" });

  // Document Info
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  let yPos = 35;

  pdf.text("Portal Document No:", 24, yPos);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${doc.U_Portal_Doc || "-"}`, 65, yPos);

  pdf.setFont("helvetica", "bold");
  pdf.text("SAP Document No:", 130, yPos);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${doc.DocNum || "-"}`, 175, yPos);

  yPos += 7;

  pdf.setFont("helvetica", "bold");
  pdf.text("Creator:", 24, yPos);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${doc.CreatedBy?.toUpperCase() || "-"}`, 65, yPos);

  pdf.setFont("helvetica", "bold");
  pdf.text("SAP Inventory Req No:", 130, yPos);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${doc.InventoryRequestDocNum || "-"}`, 175, yPos);

  // Table
  const tableColumn = [
    "Code",
    "Description",
    "Quantity",
    "Warehouse",
    "Issue Type",
    "Employee",
    "Cost Center",
    "Project",
  ];

  const tableRows = (doc.items || []).map((item) => [
    item.ItemCode || "",
    item.Dscription || "",
    item.Quantity || "",
    item.WhsCode || "",
    item.U_Reasons || "",
    item.U_Emp_Name || "",
    item.OcrCode || "",
    item.Project || "",
  ]);

  const startY = yPos + 15;

  autoTable(pdf, {
    head: [tableColumn],
    body: tableRows,
    startY: startY,
    styles: { fontSize: 9, lineWidth: 0.2, lineColor: [0, 0, 0] },
    headStyles: {
      fillColor: [12, 0, 117],
      fontSize: 10,
      halign: "center",
      textColor: 255,
    },
    theme: "grid",
    margin: { top: 40, left: 10, right: 10 },
    didDrawPage: () => {
      const pageCount = pdf.internal.getNumberOfPages();
      const pageSize = pdf.internal.pageSize;
      const pageHeight = pageSize.height || pageSize.getHeight();
      pdf.setFontSize(8);
      pdf.text(
        `Page ${pdf.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageSize.width / 2,
        pageHeight - 5,
        { align: "center" }
      );
    },
  });

  pdf.save(`Good_Issue_${doc.DocNum || "Document"}.pdf`);
};

// Convert image to Base64 in browser
const imageToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (err) => reject(err);
    img.src = imagePath;
  });
};
