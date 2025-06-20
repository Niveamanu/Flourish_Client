const tableData = {
  headers: [
    { label: "S.No", colSpan: 1, rowSpan: 2, className: "px-4 py-2 text-base" },
    {
      label: "Date Reconciled",
      colSpan: 1,
      rowSpan: 2,
      className: "px-4 py-2 text-base",
    },
    {
      label: "Remittance Number",
      colSpan: 1,
      rowSpan: 2,
      className: "px-4 py-2 text-base",
    },
    {
      label: "Site Name",
      colSpan: 1,
      rowSpan: 2,
      className: "px-4 py-2 text-base",
    },
    {
      label: "Reconcillation Status",
      colSpan: 1,
      rowSpan: 2,
      className: "px-4 py-2 text-base",
    },
    {
      label: "Action",
      colSpan: 1,
      rowSpan: 2,
      className: "px-4 py-2 text-base",
    },
  ],
  subHeaders: [],
  rows: [
    {
      sNo: "01",
      uploadDate: "12-Jun-2025",
      remittanceNumber: "098765",
      fileName: "Amgen Remittance",
      fileLink: "#",
      status: "Fully Paid",
    },
    {
      sNo: "02",
      uploadDate: "15-Jun-2025",
      remittanceNumber: "098766",
      fileName: "Biogen Invoice",
      fileLink: "#",
      status: "Partially Paid",
    },
    {
      sNo: "03",
      uploadDate: "18-Jun-2025",
      remittanceNumber: "098767",
      fileName: "Pfizer Payment",
      fileLink: "#",
      status: "Over Paid",
    },
    {
      sNo: "04",
      uploadDate: "23-Jun-2025",
      remittanceNumber: "098768",
      fileName: "GSK Submission",
      fileLink: "#",
      status: "Fully Paid",
    },
  ],
};

export default tableData;
