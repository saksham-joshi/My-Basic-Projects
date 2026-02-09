import { VALUES, SEO } from "@/libs/allLib";
import { Metadata } from "next";
import JoiningInterface from "@/components/JoinInterface/JoiningInterface";
import GridBackground from "@/components/Background/GridBackground";
import PageHeading from "@/components/Headings/PageHeading";
import { SVG } from "@/libs/svgLinks";
import { RouteInfo } from "@/libs/routeInfo";

export const metadata: Metadata = {
  title: `Contact | ${VALUES.appShortName}`,
  description: `This is Contact page of ${VALUES.appName}`,
  authors: SEO.author,
  publisher: VALUES.appName,
  robots: SEO.robots,
  category: SEO.category,
  formatDetection: SEO.formatDetection,
  referrer: SEO.referrer,
  keywords: SEO.keywords,
  creator: SEO.author.name,
  openGraph: SEO.openGraph,
  abstract: VALUES.appDescription,
  classification: SEO.classification,
  appleWebApp: SEO.appleWebApp,
  assets: SEO.assets,
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <GridBackground/>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
            
            {PageHeading("Get in Touch", "Have questions or want to collaborate? We'd love to hear from you. Send us a message and we'll respond as soon as possible.")}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-12">
              {/* Contact Information */}
              <div
                // initial={{ opacity: 0, x: -20 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl relative overflow-hidden group border border-gray-100"
              >
                <div className="relative z-20">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    {SVG.CONTACT_URL.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        // initial={{ opacity: 0, x: -20 }}
                        // animate={{ opacity: 1, x: 0 }}
                        // transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">{item.content}</p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Social Media Links */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      {SVG.SOCIAL_MEDIA.map((social, index) => (
                        <a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          // initial={{ opacity: 0, y: 10 }}
                          // animate={{ opacity: 1, y: 0 }}
                          // transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 ${social.color}`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div
                // initial={{ opacity: 0, x: 20 }}
                // animate={{ opacity: 1, x: 0 }}
                // transition={{ duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl relative overflow-hidden group border border-gray-100"
              >
                <div className="relative z-20">
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                    Send us a Message
                  </h2>
                  <form 
                  // onSubmit={handleSubmit} 
                  className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        // value={formData.name}
                        // onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        // value={formData.subject}
                        // onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        // value={formData.message}
                        // onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A]/90 hover:to-[#2563EB]/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative">
          {JoiningInterface("Join Our Community", "Be part of a growing community of tech enthusiasts in the Himalayan region.", "Join Now", RouteInfo.routes.Register)}
        </section>
      </div>
    </div>
  );
}
