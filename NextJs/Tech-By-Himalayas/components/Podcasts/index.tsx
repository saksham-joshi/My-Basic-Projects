import { PODCAST_DATA } from "@/libs/podcast";
import SectionHeading from "../Headings/SectionHeading";

export default function PodcastSection()
{
    return (
        <section className="relative">
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {SectionHeading("Our Podcasts", "Tune in to our latest tech discussions and insights from industry experts")}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PODCAST_DATA.map((podcast, index) => (
                <div
                  key={index}
                  //whileHover={{ y: -10 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48">
                    <img 
                      src={podcast.image} 
                      alt={podcast.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{podcast.title}</h3>
                    <p className="text-gray-600 mb-4">{podcast.description}</p>
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Watch Now
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    );
}