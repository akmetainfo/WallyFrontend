<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("transaction.search.title") }}</h2>
        </div>
        <div class="col-12">
          <div class="alert alert-info">
            <form @submit="executeRequest" class="form-inline">
              <label for="fromDate" class="mx-2"
                >{{ $t("transaction.search.filter.from") }}:
                {{ this.fromDate.toISOString() }}</label
              >
              <label for="toDate" class="mx-2"
                >{{ $t("transaction.search.filter.to") }}
                {{ this.toDate.toISOString() }}</label
              >
              <button type="submit" class="btn btn-secondary mx-2">
                {{ $t("transaction.search.filter.button.submit") }}
              </button>
            </form>
          </div>
        </div>
        <div class="col-md-4">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <td>{{ $t("transaction.search.headers.created") }}</td>
                <td>{{ $t("transaction.search.headers.source") }}</td>
                <td>{{ $t("transaction.search.headers.destination") }}</td>
                <td>{{ $t("transaction.search.headers.categories") }}</td>
                <td>{{ $t("transaction.search.headers.checked") }}</td>
                <td>{{ $t("transaction.search.headers.amount") }}</td>
                <td>{{ $t("transaction.search.headers.comments") }}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in transactions" :key="item.id">
                <td>
                  <router-link
                    :to="{ name: 'TransactionDetail', params: { id: item.id } }"
                    >{{ item.created | date }}</router-link
                  >
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'AccountIndex',
                      params: { AccountId: item.sourceId }
                    }"
                    >{{ item.sourceTitle }}</router-link
                  >
                </td>
                <td>
                  <router-link
                    :to="{
                      name: 'AccountIndex',
                      params: { AccountId: item.destinationId }
                    }"
                    >{{ item.destinationTitle }}</router-link
                  >
                </td>
                <td>
                  <transaction-category-list :transactions="item.categories">
                  </transaction-category-list>
                </td>
                <td>{{ item.checked ? "Y" : "N" }}</td>
                <td>{{ item.amount }}</td>
                <td v-html="getComments(item)"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row" v-if="!errored && loading">
      <div class="col-12 col-sm-12 col-md-6">
        <div class="alert alert-info">
          {{ $t("api.request.state.loading") }}…
        </div>
      </div>
    </div>
    <div class="row" v-if="errored">
      <div class="col-12 col-sm-12 col-md-6">
        <div class="alert alert-danger">
          {{ $t("api.request.state.error") }}: {{ this.error_text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import TransactionHelper from "@/common/module.transaction";
import PaginationMixin from "@/mixins/PaginationMixin";
import TransactionCategoryList from "@/components/TransactionCategory/List";

export default {
  name: "TransactionsSearch",
  metaInfo() {
    return {
      title: this.$i18n.t("transaction.search.title")
    };
  },
  components: { TransactionCategoryList },
  mixins: [BaseApiRequestMixin, PaginationMixin],
  props: {
    categoryId: {
      type: Number,
      required: false,
      default: null
    },
    fromDate: {
      type: Date,
      required: false,
      default: null
    },
    toDate: {
      type: Date,
      required: false,
      default: null
    }
  },
  methods: {
    executeRequest() {
      this.request(
        "/Transaction/List",
        Object.assign(this.$props, this.getPaging()),
        response => {
          this.transactions = response.data.transactions;
          this.totalElements = response.data.totalElements;
        }
      );
    },
    getComments(item) {
      return TransactionHelper.getComments(item.comment);
    }
  },
  data() {
    return {
      transactions: null
    };
  },
  mounted() {
    this.executeRequest();
  }
};
</script>
