// import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
// the function that handles all minion battlecries for when the user plays one
import battlecries from './battlecries';
import hooks from './hooks';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    board: [],
    hp: 40,
    pogo_count: 0,
    timesdamaged: 0,
  },
  mutations: {
    addCard(state, cardFromApi) {
      const copiedCard = { ...cardFromApi };
      copiedCard.inHand = true;
      console.log(cardFromApi);
      if (state.board.length >= 7) {
        console.log('unable to add card because there was no space on the board');
        return;
      }
      // add card to board
      state.board.splice(copiedCard.goes, 0, copiedCard);
      battlecries(state, copiedCard);
      console.log('performed battlecries');
      hooks(state, copiedCard);
    },
    removeCard(state, card) {
      // find the index of the card to remove
      // remove the card from the hand at that index
      const index = state.board.indexOf(card);
      state.board.splice(index, 1);
    },
  },
});
