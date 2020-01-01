<template>
  <div>
    <span v-if="transactions.length == 0"></span>
    <span v-if="transactions.length == 1" class="text-nowrap">{{
      transactions[0].categoryTitle
    }}</span>
    <ul class="list-unstyled" v-if="transactions.length > 1">
      <li
        class="text-nowrap d-flex justify-content-between align-items-center"
        v-for="item in transactions"
        :key="item.id"
      >
        {{ item.categoryTitle }}
        <span>{{ item.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TransactionCategoryList",
  props: {
    transactions: {
      type: Array,
      required: true
    }
  }
};
</script>
