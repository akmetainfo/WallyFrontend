<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("transactionCategory.edit.title") }}</h2>
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
  name: "TransactionCategoryEdit",
  metaInfo() {
    return {
      title: this.$i18n.t("transactionCategory.edit.title")
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
        id: null,
        categoryId: null,
        amount: null,
        comment: null
      },
      categories: {
        id: null,
        title: null
      }
    };
  },
  methods: {
    saveForm() {
      this.request(
        "/TransactionCategory/Update",
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
      this.request("/TransactionCategory/Detail", { Id: this.id }, response => {
        this.transactionCategory = response.data;
      })
    ]);
  }
};
</script>
