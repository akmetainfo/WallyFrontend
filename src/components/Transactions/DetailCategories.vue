<template>
  <div>
    <div v-if="info.categories.length > 0">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <td>{{ $t("transaction.detail.categories.headers.category") }}</td>
            <td>{{ $t("transaction.detail.categories.headers.amount") }}</td>
            <td>{{ $t("transaction.detail.categories.headers.comment") }}</td>
            <td>{{ $t("transaction.detail.categories.headers.actions") }}</td>
          </tr>
          <tr v-for="category in info.categories" :key="category.id">
            <td>{{ category.categoryTitle }}</td>
            <td>{{ category.amount }}</td>
            <td>{{ category.comment }}</td>
            <td>
              <router-link
                :to="{
                  name: 'TransactionCategoryEdit',
                  params: { id: category.id }
                }"
                >{{
                  $t("transaction.detail.categories.action.edit")
                }}</router-link
              >
              <router-link
                :to="{
                  name: 'TransactionCategoryDelete',
                  params: { id: category.id }
                }"
                >{{
                  $t("transaction.detail.categories.action.delete")
                }}</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasCategorised(info)">
      <div class="alert alert-success">
        {{ $t("transaction.detail.categories.balloon.success") }}
      </div>
    </div>
    <div v-else>
      <div class="alert alert-danger">
        {{ $t("transaction.detail.categories.balloon.error") }}
      </div>
    </div>
    <router-link
      :to="{
        name: 'TransactionCategoryCreate',
        params: { id: info.transaction.id }
      }"
      class="btn btn-outline-secondary"
      >{{ $t("transaction.detail.categories.action.add") }}</router-link
    >
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "TransactionDetailCategories",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasCategorised(info) {
      const categoriesAmount = _.sumBy(info.categories, "amount");
      const transactionAmount = info.source.isCorrespondent
        ? info.transaction.amountDestination
        : info.transaction.amountSource;
      return Math.abs(transactionAmount - categoriesAmount) < 0.01;
    }
  }
};
</script>
