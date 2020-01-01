<template>
  <form @submit="$emit('save-form')">
    <div class="form-group">
      <label for="categoryId">{{
        $t("transactionCategory.editor.property.category")
      }}</label>
      <select
        v-model="transactionCategory.categoryId"
        id="categoryId"
        class="form-control"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          >{{ category.title }}</option
        >
      </select>
    </div>
    <div class="form-group">
      <label for="amount">{{
        $t("transactionCategory.editor.property.amount")
      }}</label>
      <input
        v-model="transactionCategory.amount"
        id="amount"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="comment">{{
        $t("transactionCategory.editor.property.comment")
      }}</label>
      <input
        v-model="transactionCategory.comment"
        id="comment"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <input
        type="submit"
        :value="$t('transactionCategory.editor.button.save')"
        class="btn btn-outline-secondary"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "TransactionCategoryEditor",
  props: {
    transactionCategory: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>
