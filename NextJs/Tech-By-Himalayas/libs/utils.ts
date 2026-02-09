import { JSX } from "react";

export type FeatureData = {
  title: string;
  description: string;
  icon: string;
  gradient: string;
};

export type SucessStoryData = {
  name: string;
  role: string;
  story: string;
  icon: string;
  gradient: string;
};

export type FutureEventData = {
  id : string,
  title : string,
  description : string
  date : string
};

export type PastEventData = {
  id : string,
  title : string,
  date : string,
  time : string,
  location : string,
  description : string,
  category : string
};

export type FaqBlockData = {
  question : string,
  answer : string
};

export type FaqSectionData = {
  title : string,
  faqs : Array<FaqBlockData>
};

export type PersonData = {
  name : string,
  email : string,
  linkedin : string,
  role : string,
  img : string
};

export type StatData = {
  label : string,
  value : string,
  icon  : JSX.Element
}

export type FeatureDataWithSVG = {
  title : string,
  description : string,
  icon : JSX.Element
}

export type TeamPageData = {
  title : string,
  data : Array<PersonData>
}