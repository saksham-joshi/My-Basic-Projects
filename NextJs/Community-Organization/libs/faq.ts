import { FaqSectionData } from "./utils";

export const FAQ : Array<FaqSectionData> = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What is TechbyHimalayas?",
        answer:
          "TechbyHimalayas is a community-driven platform dedicated to empowering tech talent in the Himalayan region through education, networking, and opportunities. We connect tech enthusiasts, professionals, and learners to foster growth and innovation in the region.",
      },
      {
        question: "How can I join TechbyHimalayas?",
        answer:
          "You can join TechbyHimalayas by signing up on our website. Membership is free and gives you access to our community events, resources, and networking opportunities. You can also follow us on social media to stay updated with our latest activities.",
      },
      {
        question: "Is TechbyHimalayas only for developers?",
        answer:
          "No, TechbyHimalayas is for anyone interested in technology, including developers, designers, product managers, data scientists, and tech entrepreneurs. We welcome people at all skill levels, from beginners to experienced professionals.",
      },
    ],
  },
  {
    title: "Community & Events",
    faqs: [
      {
        question: "What types of events does TechbyHimalayas organize?",
        answer:
          "We organize various events including workshops, hackathons, tech talks, networking meetups, and career fairs. These events are designed to help members learn new skills, connect with others, and explore career opportunities in tech.",
      },
      {
        question: "How can I participate in TechbyHimalayas events?",
        answer:
          "You can participate in our events by registering through our website or social media channels. Some events are free, while others may have a nominal fee to cover costs. We also encourage members to suggest and organize events.",
      },
      {
        question: "Can I host an event with TechbyHimalayas?",
        answer:
          "Yes, we welcome community members to host events. If you have an idea for a tech-related event, you can reach out to us through our website or contact our community team directly. We provide support with promotion, logistics, and resources.",
      },
    ],
  },
  {
    title: "Career & Opportunities",
    faqs: [
      {
        question: "Does TechbyHimalayas help with job placements?",
        answer:
          "Yes, we help connect our community members with job opportunities through our network of partner companies. We organize career fairs, job boards, and networking events specifically designed to facilitate job placements.",
      },
      {
        question: "How can companies partner with TechbyHimalayas?",
        answer:
          "Companies can partner with us by reaching out through our website. We offer various partnership opportunities including event sponsorship, hiring programs, and educational initiatives. We work with companies of all sizes, from startups to established tech firms.",
      },
      {
        question: "What career support does TechbyHimalayas provide?",
        answer:
          "We provide career support through mentorship, resume reviews, interview preparation, skill assessments, and networking opportunities. Our goal is to help members navigate their tech careers and find opportunities that match their skills and interests.",
      },
    ],
  },
] as const;
