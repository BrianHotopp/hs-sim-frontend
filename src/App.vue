<template>
  <div id="app">
    <board></board>
    <hand></hand>
    <search></search>
  </div>
</template>

<script>
import board from './components/board.vue';
import hand from './components/hand.vue'
import search from './components/search.vue';

export default {
  name: 'App',
  components: {
    board,
    hand,
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
