<template>
  <form class="form-inline">
    <label for="Needle" class="mx-2">{{
      $t("account.list.filter.title")
    }}</label>
    <input
      type="text"
      id="Needle"
      v-model="filter.Needle"
      class="form-control mx-2"
    />
    <label for="isCorrespondent" class="mx-2">{{
      $t("account.list.filter.isCorrespondent")
    }}</label>
    <select
      v-model="filter.isCorrespondent"
      type="Boolean"
      class="form-control"
    >
      <option
        v-for="item in isCorrespondentFilter"
        :key="item.id"
        :value="item.id"
        :selected="item.id == filter.isCorrespondent"
        >{{ $t(item.text) }}</option
      >
    </select>
    <label for="isActive" class="mx-2">{{
      $t("account.list.filter.isActive")
    }}</label>
    <select v-model="filter.isActive" type="Boolean" class="form-control">
      <option
        v-for="item in isActiveFilter"
        :key="item.id"
        :value="item.id"
        :selected="item.id == filter.isActive"
        >{{ $t(item.text) }}</option
      >
    </select>
    <button
      type="button"
      class="btn btn-secondary mx-2"
      v-on:click="$emit('filters-changed')"
    >
      {{ $t("account.list.filter.button.submit") }}
    </button>
  </form>
</template>

<script>
export default {
  name: "AccountsListFilters",
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isCorrespondentFilter: [
        { id: null, text: "account.list.filter.isCorrespondent.both" },
        { id: false, text: "account.list.filter.isCorrespondent.myAccounts" },
        { id: true, text: "account.list.filter.isCorrespondent.correspondents" }
      ],
      isActiveFilter: [
        { id: null, text: "account.list.filter.isActive.both" },
        { id: false, text: "account.list.filter.isActive.no" },
        { id: true, text: "account.list.filter.isActive.yes" }
      ]
    };
  }
};
</script>
