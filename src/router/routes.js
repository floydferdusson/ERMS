const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("layouts/Login.vue"),
  },
  {
    path: "/Dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DashboardPage.vue") },
      { path: "/PDS", component: () => import("pages/PDS.vue") },
      { path: "/UpdateHistory", component: () => import("pages/UpdateRequest.vue") },
      { path: "/applied-positions", component: () => import("pages/AppliedPositionsPage.vue") }
    ],
  },
  { path: "/printpds", component: () => import("pages/PrintLayout.vue") },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
