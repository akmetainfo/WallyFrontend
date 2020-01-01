<template>
  <nav class="d-flex flex-wrap py-5" aria-label="Page navigation">
    <div class="pr-2 pb-5 pb-sm-2">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label
          :class="[{ active: pagedQuery.paged }, 'btn btn-outline-primary']"
          @click.prevent="$emit('switch-paged')"
          >{{ $t("systempage.nav.pagination.paged") }}</label
        >
        <label
          :class="[{ active: !pagedQuery.paged }, 'btn btn-outline-primary']"
          @click.prevent="$emit('switch-paged')"
          >{{ $t("systempage.nav.pagination.all") }}</label
        >
      </div>
    </div>
    <div class="pr-2 pb-5 pb-sm-2" v-if="pagedQuery.paged">
      <select
        v-model="pagedQuery.limit"
        @change.prevent="$emit('page-size')"
        class="form-control"
      >
        <option v-for="item in [10, 25, 50]" :key="item" :value="item">{{
          item
        }}</option>
      </select>
    </div>
    <div class="pr-2 pb-5 pb-sm-2" v-if="pagedQuery.paged">
      <ul class="pagination" style="margin: 0;">
        <li :class="{ disabled: isFirst, 'page-item': true }">
          <a
            class="page-link px-3 px-sm-4"
            @click.prevent="$emit('goto-page', firstUrl)"
            >&#171;</a
          >
        </li>
        <li :class="{ disabled: isFirst, 'page-item': true }">
          <a
            class="page-link px-3 px-sm-4"
            @click.prevent="$emit('goto-page', prevUrl)"
            >&#60;</a
          >
        </li>
        <li class="page-item disabled">
          <a class="page-link">
            {{ showedFrom }} — {{ showedTo }}
            {{ $t("systempage.nav.pagination.of") }} {{ totalElements }}
          </a>
        </li>
        <li :class="{ disabled: isLast, 'page-item': true }">
          <a
            class="page-link px-3 px-sm-4"
            @click.prevent="$emit('goto-page', nextUrl)"
            >&#62;</a
          >
        </li>
        <li :class="{ disabled: isLast, 'page-item': true }">
          <a
            class="page-link px-3 px-sm-4"
            @click.prevent="$emit('goto-page', lastUrl)"
            >&#187;</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavPagination",
  props: {
    pagedQuery: {
      type: Object,
      required: true
    },
    totalElements: {
      type: Number,
      required: true
    }
  },
  computed: {
    showedFrom: x => x.pagedQuery.offset + 1,
    showedTo: x =>
      x.isLast ? x.totalElements : x.pagedQuery.offset + x.pagedQuery.limit,
    isFirst: x => x.pagedQuery.offset < x.pagedQuery.limit,
    isLast: x => x.pagedQuery.offset >= x.totalElements - x.pagedQuery.limit,
    firstUrl: () => 0,
    lastUrl: x => x.totalElements, // TODO FIX
    prevUrl: x => x.pagedQuery.offset - x.pagedQuery.limit,
    nextUrl: x => x.pagedQuery.offset + x.pagedQuery.limit
  }
};
</script>
