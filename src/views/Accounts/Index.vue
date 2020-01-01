<template>
  <div class="container account_index">
    <account-meta :account-id="this.AccountId"></account-meta>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-info">
          <form class="form-inline">
            <div class="form-group">
              <label for="HideChecked" class="mx-2">{{
                $t("account.index.filter.hideChecked")
              }}</label>
              <input
                type="checkbox"
                id="HideChecked"
                v-model="filter.HideChecked"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="HideInternalTransfers" class="mx-2">{{
                $t("account.index.filter.hideInternalTransfers")
              }}</label>
              <input
                type="checkbox"
                id="HideInternalTransfers"
                v-model="filter.HideInternalTransfers"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="AmountFrom" class="mx-2">{{
                $t("account.index.filter.amountFrom")
              }}</label>
              <input
                type="text"
                id="AmountFrom"
                v-model="filter.AmountFrom"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="AmountTo" class="mx-2">{{
                $t("account.index.filter.amountTo")
              }}</label>
              <input
                type="text"
                id="AmountTo"
                v-model="filter.AmountTo"
                class="form-control"
              />
            </div>
            <button
              type="button"
              class="btn btn-secondary mx-2"
              v-on:click="filterData"
            >
              {{ $t("account.index.filter.button.submit") }}
            </button>
          </form>
        </div>
      </div>
    </div>
    <transactions-for-account :filter="filter"></transactions-for-account>
  </div>
</template>

<script>
import AccountMeta from "@/views/Accounts/Meta";
import TransactionsForAccount from "@/views/Transactions/ForAccount";

export default {
  name: "AccountIndex",
  components: {
    AccountMeta,
    TransactionsForAccount
  },
  props: {
    AccountId: {
      type: Number,
      required: true
    },
    HideChecked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      filter: {
        AccountId: this.AccountId,
        HideChecked: this.HideChecked,
        HideInternalTransfers: this.HideInternalTransfers,
        AmountFrom: null,
        AmountTo: null
      }
    };
  },
  methods: {
    filterData() {
      this.$router.push({
        name: "AccountIndex",
        params: {
          AccountId: this.filter.AccountId,
          HideChecked: this.filter.HideChecked
        }
      });
    }
  }
};
</script>

<style scoped></style>
