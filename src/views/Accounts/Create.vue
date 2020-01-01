<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("account.create.title") }}</h2>
        </div>
        <div class="col-md-4">
          <account-editor
            :account="account"
            :currencies="currencies"
            @save-form="saveForm"
          ></account-editor>
        </div>
      </div>
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
import AccountEditor from "@/components/Accounts/Editor";
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import { DEFAULT_CURRENCY } from "@/config/config";

export default {
  name: "AccountCreate",
  metaInfo() {
    return {
      title: this.$i18n.t("account.create.title")
    };
  },
  components: { AccountEditor },
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      account: {
        id: 0,
        title: "",
        notes: "",
        isActive: true,
        isCorrespondent: true,
        currencyId: DEFAULT_CURRENCY
      },
      currencies: []
    };
  },
  methods: {
    saveForm() {
      this.request("/Account/Create", { account: this.account }, () => {
        this.$router.push("/");
        location.reload();
      });
    }
  },
  mounted() {
    this.request("/Currency/List", {}, response => {
      this.currencies = response.data.currencies;
    });
  }
};
</script>
