import GridBackground from "@/components/Background/GridBackground";
import PageHeading from "@/components/Headings/PageHeading";
import { VALUES, SEO } from "@/libs/allLib";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Register | ${VALUES.appShortName}`,
  description: `This is Registration page of ${VALUES.appName}`,
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

export default function Register() {
  return (
    <div className="min-h-screen">
      <section className="relative">
        <GridBackground/>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

            {PageHeading("Join Our Community", "Become a part of the growing tech community in the Himalayas")}
          
          <div
            // initial={{ opacity: 0, y: 20 }}
            // whileInView={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6, delay: 0.2 }}
            // viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100"
          >
            <form 
            // onSubmit={handleSubmit} 
            className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                //   value={formData.name}
                //   onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                //   value={formData.email}
                //   onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                //   value={formData.phone}
                //   onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="college"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  College/University
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                //   value={formData.college}
                //   onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Year of Study
                </label>
                <select
                  id="year"
                  name="year"
                //   value={formData.year}
                //   onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="5th">5th Year</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Why do you want to join TechbyHimalayas?
                </label>
                <textarea
                  id="reason"
                  name="reason"
                //   value={formData.reason}
                //   onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                // whileHover={{ scale: 1.02 }}
                // whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
