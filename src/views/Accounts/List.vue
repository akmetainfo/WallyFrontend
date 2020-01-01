<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("account.list.title") }}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-info">
          <account-list-filters
            :filter="filter"
            @filters-changed="executeRequest"
          ></account-list-filters>
        </div>
      </div>
    </div>
    <div class="row" v-if="!errored && !loading">
      <div class="col-12 col-sm-12 col-md-6">
        <account-list :accounts="accounts"></account-list>
      </div>
    </div>
    <div class="row" v-if="!errored && !loading">
      <div class="col-12">
        <nav-pagination
          @switch-paged="switchPaged"
          @goto-page="gotoPage"
          @page-size="pageSize"
          :paged-query="pagedQuery"
          :total-elements="totalElements"
        ></nav-pagination>
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
import AccountList from "@/components/Accounts/List";
import AccountListFilters from "@/components/Accounts/ListFilters";
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import PaginationMixin from "@/mixins/PaginationMixin";
import NavPagination from "@/components/NavPagination";

export default {
  name: "AccountsList",
  metaInfo() {
    return {
      title: this.$i18n.t("account.list.title")
    };
  },
  components: { AccountList, AccountListFilters, NavPagination },
  mixins: [BaseApiRequestMixin, PaginationMixin],
  data() {
    return {
      accounts: [],
      filter: {
        isCorrespondent: null,
        isActive: null,
        Needle: ""
      }
    };
  },
  methods: {
    executeRequest: function executeRequest() {
      this.request(
        "/Account/List",
        Object.assign(this.filter, this.getPaging()),
        response => {
          this.accounts = response.data.accounts;
          this.totalElements = response.data.totalElements;
        }
      );
    }
  },
  mounted() {
    this.executeRequest();
  }
};
</script>
