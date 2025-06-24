import { useEffect, useState } from "react";
import api from "../api/api.js";
import userInfo from "../hooks/UserHook.jsx";

export default function useRemittancesHistory(
  limit,
  offset,
  startDate,
  endDate,
  siteName,
  protocol, 
  reconciliationStatus,
  sponsor,
  remittanceNumber,
  searchTrigger
) {
  const User = userInfo();
  const [remittances, setRemittances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchRemittances() {
      setLoading(true);
      setError(null);
      try {
        const params = {
          user: User?.name,
          limit,
          offset,
        };
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        if (siteName) params.site_name = siteName;
        if (protocol) params.protocol = protocol;   
        if (reconciliationStatus)
          params.reconciliation_status = reconciliationStatus;
        if (sponsor) params.sponsor = sponsor;

        if (remittanceNumber) params.remittance_number = remittanceNumber;

        // ✅ Pass params directly
        const res = await api.get("/user/files_history", { params });
        setRemittances(res.data.remittances || []);
        setTotalCount(res.data.remittance_total_count || 0);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    if (User?.name) fetchRemittances();
  }, [
    User?.name,
    limit,
    offset,
    startDate,
    endDate,
    siteName,
    protocol,
    reconciliationStatus, 
    sponsor,
    searchTrigger,
    remittanceNumber
  ]);

  return { remittances, loading, error, totalCount };
}
