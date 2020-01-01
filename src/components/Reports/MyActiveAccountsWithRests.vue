<template>
  <div>
    <div v-if="!errored && !loading">
      <table class="table">
        <tr v-for="account in accounts" :key="account.id">
          <td>
            <router-link
              :to="{
                name: 'AccountIndex',
                params: { AccountId: Number(account.id) }
              }"
              >{{ account.title }}</router-link
            >
          </td>
          <td class="text-right">{{ account.rest | money }}</td>
        </tr>
      </table>
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
  name: "MyActiveAccountsWithRests",
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      query: {
        paged: false,
        pagedOffset: null,
        pagedLimit: null
      },
      accounts: null
    };
  },
  mounted() {
    this.request("/Account/ListWithRests", this.query, response => {
      this.accounts = response.data.accounts;
    });
  }
};
</script>
