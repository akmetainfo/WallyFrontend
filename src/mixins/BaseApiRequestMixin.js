import ApiService from "@/services/api";

const BaseApiRequestMixin = {
  data() {
    return {
      loading: false,
      errored: false,
      error_text: ""
    };
  },
  methods: {
    request: function request(url, data, response) {
      this.loading = true;
      ApiService.post(url, data)
        .then(response)
        .catch(error => {
          this.errored = true;
          this.error_text = ApiService.get_error(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};

export default BaseApiRequestMixin;
