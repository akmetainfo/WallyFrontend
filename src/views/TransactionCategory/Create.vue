<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("transactionCategory.create.title") }}</h2>
        </div>
        <div class="col-md-4">
          <transaction-category-editor
            :transactionCategory="transactionCategory"
            :categories="categories"
            @save-form="saveForm"
          ></transaction-category-editor>
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
import TransactionCategoryEditor from "@/components/TransactionCategory/Editor";
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import PaginationMixin from "@/mixins/PaginationMixin";

export default {
  name: "TransactionCategoryAdd",
  metaInfo() {
    return {
      title: this.$i18n.t("transactionCategory.create.title")
    };
  },
  components: {
    TransactionCategoryEditor
  },
  mixins: [BaseApiRequestMixin, PaginationMixin],
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      transactionCategory: {
        id: 0,
        categoryId: 2,
        amount: 100,
        transactionId: this.id,
        comment: ""
      },
      categories: {
        id: null,
        title: null
      }
    };
  },
  watch: {
    $route() {
      this.startComponent();
    }
  },
  methods: {
    saveForm() {
      this.request(
        "/TransactionCategory/Create",
        { TransactionCategory: this.transactionCategory },
        () => {
          this.$router.push({
            name: "TransactionDetail",
            params: { id: this.transactionCategory.transactionId }
          });
          location.reload();
        }
      );
    }
  },
  mounted() {
    Promise.all([
      this.request("/Category/List", this.getWithoutPaging(), response => {
        this.categories = response.data.categories;
      }),
      this.request(
        "/Transaction/Detail",
        { TransactionId: this.id },
        response => {
          this.transactionCategory.amount =
            response.data.transaction.amountSource;
        }
      )
    ]);
  }
};
</script>
