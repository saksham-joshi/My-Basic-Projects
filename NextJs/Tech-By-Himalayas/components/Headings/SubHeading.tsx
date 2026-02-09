
export default function SubHeading( __title : string) {
    return (
        <h2 className="text-3xl font-display font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-transparent bg-clip-text">
                {__title}
            </span>
        </h2>
    );
}