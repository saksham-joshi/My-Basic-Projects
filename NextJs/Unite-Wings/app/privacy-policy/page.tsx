
import { Metadata } from "next";
import {VALUES} from "@/lib/variables";
import LongPara from "@/components/Common/LongPara";

export const metadata: Metadata = {
  title: `Privacy Policy | ${VALUES.APP_SHORT_NAME}`,
  description: `This is Privacy Policy Page of ${VALUES.APP_FULL_NAME}`,
  authors: VALUES.DEV_SAKSHAM_JOSHI,
  publisher: VALUES.APP_FULL_NAME,
  robots: VALUES.SEO.robots,
  category: VALUES.SEO.category,
  formatDetection: VALUES.SEO.formatDetection,
  referrer: VALUES.SEO.referrer,
  keywords: VALUES.SEO.keywords
};

const PrivacyPolicy = () => {
    return (
        <>
            <LongPara
                pageName="Privacy Policy"
                description={`<strong>Privacy Policy Overview—</strong>
<br/>
This Privacy Policy explains how Unite Wings Educational Confederation processes personal data collected via unitewings.com and associated online properties and services.
It aligns with India’s Digital Personal Data Protection Act, 2023 (DPDP Act), and, until fully supplanted, the IT Act 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules).
<br/><br/>
<strong> Who we are:</strong>
<br/>
Legal name: Unite Wings Educational Confederation, a Section 8 company limited by shares incorporated on 6 August 2025.
Corporate Identity Number (CIN): U85500UT2025NPL019683; PAN: AADCU9056A; TAN: MRTU04622C.
Registered office: C/O J. S. Verma, Padmavati Niwas, Main Road, Vidon (Bidon) Gaon, Narendranagar, Tehri Garhwal – 249175, Uttarakhand, India.
<br/><br/>
<strong>Scope:</strong>
<br/>
This Policy applies to personal data collected online through unitewings.com and any forms, programs, or communications operated by Unite Wings Educational Confederation in digital form.
It covers processing carried out in India and, where applicable, processing outside India related to offering goods or services to individuals in India.
<br/><br/>
<strong> What we collect:</strong>
<br/>
We may collect personal data such as identity and contact details (name, email, phone), account credentials, communications, program applications, and usage/cookie data necessary for the specified purpose.
If provided or required for services, we may process “sensitive personal data or information” (SPDI) per the SPDI Rules, such as passwords, financial information, health/medical records, and biometrics, applying the heightened protections those rules require.
<br/><br/>
<strong> Sources of data:</strong>
<br/>
Data is collected directly from data principals (e.g., web forms, program enrollment), from devices via cookies/SDKs, and from service providers processing on our behalf under contract.
Where lawful, we may also derive or receive data from government records, partners, or public sources, consistent with the DPDP Act’s “certain legitimate uses.”
<br/><br/>
<strong>Lawful basis and purposes:</strong>
<br/>
We process personal data with valid, informed consent or under “certain legitimate uses” allowed by the DPDP Act, including service delivery, compliance, safety, emergencies, and employment-related purposes.
Typical purposes include account creation, program delivery, certification, communications, analytics, security, fraud prevention, and fulfilling legal obligations.
<br/><br/>
<strong> Notices and consent:</strong>
<br/>
Before or at the time of collecting personal data, we provide a clear notice describing the data, purposes, how to exercise rights, complaint channels, and contact details of a responsible person or DPO (if applicable).
Consent is free, specific, informed, unambiguous, and obtained via clear affirmative action; consent may be withdrawn at any time with comparable ease.
<br/><br/>
<strong>Cookies and similar technologies:</strong>
<br/>
We use cookies and similar technologies to operate the site, remember preferences, and understand usage, and will offer clear, itemized cookie notices and choices consistent with the DPDP framework and evolving Rules.
Cookie consent interfaces will be presented in clear, plain language, enabling acceptance, rejection, or withdrawal consistent with forthcoming DPDP Rules on notice and consent.
<br/><br/>
<strong>Children’s data:</strong>
<br/>
A “child” is an individual under 18 years of age, and processing children’s data requires verifiable parental/guardian consent as prescribed.
We do not undertake processing likely to cause a detrimental effect on a child’s well-being and avoid behavioral tracking or targeted advertising directed at children.
<br/><br/>
<strong>Sharing with service providers and partners:</strong>
<br/>
We engage processors (e.g., hosting, analytics, communication tools) under valid contracts that require confidentiality, security, breach reporting, and deletion on instruction.
Where necessary, we may disclose data to government authorities or as required by law, judgment, or to protect rights, safety, and lawful interests.
<br/><br/>
<strong>International transfers:</strong>
<br/>
Cross‑border transfers for processing are permitted except to any country or territory restricted by the Government of India; transfers occur only under valid contracts.
We will adhere to any additional restrictions or local storage mandates that may be introduced via sectoral regulations or future DPDP Rules.
<br/><br/>
<strong> Retention:</strong>
<br/>
We retain personal data only as long as necessary for the specified purpose or as required by law, and then erase it, including ensuring deletion by processors.
If consent is withdrawn, we cease processing and instruct processors to cease and erase unless retention is required by applicable laws.
<br/><br/>
<strong>Security:</strong>
<br/>
We implement appropriate technical and organizational measures, including reasonable security safeguards, to protect personal data against unauthorized processing and breaches.
Measures will align with DPDP Act requirements and emerging Rules regarding encryption, access controls, logging, monitoring, backups, and contractual safeguards with processors.
<br/><br/>
<strong>Breach notification:</strong>
<br/>
In the event of a personal data breach, we will notify the Data Protection Board of India and each affected data principal as prescribed by the DPDP Act and rules.
Separately, applicable CERT‑In Directions require certain entities to report specified cyber incidents (including data breaches/leaks) within six hours of noticing or being notified, and we will align breach handling with those mandates where applicable.
<br/><br/>
<strong>Your rights:</strong>
<br/>
Data principals have rights to access information about personal data, request correction/ completion/updating, request erasure (subject to legal retention), withdraw consent, seek grievance redressal, and nominate a person to act in cases of death or incapacity.
These rights are exercised through the mechanisms we publish, and responses will be provided within timelines prescribed by law and rules.
<br/><br/>
<strong>Grievance redressal and contact:</strong>
<br/>
Primary contact for privacy queries and grievances (business contact): Email: swarnshauryam@gmail.com; Phone: +91 8860800997; Address: Registered office listed above.
Website: unitewings.com (for service information and updates to this Policy and contact details).
<br/><br/>
<strong>Legal basis under SPDI Rules (transition):</strong>
<br/>
Until fully replaced by DPDP rules, the SPDI Rules may require prior written consent for collection, disclosure, and transfer of SPDI; impose reasonable security practices; and provide additional rights to review/update SPDI.
We continue to honor these obligations alongside the DPDP Act during the transition period identified by authoritative guidance.
<br/><br/>
<strong>Third‑party links:</strong>
<br/>
This website may contain links to third‑party sites, tools, or services; their privacy practices are governed by their own policies, and review of those policies is recommended.
Data shared with third parties at the user’s direction or via integrations will be subject to the recipient’s terms and safeguards.
<br/><br/>
<strong>Changes to this Policy:</strong>
<br/>
We may update this Policy to reflect legal, technical, or operational changes, and will indicate the latest effective date and provide appropriate notice where required.
Continued use of our services after updates indicates acknowledgment of the revised Policy to the extent permitted by applicable law.
<br/><br/>
<strong>Governing law and jurisdiction:</strong>
<br/>
This Policy and any disputes are governed by the laws of India, with appropriate forum and jurisdiction consistent with our incorporation and registered office in Uttarakhand.
Any mandatory dispute resolution or appellate routes created under the DPDP Act (e.g., grievance redressal first, then Data Protection Board, then TDSAT appeals) will apply.
<br/><br/>
<strong>Effective date:</strong>
<br/>
Effective date: 13 September 2025.
<br/><br/>
<strong>Key definitions:</strong>
<br/>
“Data Fiduciary,” “Data Principal,” “processing,” “personal data breach,” “child,” and “certain legitimate uses” have the meanings set out in the DPDP Act.
<br/><br/>
“Sensitive personal data or information (SPDI)” has the meaning set out in the SPDI Rules.
<br/><br/>
Organization identifiers and contact:<br/>
<em> Unite Wings Educational Confederation; CIN: U85500UT2025NPL019683; PAN: AADCU9056A; TAN: MRTU04622C.
<br/>
<strong>Registered office</strong>: C/O J. S. Verma, Padmavati Niwas, Main Road, Vidon (Bidon) Gaon, Narendranagar, Tehri Garhwal – 249175, Uttarakhand, India; Email: hello@unitewings.com.</em>`}
            />
        </>
    );
};

export default PrivacyPolicy;