<template>
  <form @submit="$emit('save-form')">
    <div class="form-group">
      <label for="title">{{ $t("category.editor.property.title") }}</label>
      <input v-model="category.title" id="title" class="form-control" />
    </div>
    <div class="form-group">
      <input
        type="submit"
        :value="$t('category.editor.button.save')"
        class="btn btn-outline-secondary"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "CategoryEditor",
  props: {
    category: {
      type: Object,
      required: true
    }
  }
};
</script>
