<template>
  <form @submit="$emit('save-form')">
    <div class="form-group">
      <label for="title">{{ $t("account.editor.property.title") }}</label>
      <input v-model="account.title" id="title" class="form-control" />
    </div>
    <div class="form-group">
      <label for="title">{{ $t("account.editor.property.notes") }}</label>
      <textarea
        v-model="account.notes"
        id="title"
        class="form-control"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="isActive">{{ $t("account.editor.property.isActive") }}</label>
      <input
        type="checkbox"
        id="isActive"
        v-model="account.isActive"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="isActive">{{
        $t("account.editor.property.isCorrespondent")
      }}</label>
      <input
        type="checkbox"
        id="isCorrespondent"
        v-model="account.isCorrespondent"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="currencyId">{{
        $t("account.editor.property.currencyId")
      }}</label>
      <select v-model="account.currencyId" id="currencyId" class="form-control">
        <option v-for="item in currencies" :key="item.id" :value="item.id">{{
          item.code
        }}</option>
      </select>
    </div>
    <div class="form-group">
      <input
        type="submit"
        :value="$t('account.editor.button.save')"
        class="btn btn-outline-secondary"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "AccountEditor",
  props: {
    account: {
      type: Object,
      required: true
    },
    currencies: {
      type: Array,
      required: true
    }
  }
};
</script>
