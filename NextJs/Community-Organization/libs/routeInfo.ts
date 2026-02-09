const RoutePages = {
  Home: {
    text: "Home",
    route: "/",
  },
  Collab: {
    text: "Collaborate",
    route: "/Collab",
  },
  Team: {
    text: "Team",
    route: "/Team",
  },
  Events: {
    text: "Events",
    route: "/Events",
  },
  Contact: {
    text: "Contact",
    route: "/Contact",
  },
  Faq: {
    text: "Faq",
    route: "/Faq",
  },
  Register: {
    text: "Register",
    route: "/Register",
  },
};

export const RouteInfo = {
  navbarOrder: [
    RoutePages.Home,
    RoutePages.Collab,
    RoutePages.Team,
    RoutePages.Events,
    RoutePages.Contact,
  ],

  routes: {
    Home: RoutePages.Home.route,
    Collaborate: RoutePages.Collab.route,
    Team: RoutePages.Team.route,
    Events: RoutePages.Events.route,
    Contact: RoutePages.Contact.route,
    Faq: RoutePages.Faq.route,
    Register: RoutePages.Register.route,
  },
};
