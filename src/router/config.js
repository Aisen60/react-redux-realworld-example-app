import loadable from "../utils/loadable";

export const appRouter = [
  {
    name: "home",
    path: "/",
    exact: true,
    component: loadable(() => import("../pages/Home")),
  },
  {
    name: "signIn",
    path: "/login",
    exact: true,
    component: loadable(() => import("../pages/Login")),
  },
  {
    name: "signUp",
    path: "/register",
    exact: true,
    component: loadable(() => import("../pages/Register")),
  },
  {
    name: "newPost",
    path: "/editor",
    exact: true,
    component: loadable(() => import("../pages/Editor")),
    checked: true,
  },
  {
    name: "settings",
    path: "/settings",
    exact: true,
    component: loadable(() => import("../pages/Settings")),
    checked: true,
  },
  {
    name: "profile",
    path: "/@:username",
    exact: true,
    component: loadable(() => import("../pages/Profile")),
    checked: true,
  },
  {
    name: "profile",
    path: "/@:username/favorites",
    exact: true,
    component: loadable(() => import("../pages/Profile")),
    checked: true,
  },
];

export default appRouter;
