import { StatData } from "@/libs/utils";

export default function StatCard(__stat: StatData, __index: number) {
  return (
    <div
      key={__index}
      className="group relative bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 rounded-t-xl overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]"></div>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-3 p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
          {__stat.icon}
        </div>
        <div className="text-3xl font-display font-bold text-[#1E3A8A] mb-2">
          {__stat.value}
        </div>
        <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {__stat.label}
        </div>
      </div>
    </div>
  );
}
