<template>
  <footer>
    <hr />
    <div class="container pt-4">
      <div class="row">
        <div class="col-12">
          <p>&copy; 2018 — {{ this.ProjectName }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { PROJECT_TITLE } from "@/config/config";

export default {
  name: "PageFooter",
  data() {
    return {
      ProjectName: PROJECT_TITLE
    };
  }
};
</script>
