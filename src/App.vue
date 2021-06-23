<template> 
  <div id="app">
    <Modal v-if="modalOpen" v-on:close-modal="toggleModal" :APIkey="APIkey" />
    <Navigation v-on:add-city="toggleModal"/>
    <router-view v-bind:cities="cities"/>
  </div>
</template>

<script>
import axios from "axios"
import db from "./firebase/firebaseInit"
import Navigation from './components/Navigation.vue'
import Modal from './components/Modal.vue'
export default {
  components: { Navigation, Modal },
  name: "App",
  data() {
    return {
      APIkey: "2607165be078009df4ed9e8d2493a4e1",
      cities: [],
      modalOpen: null
    }
  },
  created () {
    this.getCityWeather()
  },
  methods: {
    getCityWeather() {
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot(snap => {
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&&units=metric&APPID=${this.APIkey}`)
              const data = response.data
              firebaseDB.doc(doc.doc.id).update({
                currentWeather: data
              }).then(() => {
                this.cities.push(doc.doc.data())
              })
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
}
</style>
