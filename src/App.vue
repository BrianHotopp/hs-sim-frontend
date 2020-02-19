<template>
  <div id="app">
    <board></board>
    <search></search>
  </div>
</template>

<script>
import board from './components/board.vue';
import search from './components/search.vue';

export default {
  name: 'App',
  components: {
    board,
    search,
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
