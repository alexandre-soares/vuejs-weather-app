<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data() {
    return {
      APIkey: "a700f9451c06ddb9940a4f1fefa2b15c",
      city: 'Detroit'
    }
  },
  created () {
    this.getCurrentWeather();
  },
  methods: {
    getCurrentWeather() {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.APIkey}`).then((res) => {
        console.log(res.data);
      })
    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
