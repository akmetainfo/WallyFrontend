<template>
  <div id="app">
    <navigation></navigation>
    <router-view />
    <page-footer />
  </div>
</template>

<script>
import { PROJECT_TITLE } from "@/config/config";
import PageFooter from "@/components/PageFooter";
import Navigation from "@/components/Navigation";

export default {
  name: "App",
  components: {
    PageFooter,
    Navigation
  },
  metaInfo: {
    title: "default title",
    titleTemplate: `%s | ${PROJECT_TITLE}`
  }
};
</script>

<style>
#app {
  margin-top: 60px;
}
</style>
