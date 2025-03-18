// components/common/Input.jsx
import props from "prop-types";
const Input = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-gray-700">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

Input.propTypes = {
  label: props.string,
  type: props.oneOf(["text", "password", "email"]),
  value: props.string.isRequired,
  onChange: props.func.isRequired,
  placeholder: props.string,
};
export default Input;

// Cách dùng <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
