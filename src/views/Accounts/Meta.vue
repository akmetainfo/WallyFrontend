<template>
  <div>
    <div v-if="!errored && !loading">
      <h1>{{ account.title }}</h1>
      <div>
        <div>
          {{ $t("account.list.item.isActive") }}: {{ account.isActive }}
        </div>
        <div>
          {{ $t("account.list.item.isCorrespondent") }}:
          {{ account.isCorrespondent }}
        </div>
        <div>
          {{ $t("account.list.item.currency") }}: {{ account.currencyCode }}
        </div>
      </div>
      <p>
        <router-link
          :to="{ name: 'AccountEdit', params: { id: this.accountId } }"
          class="btn btn-outline-secondary"
          >edit account</router-link
        >
      </p>
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
  name: "AccountMeta",
  metaInfo() {
    return {
      title: this.account.title
    };
  },
  mixins: [BaseApiRequestMixin],
  props: {
    accountId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      account: {
        title: ""
      }
    };
  },
  mounted() {
    this.request("/Account/Index", { AccountId: this.accountId }, response => {
      this.account = response.data;
    });
  }
};
</script>
