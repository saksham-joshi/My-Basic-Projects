import { getImagePath } from "@/lib/utils";
import { Blog } from "@/types/blog";

const getBlogData = (): Blog[] => [
  {
    id: 1,
    title: "Best UI components for modern websites",
    paragraph:
      "Discover the top UI components that will help you build sleek, user-friendly, attractive websites in no time with minimal cost. From navigation bars to interactive buttons, learn how to integrate these essential elements for a smooth user experience.",
    image: getImagePath("/images/blog/blog-01.jpg"),
    author: {
      name: "Samuyl Joshi",
      image: getImagePath("/images/blog/author-01.png"),
      designation: "Graphic Designer",
    },
    tags: ["creative"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "9 simple ways to improve your design skills",
    paragraph:
      "Are you ready to elevate your design skills? This post breaks down nine actionable tips that will help you refine your craft, think outside the box, and start designing like a pro. Whether you're a beginner or an experienced designer, there's something here for everyone.",
    image: getImagePath("/images/blog/blog-02.jpg"),
    author: {
      name: "Musharof Chy",
      image: getImagePath("/images/blog/author-02.png"),
      designation: "Content Writer",
    },
    tags: ["computer"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Tips to quickly improve your coding speed.",
    paragraph:
      "In the fast-paced world of coding, efficiency is key. Learn the top strategies to boost your coding speed, improve your problem-solving skills, and reduce development time. These tips will help you code faster while maintaining high-quality results.",
    image: getImagePath("/images/blog/blog-03.jpg"),
    author: {
      name: "Lethium Deo",
      image: getImagePath("/images/blog/author-03.png"),
      designation: "Graphic Designer",
    },
    tags: ["design"],
    publishDate: "2025",
  },
];

export default getBlogData;
