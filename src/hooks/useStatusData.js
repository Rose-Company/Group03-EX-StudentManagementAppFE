import { useState, useEffect } from "react";
import { getStatuses } from "../services/informationManagementService";

export const useStatusData = () => {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await getStatuses();
        console.log("array", Array.isArray(data));
        if (Array.isArray(data)) {
          setStatuses(data);
        }
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  return statuses;
};
