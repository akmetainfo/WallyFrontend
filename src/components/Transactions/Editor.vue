<template>
  <form @submit="$emit('save-form')">
    <div class="form-group">
      <label for="created">{{
        $t("transaction.editor.property.created")
      }}</label>
      <input v-model="transaction.created" id="created" class="form-control" />
    </div>
    <div class="form-group">
      <label for="amountSource">{{
        $t("transaction.editor.property.amountSource")
      }}</label>
      <input
        v-model="transaction.amountSource"
        id="amountSource"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="amountDestination">{{
        $t("transaction.editor.property.amountDestination")
      }}</label>
      <input
        v-model="transaction.amountDestination"
        id="amountDestination"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="Checked">{{
        $t("transaction.editor.property.checked")
      }}</label>
      <input
        type="checkbox"
        id="Checked"
        v-model="transaction.checked"
        class="form-control"
      />
    </div>
    <div class="form-group">
      <label for="comment">{{
        $t("transaction.editor.property.comment")
      }}</label>
      <input v-model="transaction.comment" id="comment" class="form-control" />
    </div>
    <div class="form-group">
      <label for="SourceTitle">{{
        $t("transaction.editor.property.source")
      }}</label>
      <input
        v-model="transaction.sourceTitle"
        id="SourceTitle"
        class="form-control"
        readonly="readonly"
      />
    </div>
    <div class="form-group">
      <label for="DestinationTitle">{{
        $t("transaction.editor.property.destination")
      }}</label>
      <input
        v-model="transaction.destinationTitle"
        id="DestinationTitle"
        class="form-control"
        readonly="readonly"
      />
    </div>
    <div class="form-group">
      <input
        type="submit"
        :value="$t('transaction.editor.button.save')"
        class="btn btn-outline-secondary"
      />
    </div>
  </form>
</template>

<script>
export default {
  name: "TransactionEditor",
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
};
</script>
