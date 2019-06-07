import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/domains",
      name: "domains",
      component: () =>
        import(/* webpackChunkName: "domains" */ "./views/Domains.vue"),
      children: []
    },
    {
      path: "/domains/view/:id",
      name: "domaindetail",
      component: () =>
        import(/* webpackChunkName: "domaindetail" */ "./views/DomainDetail.vue")
    },
    {
      path: "/data-extensions",
      name: "dataextensions",
      component: () =>
        import(/* webpackChunkName: "dataextension" */ "./views/DataExtensions.vue")
    },
    {
      path: "/infra-profiles",
      name: "infraprofiles",
      component: () =>
        import(/* webpackChunkName: "environmentprofiles" */ "./views/InfraProfiles.vue")
    }
  ]
});
