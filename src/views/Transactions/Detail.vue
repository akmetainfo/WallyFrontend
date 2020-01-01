<template>
  <div class="container">
    <div v-if="!errored && !loading" class="row">
      <div class="col-12">
        <h1>{{ $t("transaction.detail.title") }} #{{ info.transaction.id }}</h1>

        <transaction-detail-buttons
          :info="this.info"
        ></transaction-detail-buttons>

        <div>
          <div>
            {{ $t("transaction.detail.info.created") }}:
            {{ info.transaction.created | date }}
          </div>
          <div
            v-if="
              this.info.source.currencyId == this.info.destination.currencyId
            "
          >
            {{ $t("transaction.detail.info.amount") }}:
            {{ this.info.transaction.amountSource | money }}
            {{ this.info.source.currencyCode }}
          </div>
          <div v-else>
            {{ $t("transaction.detail.info.amount") }}:
            {{ this.info.transaction.amountSource | money }}
            {{ this.info.source.currencyCode }} ->
            {{ this.info.transaction.amountDestination | money }}
            {{ this.info.destination.currencyCode }}
          </div>
          <div>
            {{ $t("transaction.detail.info.checked") }}:
            {{ info.transaction.checked }}
          </div>
          <div>
            {{ $t("transaction.detail.info.comment") }}:
            <span>{{ info.transaction.comment }}</span>
          </div>
          <div>
            {{ $t("transaction.detail.info.source") }}:
            <router-link
              :to="{
                name: 'AccountIndex',
                params: { AccountId: info.source.id }
              }"
              >{{ info.source.title }}</router-link
            >
          </div>
          <div>
            {{ $t("transaction.detail.info.destination") }}:
            <router-link
              :to="{
                name: 'AccountIndex',
                params: { AccountId: this.info.destination.id }
              }"
              >{{ info.destination.title }}</router-link
            >
          </div>
        </div>

        <transaction-detail-categories
          :info="this.info"
        ></transaction-detail-categories>
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
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import TransactionDetailButtons from "@/components/Transactions/DetailButtons";
import TransactionDetailCategories from "@/components/Transactions/DetailCategories";

export default {
  name: "TransactionDetail",
  metaInfo() {
    return {
      title: this.$i18n.t("transaction.detail.title")
    };
  },
  components: {
    TransactionDetailButtons,
    TransactionDetailCategories
  },
  mixins: [BaseApiRequestMixin],
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      info: null,
      loading: true,
      errored: false
    };
  },
  methods: {
    startComponent() {
      this.request(
        "/Transaction/Detail",
        { TransactionId: this.id },
        response => {
          this.info = response.data;
        }
      );
    }
  },
  watch: {
    $route() {
      this.startComponent();
    }
  },
  mounted() {
    this.startComponent();
  }
};
</script>
