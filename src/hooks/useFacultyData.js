import { useState, useEffect } from "react";
import { getFaculties } from "../services/studentManagementService";

export const useFacultyData = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await getFaculties();
        if (Array.isArray(data)) {
          setFaculties(data);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  return faculties;
};
