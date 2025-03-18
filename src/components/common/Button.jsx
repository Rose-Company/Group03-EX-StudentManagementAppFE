// components/common/Button.jsx
import props from "prop-types";
const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: props.node.isRequired,
  onClick: props.func.isRequired,
  type: props.oneOf(["button", "submit", "reset"]),
  className: props.string,
};

export default Button;

// Cách dùng <Button onClick={() => console.log("Clicked!")}>Click Me</Button>
