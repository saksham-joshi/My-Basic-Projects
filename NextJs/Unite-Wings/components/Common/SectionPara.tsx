const SectionPara = ({
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
        data-wow-delay=".1s"
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <p dangerouslySetInnerHTML={{__html:paragraph}} className="text-base !leading-relaxed text-body-color md:text-lg">
        </p>
      </div>
    </>
  );
};

export default SectionPara;
