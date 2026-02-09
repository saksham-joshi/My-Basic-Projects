import { getImagePath } from "@/lib/utils";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { VALUES } from "@/lib/variables";
import SectionPara from "../Common/SectionPara";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }: { text: string }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title= {VALUES.APP_FULL_NAME}
                paragraph={VALUES.APP_DESCRIPTION}
                mb="44px"
              />

              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Mission-Driven Excellence" />
                    <List text="Inclusive Innovation" />
                    <List text="Collaborative Growth" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Sustainable Impact" />
                    <List text="Futuristic Vision" />
                    <List text="Great Mission" />
                  </div>
                </div>
              </div>

              <SectionPara
                paragraph={`<br/>
                Our story doesn't begin with a person, but with a question. A question that echoes in university halls, corporate boardrooms, and family homes across the nation: Why, with millions of talented and ambitious graduates each year, is there still a profound disconnect between the skills they have and the skills the modern world demands?
                <br/> <br/>
                This is the employability paradox. Our youth are educated, driven, and full of potential. Yet, they often find themselves at the starting line of their careers without the practical tools needed to run the race: the confidence to lead a team, the eloquence to present a big idea, the resilience to navigate a complex project, or the innovative mindset to solve a problem no textbook ever covered.
                <br/> <br/>
                Traditional education provides the 'what'. We were founded to provide the 'how'.
                <br/> <br/>
                Unite Wings was conceived not as a business, but as an answer. It was designed from the ground up to be a dynamic, non-profit bridge over this gap. We are a response to the visionary goals of the National Education Policy (NEP) 2020 and a dedicated ally to the mission of Skill India. We are not here to replace traditional education, but to be its most powerful and essential partner. Our purpose is to ensure that the spark of academic knowledge is fanned into the flame of real-world competence.
                `}
              />
            </div>
            
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src={getImagePath("/images/about/about-image.svg")}
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full drop-shadow-three dark:hidden dark:drop-shadow-none lg:mr-0"
                />
                <Image
                  src={getImagePath("/images/about/about-image-dark.svg")}
                  alt="about-image"
                  fill
                  className="mx-auto hidden max-w-full drop-shadow-three dark:block dark:drop-shadow-none lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
