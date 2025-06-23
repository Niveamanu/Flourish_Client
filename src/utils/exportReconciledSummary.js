import * as XLSX from "xlsx";

export function exportReconciledSummary(remittances) {
  if (!remittances || remittances.length === 0) return;
  const exportData = remittances.map(row => ({
    "Date": row.created_date ? row.created_date.split(" ")[0] : "-",
    "Remittance No.": row.remittance_number || "-",
    "Reconciliation Status": row.reconciliation_status || "-",
    "Site Name": row.site_name || "-",
    "Sponsor": row.sponsor || "-",
    "Protocol": row.protocol || "-",
    "CRO": row.cro || "-",
    "PI Name": row.pi_name || "-",
    "%Withholding": row.withholding_percent || "-",
    "Invoice No. (Remittance)": row.invoice_no || "-",
    "Invoice Amount (Remittance)": row.invoice_amount || "-",
    "Screen No. (CTMS)": row.screen_no || "-",
    "Randomised No. (CTMS)": row.randomised_no || "-",
    "Visit Amount (Remittance)": row.visit_amount || "-",
    "Visit Name (CTMS)": row.visit_name || "-",
    "Amount in CTMS": row.ctms_amount || "-",
    "Posted Date": row.posted_date || "-",
    "Difference (Amount Paid - CTMS Amount)": row.difference || "-",
    "Notes": row.notes || "-",
  }));
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reconciled Summary");
  XLSX.writeFile(wb, "reconciled_summary.xlsx");
}
