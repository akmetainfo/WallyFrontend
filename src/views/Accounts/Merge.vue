<template>
  <div class="container">
    <div v-if="!errored && !loading">
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("account.merge.title") }}</h2>
        </div>
        <div class="col-md-4">
          <form @submit="saveForm">
            <div class="form-group">
              <label for="primaryTitle">{{
                $t("account.merge.property.primary")
              }}</label>
              <input
                v-model="data.primaryTitle"
                id="primaryTitle"
                class="form-control"
                readonly="readonly"
              />
            </div>
            <div class="form-group">
              <label for="MergedTitle">{{
                $t("account.merge.property.merged")
              }}</label>
              <input
                v-model="data.mergedTitle"
                id="MergedTitle"
                class="form-control"
                readonly="readonly"
              />
            </div>
            <div class="form-group">
              <input
                type="submit"
                :value="$t('account.merge.button.save')"
                class="btn btn-outline-secondary"
              />
            </div>
          </form>
          <search-account
            @set-source="onSource"
            @set-destination="onDestination"
          ></search-account>
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
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";
import SearchAccount from "@/components/Search/Account";

export default {
  name: "AccountsMerge",
  metaInfo() {
    return {
      title: this.$i18n.t("account.merge.title")
    };
  },
  mixins: [BaseApiRequestMixin],
  components: {
    SearchAccount
  },
  data() {
    return {
      accounts: null,
      data: {
        primaryId: 0,
        primaryTitle: "",
        mergedId: 0,
        mergedTitle: ""
      }
    };
  },
  methods: {
    saveForm() {
      this.request(
        "/Account/Merge",
        { primaryId: this.data.primaryId, mergedId: this.data.mergedId },
        () => {
          this.$router.push("/");
          location.reload();
        }
      );
    },
    onSource(item) {
      this.data.primaryTitle = item.title;
      this.data.primaryId = item.id;
    },
    onDestination(item) {
      this.data.mergedTitle = item.title;
      this.data.mergedId = item.id;
    }
  },
  mounted() {
    this.request("/Currency/List", {}, response => {
      this.currencies = response.data.currencies;
    });
  }
};
</script>
