<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("category.list.title") }}</h1>
      </div>
    </div>
    <div class="row" v-if="!errored && !loading">
      <div class="col-12 col-sm-12 col-md-6">
        <div class="list-group">
          <div
            v-for="category in categories"
            :key="category.id"
            class="list-group-item list-group-item-action flex-column align-items-start"
          >
            <h5>{{ category.title }}</h5>
            <router-link
              :to="{ name: 'CategoriesEdit', params: { id: category.id } }"
              class="btn btn-outline-secondary"
              >{{ $t("category.list.action.edit") }}</router-link
            >
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
  name: "CategoriesList",
  metaInfo() {
    return {
      title: this.$i18n.t("category.list.title")
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
      categories: null
    };
  },
  methods: {
    executeRequest: function executeRequest() {
      this.request(
        "/Category/List",
        Object.assign({}, this.getPaging()),
        response => {
          this.categories = response.data.categories;
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
