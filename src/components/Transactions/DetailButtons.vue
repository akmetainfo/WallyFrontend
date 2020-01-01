<template>
  <div class="alert alert-info">
    <router-link
      :to="{ name: 'TransactionEdit', params: { id: info.transaction.id } }"
      class="btn btn-outline-secondary"
      >{{ $t("transaction.detail.buttons.edit") }}</router-link
    >
    <router-link
      :to="{
        name: 'TransactionDuplicate',
        params: { id: info.transaction.id }
      }"
      class="btn btn-outline-secondary"
      >{{ $t("transaction.detail.buttons.duplicate") }}</router-link
    >
    <router-link
      :to="{ name: 'TransactionDelete', params: { id: info.transaction.id } }"
      class="btn btn-outline-secondary"
      >{{ $t("transaction.detail.buttons.delete") }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "TransactionDetailButtons",
  metaInfo() {
    return {
      title: `${this.$i18n.t("transaction.detail.title")} ${
        this.info.transaction.id
      }`
    };
  },
  props: {
    info: {
      type: Object,
      required: true
    }
  }
};
</script>
