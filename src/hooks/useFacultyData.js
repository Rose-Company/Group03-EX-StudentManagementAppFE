import { useState, useEffect, useCallback, useRef } from "react";
import { getFaculties } from "../services/informationManagementService";

export const useFacultyData = () => {
  const [faculties, setFaculties] = useState([]);
  const isFetching = useRef(false);
  const fetchFaculties = useCallback(async () => {
    if (isFetching.current) return;
    try {
      const data = await getFaculties();
      if (Array.isArray(data)) {
        setFaculties(data);
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
    } finally {
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchFaculties();
    }, 300);
    return () => clearTimeout(delayFetch);
  }, [fetchFaculties]);

  return { faculties, setFaculties };
};
