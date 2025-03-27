import { useState, useEffect, useRef, useCallback } from "react";
import { getPrograms } from "../services/informationManagementService";

export const useProgramData = () => {
  const [programs, setPrograms] = useState([]);
  const isFetching = useRef(false);
  const fetchPrograms = useCallback(async () => {
    try {
      const data = await getPrograms();
      console.log(" programs ", data);
      if (Array.isArray(data?.data)) {
        setPrograms(data.data);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      isFetching.current = false;
    }
  }, []);
  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchPrograms();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [fetchPrograms]);
  return { programs, setPrograms };
};
