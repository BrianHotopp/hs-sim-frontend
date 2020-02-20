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
      const copiedCard = { ...cardFromApi };
      copiedCard.inHand = true;
      console.log(cardFromApi);
      if (state.board.length >= 7) {
        // complain about trying to add too many cards to board
        return;
      }
      console.log('attempting to add card');
      let timesDamagedThisTurn = 0;
      switch (copiedCard.name) {
        case 'Alleycat':
          // call to api to get tabbycat, then recall add card with tabbycat
          Axios.get('https://us.api.blizzard.com/hearthstone/cards/40425')
            .then((result) => {
              this.addCard( // prune the object from the api before calling addcard
                {
                  img: result.battlegrounds.image,
                  minion_type: result.minionTypeId,
                  children: result.childIds,
                  attack: result.attack,
                  health: result.health,
                  name: result.name,
                  cardid: result.id,
                  text: result.flavorText,
                  keywords: result.keyWordIds,
                  inHand: false, // this gets set to true in addcard
                },
              );
            });
          break;
        case 'Pogo-Hopper':
          copiedCard.health += (2 * state.pogo_count);
          state.pogo_count += 1;
          break;
        case 'Murloc Tidehunter':
          // code block
          Axios.get('https://us.api.blizzard.com/hearthstone/cards/1078')
            .then((result) => {
              this.addCard( // prune the object from the api before calling addcard
                {
                  img: result.battlegrounds.image,
                  minion_type: result.minionTypeId,
                  children: result.childIds,
                  attack: result.attack,
                  health: result.health,
                  name: result.name,
                  cardid: result.id,
                  text: result.flavorText,
                  keywords: result.keyWordIds,
                  inHand: false, // this gets set to true in addcard
                },
              );
            });
          break;
        case 'Rockpool Hunter':
          // todo how to select which card this will buff
          break;
        case 'Vulgar Homunculus':
          timesDamagedThisTurn += 1;
          break;
        case 'Coldlight Seer':
          // give plus 2 health to all minions
          for (let i = 0; i < state.board.size; i += 1) {
            if (state.board[i].minion_type === 14) {
              state.board[i].health += 2;
            }
          }
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
      state.board.push(copiedCard); // push the copied (and potentially modified)
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
