<template>
  <div class="car__add__form row">
    <div class="col-sm-8 mx-auto">
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
      <button
        :disabled="imgNotUploaded"
        @click="createNewCar"
        class="btn btn-primary"
      >
        Add
      </button>
      <Loader v-if="$store.state.carAddedLoader" />
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
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
      imgNotUploaded: true,
      imgUploading: false,
      offset: 1979,
    };
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
    createNewCar() {
      this.$store.state.carAddedLoader = true;
      this.$store.dispatch("createCar", this.car);
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
};
</script>

<style scoped>
</style>