import { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
  { options = [], label, className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-300 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-dark-700 text-neutral-100
          border border-glass-border
          outline-none cursor-pointer
          transition-all duration-200
          focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
          ${className}
        `}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-dark-700">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
