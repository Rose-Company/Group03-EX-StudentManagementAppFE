// components/common/Toast.jsx

import props from "prop-types";

const Toast = ({ message, type = "success", onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed top-4 right-4 p-4 rounded text-white ${bgColor}`}>
      {message}
      <button onClick={onClose} className="ml-4">
        ✖
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: props.string.isRequired,
  type: props.oneOf(["success", "error"]),
  onClose: props.func.isRequired,
};
export default Toast;

// Cách dùng <Toast message="Success message" type="success" onClose={() => console.log("Closed!")} />
