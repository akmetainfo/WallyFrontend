<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-light bg-light">
    <a href="/" class="navbar-brand">{{ $t("menu.home") }}</a>

    <router-link
      to="/Transaction/Create"
      class="nav-brand"
      v-if="isAuthenticated"
      >{{ $t("menu.quick.new_transaction") }}</router-link
    >

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar1"
      aria-controls="navbar1"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar1">
      <menu-main />
      <menu-user />
    </div>
  </nav>
</template>

<script>
import MenuMain from "@/components/MenuMain";
import MenuUser from "@/components/MenuUser";
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  components: {
    MenuMain,
    MenuUser
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
