import { useState, useEffect } from "react";
import { getFaculties } from "../services/informationManagementService";

export const useFacultyData = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const data = await getFaculties();
        if (data.data.items) {
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
