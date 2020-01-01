<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ $t("systempage.login.title") }}</h1>
      </div>
    </div>
    <div class="row" v-if="!errored && !loading">
      <div class="col-12 col-sm-12 col-md-6">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="username"
              >{{ $t("systempage.login.property.username") }}:</label
            >
            <input
              v-model="username"
              required
              type="text"
              class="form-control"
              id="username"
              :placeholder="
                $t('systempage.login.property.username.placeholder')
              "
            />
          </div>
          <div class="form-group">
            <label for="password"
              >{{ $t("systempage.login.property.password") }}:</label
            >
            <input
              v-model="password"
              required
              type="password"
              class="form-control"
              id="password"
              :placeholder="
                $t('systempage.login.property.password.placeholder')
              "
            />
          </div>
          <button type="submit" class="btn btn-primary">
            {{ $t("systempage.login.button.submit") }}
          </button>
        </form>
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
import ApiService from "@/services/api";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      errored: false,
      error_text: ""
    };
  },
  methods: {
    login: function login() {
      const { username, password } = this;
      this.loading = true;
      this.errored = false;
      this.$store
        .dispatch("AUTH_REQUEST", { username, password })
        .then(() => {
          this.$router.push("/");
          location.reload();
        })
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
</script>
