// import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import battlecries from './battlecries';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    board: [],
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
        // complain about trying to add too many cards to board
        return;
      }
      console.log(state);
      // add card
      state.board.splice(copiedCard.goes, 0, copiedCard);
      battlecries(state, copiedCard);
      console.log('performed battlecries');

      for (let i = 0; i < state.board.length; i += 1) {
        // it feels bad to go through all possible minions
        // for every minion on the board but it is constant time
        switch (state.board[i].name) {
          case 'Murloc Tidecaller':
            if (copiedCard.minion_type === 14 && !(copiedCard === state.board[i])) {
              // the second part of this conditional prevents tidecaller
              // from buffing itself when played
              // if a murloc was just played
              state.board[i].attack += 1;
            }
            break;
          case 'Cobalt Guardian':
            if (copiedCard.minion_type === 17 && !(copiedCard === state.board[i])) {
              // if a murloc was just played
              if (!state.board[i].keywords.includes(3)) {
                // give the cobalt divine shield if it doesn't already have it
                state.board[i].keywords.push(3);
              }
            }
            break;
          case 'Crowd Favorite':
            if (copiedCard.keywords.includes(8)) {
              // if the played minion had a battlecry
              state.board[i].health += 2;
              state.board[i].attack += 2;
            }
            break;
          case 'Pack Leader':
            if (copiedCard.minion_type === 20 && !(copiedCard === state.board[i])) {
              // if a beast was just played
              copiedCard.attack += 3;
            }
            break;
          case 'Mama Bear':
            if ((copiedCard.minion_type === 20) && !(copiedCard === state.board[i])) {
              // if a beast just got played
              copiedCard.attack += 4;
              copiedCard.health += 4;
            }
            break;
          case 'Wrath Weaver':
            if ((copiedCard.minion_type === 15)) {
              // if a demon was just played
              state.timesdamaged += 1;
            }
            break;
          case 'Floating Watcher':
            state.board[i].attack += 2 * (state.timesdamaged);
            state.board[i].health += 2 * (state.timesdamaged);
            break;
          default:
        }
        // now that we have properly buffed floating watchers off the last minion we played
        // we can set timesdamaged = 0
        // so that next time we take damage off a minion we don't get excess buffs
        state.timesdamaged = 0;
      }
    },
    removeCard(state, card) {
      // find the index of the card to remove
      // remove the card from the hand at that index
      const index = state.board.indexOf(card);
      state.board.splice(index, 1);
    },
  },
});
