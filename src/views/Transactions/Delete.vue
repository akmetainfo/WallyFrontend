<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("transaction.delete.title") }}</h2>
        </div>
        <div class="col-md-4">
          <form @submit="saveForm">
            <div class="form-group">
              <input
                type="submit"
                :value="$t('transaction.delete.button')"
                class="btn btn-outline-secondary"
              />
            </div>
          </form>
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
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";

export default {
  name: "TransactionDelete",
  metaInfo() {
    return {
      title: this.$i18n.t("transaction.delete.title")
    };
  },
  mixins: [BaseApiRequestMixin],
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      info: {
        id: this.id
      }
    };
  },
  methods: {
    saveForm() {
      this.request("/Transaction/Delete", { TransactionId: this.id }, () => {
        this.$router.push("/");
        location.reload();
      });
    }
  }
};
</script>
