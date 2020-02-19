// import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import Axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    board: [],
    pogo_count: 0,
  },
  mutations: {
    addCard(state, cardFromApi) {
      // we have to copy the passed in card and use that
      // because we don't want the changes we make to the passed in card to persist
      // if the user immediately adds that same card again

      console.log(cardFromApi);
      if (state.board.length >= 7) {
        // complain about trying to add too many cards to board
        return;
      }
      // takes a phat card object we got from the api
      // maybe the user modified some variables
      // converts it to an object containing a subset of that information
      // adds that object to the application state
      // what is a hook check?
      // events triggered by the summoning of another minion
      // eg the attack buff on tidecaller or the buff floating watcher gets on damage
      // why should we handle battlecries before hook checks?
      // battlecries
      // let timesDamagedThisTurn = 0;
      console.log('attempting to add card');
      switch (cardFromApi.name) {
        case 'Alleycat':
          // call to api to get tabbycat, then recall add card with tabbycat
          Axios.get('https://us.api.blizzard.com/hearthstone/cards/40425')
            .then((response) => {
              this.addCard(response);
            });
          break;
        case 'Pogo-Hopper':
          state.pogo_count += 1;
          break;
        case 'Murloc Tidehunter':
          // code block
          break;
        case 'Rockpool Hunter':
          break;
        case 'Vulgar Homunculus':
          // timesDamagedThisTurn += 1;
          // console.log(this.timesDamagedThisTurn);
          break;
        case 'Coldlight Seer':
          break;
        case 'Metaltooth Leaper':
          break;
        case 'Nathrezim Overseer':
          break;
        case 'Zoobot':
          break;
        case 'Crystalweaver':
          break;
        case 'Defender of Argus':
          break;
        case 'Gentle Megasaur':
          break;
        case 'Houndmaster':
          break;
        case 'Screwjank Clunker':
          break;
        case 'Strongshell Scavenger':
          break;
        case 'Menagerie Magician':
          break;
        case 'Virmen Sensei':
          break;
        case 'King Bagurgle':
          break;
        case 'Annihilan Battlemaster':
          break;
        default:
                  // code block
      }

      state.board.push(cardFromApi); // push the copied (and potentially modified)
      // card to our board
    },
  },
});
// export default {
//   state: {
//     pogo_count: 0,
//     card_list: [],
//   },

// };
