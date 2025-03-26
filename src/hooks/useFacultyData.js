import { useState, useEffect } from "react";
import { getFaculties } from "../services/studentManagementService";

export const useFacultyData = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await getFaculties();
        if (data.code === 200) {
          setFaculties(data.data.items);
        }
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  return faculties;
};
