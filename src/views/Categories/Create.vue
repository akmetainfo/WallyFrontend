<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("category.create.title") }}</h2>
        </div>
        <div class="col-md-4">
          <category-editor
            :category="category"
            @save-form="saveForm"
          ></category-editor>
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
import CategoryEditor from "@/components/Categories/Editor";
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";

export default {
  name: "CategoryCreate",
  metaInfo() {
    return {
      title: this.$i18n.t("category.create.title")
    };
  },
  components: { CategoryEditor },
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      category: {
        id: 0,
        title: ""
      }
    };
  },
  methods: {
    saveForm() {
      this.request("/Category/Create", { category: this.category }, () => {
        this.$router.push("/");
        location.reload();
      });
    }
  }
};
</script>
