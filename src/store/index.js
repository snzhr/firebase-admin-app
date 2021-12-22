import { createStore } from 'vuex'
import { db } from "../fbconfig";

export default createStore({
  state: {
    carList: [],
   isAuthenticated: false,
   carAddedLoader: false
  },
  mutations: {
    SET_CARS(state, payload){
       state.carList = payload
    },
    REMOVE_CAR(state,payload){
      state.carList.splice(state.carList.indexOf(payload), 1)
    },
    CHANGE_LOADER_STATUS(state){
      state.carAddedLoader = false
    }
  },
  actions: {
    createCar({commit},{model,steeringWheel, year, fuel,drivetype, transmission, price,img,imageUrl}){
      db.collection("cars").add({
        model,
        steeringWheel,
        year, 
        fuel,
        drivetype,
        transmission,
        price,
        img,
        imageUrl  
    })
    .then((docRef) => {
        commit("CHANGE_LOADER_STATUS")
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    // console.log(model, year, fuel,drivetype, transmission, price,img,imageUrl);
    },

    getCars({commit}){
    db.collection("cars")
      .get()
      .then((querySnapshot) => {
        let cars = []
        querySnapshot.forEach((doc) => {
          cars.push({
            id: doc.id,
            ...doc.data()
          })
        });
        commit('SET_CARS', cars)
      });
    },

    removeCar({commit}, payload){
      db.collection("cars").doc(payload.id).delete().then(() => {
        console.log("Document successfully deleted!");
        commit("REMOVE_CAR", payload)
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    },

    async updateCar({commit},car){
      return  await db.collection("cars").doc(car.id).update(car)
      .then(() => {
        commit("CHANGE_LOADER_STATUS")
        console.log("Document successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
  },
  modules: {
  }
})
