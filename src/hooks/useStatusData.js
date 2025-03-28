import { useState, useEffect, useRef, useCallback } from "react";
import { getStatuses } from "../services/informationManagementService";

export const useStatusData = () => {
  const [statuses, setStatuses] = useState([]);
  const isFetching = useRef(false);

  const fetchStatuses = useCallback(async () => {
    if (isFetching.current) return;

    try {
      const data = await getStatuses();
      if (Array.isArray(data)) {
        setStatuses(data);
      }
    } catch (error) {
      console.error("Error fetching statuses:", error);
    } finally {
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStatuses();
    }, 500);

    return () => clearTimeout(delay);
  }, [fetchStatuses]);

  return { statuses, setStatuses };
};
