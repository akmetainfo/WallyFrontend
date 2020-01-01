<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("transaction.create.title") }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <transaction-editor
            :transaction="transaction"
            @save-form="saveForm"
          ></transaction-editor>
        </div>
        <div class="col-12 col-md-6 col-lg-6">
          <search-account
            @set-source="onSource"
            @set-destination="onDestination"
          ></search-account>
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
import TransactionEditor from "@/components/Transactions/Editor";
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import SearchAccount from "@/components/Search/Account";

export default {
  name: "TransactionCreate",
  metaInfo() {
    return {
      title: this.$i18n.t("transaction.create.title")
    };
  },
  components: {
    TransactionEditor,
    SearchAccount
  },
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      transaction: {
        id: 0,
        created: new Date().toISOString(),
        amountSource: 100,
        amountDestination: 100,
        checked: false,
        comment: "",
        sourceId: 0,
        sourceTitle: "",
        destinationId: 0,
        destinationTitle: ""
      }
    };
  },
  methods: {
    saveForm() {
      this.request(
        "/Transaction/Create",
        { Transaction: this.transaction },
        result => {
          this.$router.push({
            name: "TransactionDetail",
            params: { id: result.data.id }
          });
          location.reload();
        }
      );
    },
    onSource(item) {
      this.transaction.sourceTitle = item.title;
      this.transaction.sourceId = item.id;
    },
    onDestination(item) {
      this.transaction.destinationTitle = item.title;
      this.transaction.destinationId = item.id;
    }
  }
};
</script>
