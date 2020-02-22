<template>
  <div>
    <form v-on:submit.prevent="onSubmit">
      <input v-model="search_term" placeholder="enter search term">
      {{this.search_term}}
    </form>
  <b-container>
    <b-row v-if="this.results">
        <b-col cols = "2" v-for="result in this.results" :key = result.id>
          <card :aCard = result></card>
        </b-col>
    </b-row>
  </b-container>
  </div>
</template>
<script>
import axios from 'axios';
import card from './card.vue';
import parseminion from '../parseminion'

const blizzardAPI = axios.create({
  baseURL: 'https://us.api.blizzard.com/hearthstone',
  headers: {
    Authorization: 'Bearer USA4qHRbt0Mq15piVPcedTzcK7ByOVOjly',
  },
});
export default {
  name: 'search',
  data() {
    return {
      search_term: '',
      results: [], // this will contain the result of the user's search
    };
  },
  components: {
    card,
  },
  mounted: function () {
    blizzardAPI.get('/cards', {
        params: {
          textFilter: this.search_term,
          locale: 'en_US',
          gameMode: 'battlegrounds',
        },
      })
        .then((apiresponse) => {
          // grab only the things we care about from the json response
          let result = null;
          for (let i = 0; i < apiresponse.data.cards.length; i += 1) {
            result = apiresponse.data.cards[i];
            if(result.attack === undefined){ // this skips heroes that the game returns
              continue;
            }
            this.results.push(parseminion(result));
          }
        });
  },
  methods: {
    onSubmit() {
      // blizzardAPI.get('https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero%2C3&textFilter=mech&access_token=USaHVhmVPLx4OBZCRJ4d333EiIRyXKC46e')
      //   .then((response) => { console.log(response); });
      this.results = []; // clear the array of previous searches
      blizzardAPI.get('/cards', {
        params: {
          textFilter: this.search_term,
          locale: 'en_US',
          gameMode: 'battlegrounds',
        },
      })
        .then((apiresponse) => {
          // grab only the things we care about from the json response
          let result = null;
          for (let i = 0; i < apiresponse.data.cards.length; i += 1) {
            result = apiresponse.data.cards[i];
            if(result.attack === undefined){ // this skips heroes that the game returns
              continue;
            }
            this.results.push(parseminion(result));
          }
        });
      this.search_term = '';
      console.log('api query finished');
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
