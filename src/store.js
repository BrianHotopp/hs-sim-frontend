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
    hand: [],
    hp: 40,
    pogo_count: 0,
    timesdamaged: 0,
  },
  mutations: {
    moveToHand(state, cardtoadd) {
      const copiedCard = { ...cardtoadd };
      copiedCard.location = 1;

      // add card to board
      state.hand.push(copiedCard);
    },
    playToBoard(state, cardtoadd, indextoaddat = 0, bufftargets = []) {
      const copiedCard = { ...cardtoadd };
      copiedCard.location = 2;

      if (state.board.length >= 7) {
        console.log('unable to add card because there was no space on the board');
        return;
      }
      // add card to board
      state.board.splice(indextoaddat, 0, copiedCard);
      battlecries(state, copiedCard, indextoaddat, bufftargets);
      console.log('performed battlecries');
      hooks(state, copiedCard);
      console.log('performed hooks');
    },
    removeCard(state, card) {
      // find the index of the card to remove
      // remove the card from the hand at that index
      if (card.location === 1) { // the card is in hand
        const index = state.hand.indexOf(card);
        state.hand.splice(index, 1);
      }
      if (card.location === 2) { // the card is on the board
        const index = state.board.indexOf(card);
        state.board.splice(index, 1);
      }
    },
  },
});
