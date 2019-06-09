import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Base from "./views/Base.vue";
import Dashboard from "./views/Dashboard.vue";
import Services from "./services";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Base",
      component: Base,
      beforeEnter: Services.isAuthenticated,
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard
        },
        {
          path: "/domains/",
          name: "domains",
          component: () =>
            import(/* webpackChunkName: "domains" */ "./views/Domains.vue")
        },
        {
          path: "/domains/view/:id/",
          name: "domaindetail",
          component: () =>
            import(/* webpackChunkName: "domaindetail" */ "./views/DomainDetail.vue")
        },
        {
          path: "/data-extensions/",
          name: "dataextensions",
          component: () =>
            import(/* webpackChunkName: "dataextension" */ "./views/DataExtensions.vue")
        },
        {
          path: "/infra-profiles/",
          name: "infraprofiles",
          component: () =>
            import(/* webpackChunkName: "environmentprofiles" */ "./views/InfraProfiles.vue")
        }
      ]
    },
    {
      path: "/signin/",
      name: "signin",
      component: Login
    },
    {
      path: "/signup/",
      name: "signup",
      component: Register
    },
    {
      path: "/forgot-password/",
      name: "forgotpassword",
      component: ForgotPassword
    },
    {
      path: "/reset-password/:id/",
      name: "resetpassword",
      component: ResetPassword
    }
  ]
});
