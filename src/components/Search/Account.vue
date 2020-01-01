<template>
  <div class="row">
    <div class="col-12">
      <form>
        <div class="form-group">
          <label for="NeedleClAcc">{{ $t("search.filter.title") }}:</label>
          <input
            id="NeedleClAcc"
            v-model="needle"
            class="form-control"
            @keyup="searchNeedleClAcc"
          />
        </div>
      </form>
    </div>
    <div class="clearfix"></div>
    <div class="col-12">
      <div id="resultsClAcc">
        <div v-if="!errored && !loading">
          <div v-for="item in items" :key="item.id">
            <router-link
              class="btn btn-outline-secondary"
              :to="{
                name: 'AccountIndex',
                params: { AccountId: Number(item.id) }
              }"
              ><span>{{ item.currencyCode }}</span>
              {{ item.title }}</router-link
            >
            <button
              @click="$emit('set-source', item)"
              class="btn btn-outline-secondary"
            >
              {{ $t("search.action.source") }}
            </button>
            <button
              @click="$emit('set-destination', item)"
              class="btn btn-outline-secondary"
            >
              {{ $t("search.action.destination") }}
            </button>
            <pre>{{ item.notes }}</pre>
          </div>
        </div>
        <div v-if="!errored && loading" class="alert alert-info">
          {{ $t("api.request.state.loading") }}…
        </div>
        <div v-if="errored" class="alert alert-danger">
          {{ $t("api.request.state.error") }}: {{ this.error_text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseApiRequestMixin from "@/mixins/BaseApiRequestMixin";

export default {
  name: "SearchAccount",
  mixins: [BaseApiRequestMixin],
  data() {
    return {
      items: null,
      needle: ""
    };
  },
  methods: {
    searchNeedleClAcc() {
      const query = {
        isCorrespondent: null,
        showInactive: false,
        needle: this.needle,
        paged: false,
        pagedOffset: null,
        pagedLimit: null
      };
      this.request("/Account/List", query, result => {
        this.items = result.data.accounts;
      });
    }
  }
};
</script>

<style scoped>
div#resultsClAcc div {
  margin-top: 10px;
}

div#resultsClAcc .btn {
  margin-right: 10px;
}

div#resultsClAcc pre {
  padding: 9.5px;
  margin: 0 0 10px;
  margin-top: 10px;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.42857143;
}

div#resultsClAcc span {
  color: #c0c0c0;
}
</style>
