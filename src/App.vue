<template>
  <div id="app">
    <searchbar></searchbar>
  </div>
</template>

<script>
import searchbar from './components/searchbar.vue';

export default {
  name: 'App',
  components: {
    searchbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
