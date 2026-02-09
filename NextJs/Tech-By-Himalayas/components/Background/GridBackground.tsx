export default function GridBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #2563EB 1px, transparent 1px),
                                  linear-gradient(to bottom, #2563EB 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
