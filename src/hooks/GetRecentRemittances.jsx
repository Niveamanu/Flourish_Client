import { useEffect, useState } from "react";
import api from "../api/api.js";
import userInfo from "../hooks/UserHook.jsx";

export default function useRemittances(limit, offset) {
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
        const res = await api.get("/user/files", {
          params: { user: User?.name, limit, offset },
        }); // Adjust endpoint as needed
        setRemittances(res.data.remittances || []);
        setTotalCount(res.data.total_count || 0);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    if (User?.name) fetchRemittances();
  }, [User?.name, limit, offset]);

  return { remittances, loading, error, totalCount };
}
