import { useState, useEffect } from "react";
import { getPrograms } from "../services/informationManagementService";

export const useProgramData = () => {
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await getPrograms();
        console.log(" programs ", data);
        if (Array.isArray(data?.data)) {
          setPrograms(data.data);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);
  return { programs, setPrograms };
};
