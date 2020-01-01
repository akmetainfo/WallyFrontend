<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("reports.index.title") }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportsIndex",
  metaInfo() {
    return {
      title: this.$i18n.t("reports.index.title")
    };
  }
};
</script>
