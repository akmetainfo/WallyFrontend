<template>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item" v-if="isAuthenticated">
      <a href="#" @click="logout" class="nav-link">{{
        $t("menu.user.logout")
      }}</a>
    </li>
    <li class="nav-item" v-if="!isAuthenticated">
      <router-link to="/login" class="nav-link">{{
        $t("menu.user.login")
      }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MenuUser",
  methods: {
    logout() {
      this.$store
        .dispatch("AUTH_LOGOUT")
        .then(() => this.$router.push("/login"));
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  }
};
</script>
