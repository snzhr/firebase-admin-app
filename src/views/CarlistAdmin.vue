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
          <h5 class="modal-title" id="exampleModalLabel">Edit car</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="mb-3">
            <input
              v-model="car.model"
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Car model"
            />
          </div>

          <select class="form-select mb-3" v-model="car.steeringWheel">
            <option value="">Steering wheel</option>
            <option value="Left">Left</option>
            <option value="Right">Right</option>
          </select>

          <select class="form-select mb-3" v-model="car.year">
            <option value="">Manufactured year</option>
            <option v-for="year in 41" :key="year" :value="year + offset">
              {{ year + offset }}
            </option>
          </select>

          <select class="form-select mb-3" v-model="car.fuel">
            <option value="">Fuel type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
          </select>

          <select class="form-select mb-3" v-model="car.drivetype">
            <option value="">Type of drive</option>
            <option value="All-wheel-drive">All-wheel-drive</option>
            <option value="Front-wheel-drive">Front-wheel-drive</option>
            <option value="Rear-wheel-drive">Rear-wheel-drive</option>
          </select>

          <select class="form-select mb-3" v-model="car.transmission">
            <option value="">Select car transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Continuously variable transmission">
              Continuously variable transmission
            </option>
            <option value="Semi-automatic and dual-clutch transmissions">
              Semi-automatic and dual-clutch transmissions.
            </option>
          </select>
          <div class="mb-3">
            <input
              v-model="car.price"
              type="number"
              class="form-control"
              placeholder="Car price"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Car image</label>
            <input
              @change="fileHandler"
              class="form-control"
              type="file"
              id="formFile"
            />
            <div v-show="imgUploading">Image is loading. Please wait ...</div>
          </div>
        </div>
        <!-- Modal body end -->
        <div class="modal-footer">
          <Loader v-show="$store.state.carAddedLoader" />
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

  <div class="container my-3">
    <h1>Car list admin</h1>
    <div class="d-flex justify-content-between">
      <div
        class="card mb-3 mx-2"
        style="width: 45vw"
        v-for="car in carList"
        :key="car.model"
      >
        <div class="row g-0">
          <div class="col-md-4">
            <img
              :src="car.imageUrl"
              class="img-fluid rounded-start"
              :alt="car.model"
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ car.model }}</h5>
              <button
                class="btn btn-primary me-3"
                @click="edit(car)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Edit
              </button>
              <button class="btn btn-danger" @click="removeCar(car)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState, mapActions } from "vuex";
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      car: {
        model: "",
        steeringWheel: "",
        year: "",
        fuel: "",
        drivetype: "",
        transmission: "",
        price: "",
        img: null,
        imageUrl: "",
      },
      imgUploading: false,
      offset: 1979,
    };
  },
  computed: {
    ...mapState(["carList"]),
  },
  watch: {
    car: {
      handler(newValue) {
        if (newValue.imageUrl) {
          this.imgNotUploaded = false;
          this.imgUploading = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["removeCar"]),
    edit(val) {
      this.car = val;
    },
    updateCar() {
      this.$store.state.carAddedLoader = true;
      this.$store.dispatch("updateCar", this.car);
    },
    async fileHandler(e) {
      try {
        this.imgUploading = true;
        const carImg = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(carImg.name);
        await fileRef.put(carImg);
        const imageUrl = await fileRef.getDownloadURL();
        this.car.img = carImg.name;
        this.car.imageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.$store.dispatch("getCars");
  },
};
</script>

<style>
</style>