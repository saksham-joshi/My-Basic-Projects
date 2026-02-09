export default function PageHeading(__heading: string, __subHeading: string) {
  return (
    <div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.6 }}
      className="text-center mb-12">
      <h1 className="text-5xl md:text-5xl font-display font-bold mb-4">
        <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
          {__heading}
        </span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        {__subHeading}
      </p>
    </div>
  );
}
