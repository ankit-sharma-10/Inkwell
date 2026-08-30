const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  isLoading = false,
  ...props
}) => {
  const variants = {
    primary:
      "bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/20 hover:shadow-accent-500/30",
    secondary:
      "bg-dark-600 hover:bg-dark-500 text-neutral-100 border border-glass-border",
    danger:
      "bg-danger-500 hover:bg-danger-600 text-white shadow-lg shadow-danger-500/20",
    success:
      "bg-success-500 hover:bg-green-600 text-white shadow-lg shadow-success-500/20",
    ghost:
      "bg-transparent hover:bg-black/5 text-neutral-300 hover:text-neutral-100",
  };

  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-200 ease-out
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
