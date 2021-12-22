<template>
  <div class="home container mt-3">
    <div v-if="isAuthenticated">
      <car-add-form />
    </div>
    <div v-else>You have to login in order to continue</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CarAddForm from "@/components/CarAddForm.vue";
export default {
  name: "AddCar",
  components: {
    CarAddForm,
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
};
</script>
