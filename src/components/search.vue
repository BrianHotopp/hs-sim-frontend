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
      results: [], // this will contain the result of the user's search
    };
  },
  components: {
    card,
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
            console.log(result);
            this.results.push(
              {
                img: result.battlegrounds.image,
                minion_type: result.minionTypeId, // an int representing murloc, beast etc
                children: result.childIds, // minions associated with the current minion
                // eg alleycat has tabbycat's id in its children array
                attack: result.attack,
                health: result.health,
                name: result.name,
                cardid: result.id, // id unique to the minion
                text: result.flavorText,
                keywords: result.keywordIds, // numbers representing taunt, dshield, etc
                inHand: false, // determines whether or not to show play me button on card component
                goes: null, // an indicator of where on the board this minion should go if we add
                // it to the board using addCard in store.js
                buffs: null, // an array of integers
                // these integers are indices in this.$store.board
                // indicating where the minion's buffs should go
                // for minions that only buff one minion, buffs will contain one elment which
                // indicates the minion they buff
                // for minions that buff like 3 minions, there will be 3 integers and so on
              },
            );
          }
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
