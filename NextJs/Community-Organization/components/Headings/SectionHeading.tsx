export default function SectionHeading(
  __heading: string,
  __subHeading: string
) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">
        <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
          {__heading}
        </span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">{__subHeading}</p>
    </div>
  );
}
