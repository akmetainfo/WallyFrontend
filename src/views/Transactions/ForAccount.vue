<template>
  <div>
    <div v-if="!errored && !loading">
      <table class="table table-bordered table-sm">
        <thead>
          <tr>
            <td>{{ $t("transaction.forAccount.headers.created") }}</td>
            <td>{{ $t("transaction.forAccount.headers.correspondent") }}</td>
            <td>{{ $t("transaction.forAccount.headers.category") }}</td>
            <td>{{ $t("transaction.forAccount.headers.checked") }}</td>
            <td>{{ $t("transaction.forAccount.headers.expence") }}</td>
            <td>{{ $t("transaction.forAccount.headers.income") }}</td>
            <td>{{ $t("transaction.forAccount.headers.comment") }}</td>
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
            <td>{{ getCorrespondent(item) }}</td>
            <td>
              <transaction-category-list
                :transactions="item.categories"
              ></transaction-category-list>
            </td>
            <td>{{ item.checked ? "Y" : "N" }}</td>
            <td>{{ getDebet(item) }}</td>
            <td>{{ getCredit(item) }}</td>
            <td>{{ item.comment }}</td>
          </tr>
        </tbody>
      </table>
      <nav-pagination
        @switch-paged="switchPaged"
        @goto-page="gotoPage"
        @page-size="pageSize"
        :paged-query="pagedQuery"
        :total-elements="totalElements"
      ></nav-pagination>
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
import TransactionHelper from "@/common/module.transaction";
import PaginationMixin from "@/mixins/PaginationMixin";
import NavPagination from "@/components/NavPagination";
import TransactionCategoryList from "@/components/TransactionCategory/List";

export default {
  name: "TransactionsForAccount",
  components: { NavPagination, TransactionCategoryList },
  mixins: [BaseApiRequestMixin, PaginationMixin],
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  methods: {
    executeRequest() {
      this.request(
        "/Transaction/List",
        Object.assign(this.filter, this.getPaging()),
        response => {
          this.transactions = response.data.transactions;
          this.totalElements = response.data.totalElements;
        }
      );
    },
    getDebet(item) {
      return TransactionHelper.getDebet(item, this.filter.AccountId);
    },
    getCredit(item) {
      return TransactionHelper.getCredit(item, this.filter.AccountId);
    },
    getCorrespondent(item) {
      return TransactionHelper.getCorrespondent(item, this.filter.AccountId);
    }
  },
  data() {
    return {
      transactions: null
    };
  },
  watch: {
    $route() {
      this.executeRequest();
    }
  },
  mounted() {
    this.executeRequest();
  }
};
</script>
