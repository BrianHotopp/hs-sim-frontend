<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
      <input v-model="search_term" placeholder="enter search term">
      {{this.search_term}}
    </form>
  <b-container>
    <b-row v-if="this.results">
        <b-col cols = "3" v-for="result in this.results" :key = result.id>
          <card :aCard = result></card>
        </b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
import axios from 'axios';
import card from './card.vue';

const blizzardAPI = axios.create({
  baseURL: 'https://us.api.blizzard.com/hearthstone',
  headers: {
    Authorization: 'Bearer US1A7OiSNY4czbdajzXHUx4mvdoKzk7tW1',
  },
});
export default {
  name: 'search',
  data() {
    return {
      search_term: '',
      results: null, // this will contain the result of the user's search
    };
  },
  components: {
    card,
  },
  methods: {
    onSubmit() {
      // blizzardAPI.get('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero%2C3&textFilter=mech&access_token=USaHVhmVPLx4OBZCRJ4d333EiIRyXKC46e')
      //   .then((response) => { console.log(response); });
      blizzardAPI.get('/cards', {
        params: {
          textFilter: this.search_term,
          locale: 'en_US',
          gameMode: 'battlegrounds',
        },
      })
        .then((response) => {
          this.results = response.data.cards;
        });
      this.search_term = 'done';
    },
  },
};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
