<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input
              v-model="car.model"
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Mercedes"
            />
            <label for="floatingInput">Car model</label>
          </div>
          <div class="form-floating mb-3">
            <input
              v-model="car.year"
              type="number"
              class="form-control"
              id="floatingPassword"
              placeholder="Year"
            />
            <label for="floatingPassword">Year</label>
          </div>
          <select
            v-model="car.transmission"
            class="form-select form-select-lg mb-3"
            aria-label="Default select example"
          >
            <option value="">Select car transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <div class="mb-3">
            <label for="formFile" class="form-label">Car image</label>
            <input class="form-control" type="file" id="formFile" />
            <!-- <div v-show="imgUploading">Image is loading. Please wait ...</div> -->
          </div>
        </div>
        <!-- Modal body end -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" @click="updateCar" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <ul class="list-group container">
    <h1>Car list admin</h1>
    <li class="list-group-item" v-for="car in carList" :key="car.model">
      <h3>{{ car.model }}</h3>
      <p>{{ car.year }}</p>
      <p>{{ car.transmission }}</p>
      <p
        @click="edit(car)"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit
      </p>
      <p @click="removeCar(car)">Delete</p>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      car: {
        model: "",
        year: null,
        transmission: "",
        // img: null,
        // imageUrl: "",
      },
      imgNotUploaded: true,
      imgUploading: false,
    };
  },
  computed: {
    ...mapState(["carList"]),
  },
  methods: {
    ...mapActions(["removeCar"]),
    edit(val) {
      this.car = val;
    },
    updateCar() {
      this.$store.dispatch("updateCar", this.car);
    },
  },
  created() {
    this.$store.dispatch("getCars");
  },
};
</script>

<style>
</style>