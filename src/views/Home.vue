<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-6">
        <h2>{{ $t("home.myActiveAccounts.title") }}</h2>
        <my-active-accounts-with-rests></my-active-accounts-with-rests>
      </div>
      <div class="col-12 col-sm-12 col-md-6">
        <h2>{{ $t("home.nonCategorizedTransactions.title") }}</h2>
        <non-categorized-transactions></non-categorized-transactions>
        <h2>{{ $t("home.crookedCategorizedTransactions.title") }}</h2>
        <crooked-categorized-transactions></crooked-categorized-transactions>
      </div>
    </div>
  </div>
</template>

<script>
import MyActiveAccountsWithRests from "@/components/Reports/MyActiveAccountsWithRests";
import NonCategorizedTransactions from "@/components/Reports/NonCategorizedTransactions";
import CrookedCategorizedTransactions from "@/components/Reports/CrookedCategorizedTransactions";

export default {
  name: "Home",
  metaInfo() {
    return {
      title: this.$i18n.t("menu.home")
    };
  },
  components: {
    MyActiveAccountsWithRests,
    NonCategorizedTransactions,
    CrookedCategorizedTransactions
  },
  data() {
    return {};
  }
};
</script>
