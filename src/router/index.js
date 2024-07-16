import {route} from "quasar/wrappers";
import {createMemoryHistory, createRouter, createWebHistory,} from "vue-router";
import routes from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Add navigation guard to check if the user is authenticated
Router.beforeEach((to, from, next) => {
  const isAuthenticated = window.localStorage.getItem('LoginStore') !== null;

  // If the user is not authenticated and is trying to access a protected route, redirect to login
  if (to.path === '/print') {
    next();
  }
  else if (!isAuthenticated && to.path !== '/' ) {
    next('/');
  } else {
    next();
  }
});

  return Router;
});
