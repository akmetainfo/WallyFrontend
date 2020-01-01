<template>
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <router-link
        to="/Accounts/Create"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.create_account") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Reports/Index"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.reports") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Categories/List"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.categories") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Categories/Create"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.create_category") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Accounts/List"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.accounts") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Accounts/Merge"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.merge_accounts") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Users/List"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.users") }}</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/Currencies/List"
        class="nav-link"
        @click.native="closeMenu($event)"
        >{{ $t("menu.main.currencies") }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import JQuery from "jquery";

export default {
  name: "MenuMain",
  methods: {
    closeMenu($event) {
      JQuery($event.currentTarget)
        .closest(".navbar-collapse")
        .collapse("hide");
    }
  }
};
</script>
