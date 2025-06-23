import * as XLSX from "xlsx";

export function exportReconciledHistory(remittances) {
  if (!remittances || remittances.length === 0) return;
  const exportData = remittances.map(row => ({
    "Date Reconciled": row.created_date ? row.created_date.split(" ")[0] : "-",
    "Remittance Number": row.remittance_number || "-",
    "Site Name": row.site_name || "-",
    "Sponsor": row.sponsor || "-",
    "Protocol": row.protocol || "-",
    "CRO": row.cro || "-",
    "Status": row.reconciliation_status || "-",
  }));
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Reconciled History");
  XLSX.writeFile(wb, "reconciled_history.xlsx");
}
