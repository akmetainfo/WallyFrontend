<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("currency.list.title") }}</h1>
      </div>
    </div>
    <div class="row" v-if="!errored && !loading">
      <div class="col-12 col-sm-12 col-md-6">
        <div class="list-group">
          <div
            v-for="currency in currencies"
            :key="currency.id"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <h5>[{{ currency.id }}] {{ currency.code }}</h5>
          </div>
        </div>
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
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import PaginationMixin from "@/mixins/PaginationMixin";
import NavPagination from "@/components/NavPagination";

export default {
  name: "CurrenciesList",
  metaInfo() {
    return {
      title: this.$i18n.t("currency.list.title")
    };
  },
  components: { NavPagination },
  mixins: [BaseApiRequestMixin, PaginationMixin],
  data() {
    return {
      query: {
        paged: true,
        pagedOffset: 0,
        pagedLimit: 10
      },
      currencies: null
    };
  },
  mounted() {
    this.request("/Currency/List", this.query, response => {
      this.currencies = response.data.currencies;
      this.totalElements = response.data.totalElements;
    });
  }
};
</script>
