export default function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 border-solid border-amber-950">
      {children}
    </div>
  );
}
