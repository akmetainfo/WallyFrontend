<template>
  <div>
    <div v-if="!errored && !loading">
      <ul class="list-group">
        <li
          v-for="transaction in transactions"
          :key="transaction.id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <router-link
            :to="{
              name: 'TransactionDetail',
              params: { id: transaction.id }
            }"
            >{{ transaction.created | date }}</router-link
          >
          <span>{{ transaction.amount | money }}</span>
        </li>
      </ul>
    </div>
    <div v-if="!errored && loading" class="alert alert-info">
      {{ $t("api.request.state.loading") }}…
    </div>
    <div v-if="errored" class="alert alert-danger">
      {{ $t("api.request.state.error") }}: {{ this.error_text }}
    </div>
  </div>
</template>

<script>
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";

export default {
  name: "NonCategorizedTransactions",
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      transactions: null
    };
  },
  mounted() {
    this.request("/Report/NonCategorizedTransactions", {}, response => {
      this.transactions = response.data.transactions;
    });
  }
};
</script>
