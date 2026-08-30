export default function Logo({ width = "100px" }) {
  return (
    <span
      className="font-extrabold tracking-tight select-none"
      style={{ width, fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
    >
      <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
        Ink
      </span>
      <span className="text-neutral-100">well</span>
    </span>
  );
}
