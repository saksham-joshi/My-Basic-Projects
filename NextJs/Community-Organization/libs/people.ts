import { PersonData, TeamPageData } from "./utils";

const TBH_FOUNDER : Array<PersonData> = [
    
];

const TBH_COMMUNITY_HEADS : Array<PersonData> = [
    
];

const TBH_CORE_TEAM : Array<PersonData> = [
    {
        name : "Swati",
        role : "Social Media Manager",
        img : "/images/team/core_team/Swati-Rajput.png",
        linkedin : "www.linkedin.com/in/swati-281017mg",
        email : "swatirajput0128@gmail.com"
    },
    {
        name : "Himanshu Sharma",
        role : "Core Team Member",
        img : "/images/team/core_team/Himanshu-Sharma.jpg",
        linkedin : "https://www.linkedin.com/in/himanshu-sharma-b5476932a",
        email : "himanshusharma13000000@gmail.com"
    },
    {
        name : "Saumya Goswami",
        role : "Social Media Manager",
        img : "/images/team/core_team/Saumya-Goswami.jpeg",
        linkedin : "https://www.linkedin.com/in/saumya-goswami-993816305",
        email : "saumyagoswami3011@gmail.com"
    },
    {
        name : "Kriti",
        role : "Core Team Member",
        img : "/images/team/core_team/Kriti-Singhal.jpg",
        linkedin : "https://www.linkedin.com/in/kriti-singhal-116b75314",
        email : "kritisinghal47@gmail.com"
    },
    {
        name : "Kanak Bhatia",
        role : "Core Team Member",
        img : "/images/team/core_team/Kanak-Bhatia.jpg",
        linkedin : "https://www.linkedin.com/in/kanak-bhatia-778357322",
        email : "bhatiakanak04@gmail.com"
    },
    {
        name : "Sakshi Puri",
        role : "Core Team Member",
        img : "/images/team/core_team/Sakshi-Puri.jpg",
        linkedin : "https://www.linkedin.com/in/sakshi-puri-bb4960325",
        email : "purisakshi533@gmail.com"
    },
    {
        name : "Jiya Sinha",
        role : "Core Team Member",
        img : "/images/team/core_team/Jiya-Sinha.jpg",
        linkedin : "https://www.linkedin.com/in/jiya-sinha-87b8a5325",
        email : "jiyasinha276@gmail.com"
    },
    {
        name : "Paridhi Tayal",
        role : "Core Team Member",
        img : "/images/team/core_team/Paridhi-Tayal.jpg",
        linkedin : "https://www.linkedin.com/in/paridhi-tayal-381209371",
        email : "paridhitayal6@gmail.com"
    },
    {
        name : "Akshat Gupta",
        role : "Core Team Member",
        img : "/images/team/core_team/Akshat-Gupta.jpg",
        linkedin: "https://www.linkedin.com/in/akshat-gupta-966672380",
        email: "akshatgupta160407@gmail.com"
    }
];

const TBH_CAMPUS_AMBASSADORS : Array<PersonData> = [
    
];

export const PEOPLE : Array<TeamPageData> = [
    {
        title: "Founder",
        data : TBH_FOUNDER,
    },
    {
        title : "Community Heads",
        data : TBH_COMMUNITY_HEADS
    },
    {
        title : "Core Team Members",
        data : TBH_CORE_TEAM
    },
    {
        title : "Campus Ambassadors",
        data : TBH_CAMPUS_AMBASSADORS
    }
] as const;
