import Vue from "vue";
import VueI18n from "vue-i18n";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/js/bootstrap.min";
import "jquery/dist/jquery.slim.min";
import "popper.js/dist/popper.min";
import ApiService from "@/services/api";
import DateFilter from "@/common/date.filter";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { languages, defaultLocale } from "./i18n/index";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
ApiService.init();
Vue.filter("date", DateFilter);
Vue.filter("money", value =>
  parseFloat(Math.round(value * 100) / 100).toFixed(2)
);

Vue.use(VueI18n);
const messages = Object.assign(languages);
const i18n = new VueI18n({
  locale: defaultLocale,
  fallbackLocale: "en",
  messages
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
