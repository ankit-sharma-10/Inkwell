import { forwardRef, useId } from "react";

const Input = forwardRef(function (
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-neutral-300 mb-1.5"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-dark-700 text-neutral-100
          border border-glass-border
          placeholder:text-neutral-300/40
          outline-none
          transition-all duration-200
          focus:border-accent-500/50 focus:ring-2 focus:ring-accent-500/20
          file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0
          file:text-sm file:font-medium file:bg-dark-500 file:text-neutral-200
          file:cursor-pointer file:transition-colors file:hover:bg-dark-400
          ${className}
        `}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
