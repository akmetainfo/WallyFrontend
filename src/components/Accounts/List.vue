<template>
  <div class="list-group">
    <div
      v-for="item in accounts"
      :key="item.id"
      class="list-group-item list-group-item-action flex-column align-items-start"
    >
      <h5>{{ item.title }}</h5>
      <div>{{ $t("account.list.item.isActive") }}: {{ item.isActive }}</div>
      <div>
        {{ $t("account.list.item.isCorrespondent") }}:
        {{ item.isCorrespondent }}
      </div>
      <div>{{ $t("account.list.item.currency") }}: {{ item.currencyCode }}</div>
      <pre style="min-height: 4em;">{{ item.notes }}</pre>
      <router-link
        :to="{ name: 'AccountEdit', params: { id: item.id } }"
        class="btn btn-outline-secondary"
        >{{ $t("account.list.action.edit") }}</router-link
      >
      <router-link
        :to="{ name: 'AccountIndex', params: { AccountId: item.id } }"
        class="btn btn-outline-secondary"
        >{{ $t("account.list.action.view") }}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountsList",
  props: {
    accounts: {
      type: Array,
      required: true
    }
  }
};
</script>
