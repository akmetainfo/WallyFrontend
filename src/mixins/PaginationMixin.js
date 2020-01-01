const PaginationMixin = {
  data() {
    return {
      pagedQuery: {
        paged: true,
        offset: 0,
        limit: 10
      },
      totalElements: 0
    };
  },
  methods: {
    getPaging: function getPaging() {
      return {
        Paged: this.pagedQuery.paged,
        PagedOffset: this.pagedQuery.offset,
        PagedLimit: this.pagedQuery.limit
      };
    },
    getWithoutPaging: function getWithoutPaging() {
      return {
        Paged: false,
        PagedOffset: null,
        PagedLimit: null
      };
    },
    gotoPage: function gotoPage(offset) {
      this.pagedQuery.offset = offset;
      this.executeRequest();
    },
    pageSize: function pageSize() {
      this.executeRequest();
    },
    switchPaged: function switchPaged() {
      this.pagedQuery.paged = !this.pagedQuery.paged;
      if (this.pagedQuery.paged) {
        this.pagedQuery.offset = 0;
      }
      this.executeRequest();
    }
  }
};

export default PaginationMixin;
