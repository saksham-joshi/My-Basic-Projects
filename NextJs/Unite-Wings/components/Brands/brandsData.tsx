import { getImagePath } from "@/lib/utils";
import { Brand } from "@/types/brand";

const getBrandsData = (): Brand[] => [
  {
    id: 1,
    name: "UIdeck",
    href: "https://uideck.com",
    image: getImagePath("/images/brands/uideck.svg"),
    imageLight: getImagePath("/images/brands/uideck-light.svg"),
  },
  {
    id: 2,
    name: "Tailgrids",
    href: "https://tailgrids.com",
    image: getImagePath("/images/brands/tailgrids.svg"),
    imageLight: getImagePath("/images/brands/tailgrids-light.svg"),
  },
  {
    id: 3,
    name: "Lineicons",
    href: "https://lineicons.com",
    image: getImagePath("/images/brands/lineicons.svg"),
    imageLight: getImagePath("/images/brands/lineicons-light.svg"),
  },
  {
    id: 4,
    name: "Ayro UI",
    href: "https://ayroui.com",
    image: getImagePath("/images/brands/ayroui.svg"),
    imageLight: getImagePath("/images/brands/ayroui-light.svg"),
  },
  {
    id: 5,
    name: "PlainAdmin",
    href: "https://plainadmin.com",
    image: getImagePath("/images/brands/plainadmin.svg"),
    imageLight: getImagePath("/images/brands/plainadmin-light.svg"),
  },
];

export default getBrandsData;
