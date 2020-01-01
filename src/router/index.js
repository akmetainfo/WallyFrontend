import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

import Home from "@/views/Home";
import Login from "@/components/Login";
import AccountCreate from "@/views/Accounts/Create";
import AccountEdit from "@/views/Accounts/Edit";
import AccountIndex from "@/views/Accounts/Index";
import AccountsList from "@/views/Accounts/List";
import AccountsMerge from "@/views/Accounts/Merge";
import CategoriesCreate from "@/views/Categories/Create";
import CategoriesList from "@/views/Categories/List";
import CategoriesEdit from "@/views/Categories/Edit";
import CurrenciesList from "@/views/Currencies/List";
import ReportsIndex from "@/views/Reports/Index";
import TransactionDetail from "@/views/Transactions/Detail";
import TransactionsSearch from "@/views/Transactions/Search";
import TransactionCreate from "@/views/Transactions/Create";
import TransactionEdit from "@/views/Transactions/Edit";
import TransactionDelete from "@/views/Transactions/Delete";
import TransactionDuplicate from "@/views/Transactions/Duplicate";
import TransactionCategoryCreate from "@/views/TransactionCategory/Create";
import TransactionCategoryEdit from "@/views/TransactionCategory/Edit";
import TransactionCategoryDelete from "@/views/TransactionCategory/Delete";
import UsersList from "@/views/Users/List";
import store from "../store";

Vue.use(VueRouter);
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/Accounts/Index/:AccountId/:HideChecked?",
    name: "AccountIndex",
    component: AccountIndex,
    props(route) {
      return {
        AccountId: Number(route.params.AccountId)
      };
    },
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Accounts/Create",
    name: "AccountCreate",
    component: AccountCreate,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Accounts/Edit/:id",
    name: "AccountEdit",
    component: AccountEdit,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Accounts/List",
    name: "AccountsList",
    component: AccountsList,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Accounts/Merge",
    component: AccountsMerge,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Categories/Create",
    name: "CategoriesCreate",
    component: CategoriesCreate,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Categories/List",
    name: "CategoriesList",
    component: CategoriesList,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Categories/Edit/:id",
    name: "CategoriesEdit",
    component: CategoriesEdit,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Currencies/List",
    name: "CurrenciesList",
    component: CurrenciesList,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Reports/Index",
    name: "ReportsIndex",
    component: ReportsIndex,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Detail/:id",
    name: "TransactionDetail",
    component: TransactionDetail,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Search/",
    name: "TransactionsSearch",
    component: TransactionsSearch,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Create",
    name: "TransactionCreate",
    component: TransactionCreate,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Edit/:id",
    name: "TransactionEdit",
    component: TransactionEdit,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Delete/:id",
    name: "TransactionDelete",
    component: TransactionDelete,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Transaction/Duplicate/:id",
    name: "TransactionDuplicate",
    component: TransactionDuplicate,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/TransactionCategory/Create/:id",
    name: "TransactionCategoryCreate",
    component: TransactionCategoryCreate,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/TransactionCategory/Edit/:id",
    name: "TransactionCategoryEdit",
    component: TransactionCategoryEdit,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/TransactionCategory/Delete/:id",
    name: "TransactionCategoryDelete",
    component: TransactionCategoryDelete,
    props: true,
    beforeEnter: ifAuthenticated
  },
  {
    path: "/Users/List",
    name: "UsersList",
    component: UsersList,
    beforeEnter: ifAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
