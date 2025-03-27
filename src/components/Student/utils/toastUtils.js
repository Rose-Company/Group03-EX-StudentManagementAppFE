import { toast } from "react-toastify";

export const showToast = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: type === "success" ? 3000 : 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    style: {
      backgroundColor: type === "success" ? "#4caf50" : "#f44336",
      color: "white",
    },
  });
}; 