import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (doc) => {
  const pdf = new jsPDF();

  // ✅ Add Logo (replace with your logo path or base64)
  // Example: width = 20, height = 20
  // Make sure the image is available in public folder
 
//   const logoPath = "/images/CO_LOGO-1.png";

//   doc.addImage(logoPath, "PNG", 10, 10, 30, 15);

  // Title next to logo
  pdf.setFontSize(16);
  pdf.text("Inventory Request Document", 105, 18, { align: "center" });

  // Document Info (two fields per row)
  pdf.setFontSize(11);
  let yPos = 35;

  pdf.text(`Portal Document No: ${doc.U_Portal_Doc || "-"}`, 34, yPos);
  pdf.text(`SAP Document No: ${doc.DocNum || "-"}`, 130, yPos);

  yPos += 7;
  pdf.text(`Creator: ${doc.U_NAME?.toUpperCase() || "-"}`, 34, yPos);
  pdf.text(`Status: ${doc.Status || "-"}`, 130, yPos);

  // Table Columns and Rows
  const tableColumn = [
    " Code",
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

  // ✅ Smaller font size for table
  autoTable(pdf, {
    head: [tableColumn],
    body: tableRows,
    startY: yPos + 10,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [12, 0, 117], fontSize: 10 },
    margin: { top: 40 },
    didDrawPage: (data) => {
      // Footer - Page number
      let pageCount = pdf.internal.getNumberOfPages();
      let pageSize = pdf.internal.pageSize;
      let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();

      pdf.setFontSize(8);
      pdf.text(
        `Page ${pdf.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
        pageSize.width / 2,
        pageHeight - 5,
        { align: "center" }
      );
    },
  });

  // Save the PDF
  pdf.save(`Inventory_Request_${doc.DocNum || "Document"}.pdf`);
};
