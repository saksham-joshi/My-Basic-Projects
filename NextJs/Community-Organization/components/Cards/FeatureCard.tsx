import { FeatureDataWithSVG } from "@/libs/utils";

export default function FeatureCard(
  __feature: FeatureDataWithSVG,
  __index: number
) {
  return (
    <div
      key={__index}
      //   initial={{ opacity: 0, y: 20 }}
      //   animate={{ opacity: 1, y: 0 }}
      //   transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="mb-4">{__feature.icon}</div>
      <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
        {__feature.title}
      </h3>
      <p className="text-gray-600">{__feature.description}</p>
    </div>
  );
}
