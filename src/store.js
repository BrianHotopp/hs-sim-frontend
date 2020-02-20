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
        console.log('unable to add card because there was no space on the board');
        // complain about trying to add too many cards to board
        return;
      }
      console.log('attempting to add card');
      // push the copied card to our board
      state.board.splice(copiedCard.goes, 0, copiedCard);
      // let timesDamagedThisTurn = 0;
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
                  inHand: false,
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
                  goes: copiedCard.goes + 1, // the minion spawned by the battlecry should
                  // go to the right of the minion
                },
              );
            });
          break;
        case 'Rockpool Hunter':
          // buff the element which is specified by the 0th
          // element in the card's buffs array
          if (copiedCard.buffs[0] !== -1) {
            state.board[copiedCard.buffs[0]].health += 1;
            state.board[copiedCard.buffs[0]].attack += 1;
          }
          break;
        case 'Vulgar Homunculus':
          // timesDamagedThisTurn += 1;
          break;
        case 'Coldlight Seer':
          // give plus 2 health to all murlocs
          for (let i = 0; i < state.board.size; i += 1) {
            if (state.board[i].minion_type === 14) {
              state.board[i].health += 2;
            }
            // todo buff minions with minion_type = allminions
          }
          break;
        case 'Metaltooth Leaper':
          // give plus 2 attack to all mechs
          for (let i = 0; i < state.board.size; i += 1) {
            if (state.board[i].minion_type === 17) {
              state.board[i].attack += 2;
            }
            // todo buff minions with minion_type = allminions
          }
          break;
        case 'Nathrezim Overseer':
          if (copiedCard.buffs[0] !== -1) {
            state.board[copiedCard.buffs[0]].health += 2;
            state.board[copiedCard.buffs[0]].attack += 2;
          }
          break;
        case 'Zoobot':
          // todo allow the user to select which minions to buff
          // this is the index of the beast to be buffed
          if (copiedCard.buffs[0] !== -1) {
            // if copiedCard.buffs[0] == -1, it means there is no beast to be buffed
            state.board[copiedCard.buffs[0]].health += 1;
            state.board[copiedCard.buffs[0]].attack += 1;
          }
          // this is the index of the dragon to be buffed
          if (copiedCard.buffs[1] !== -1) {
            // if copiedCard.buffs[1] == -1, it means there is no dragon to be buffed
            state.board[copiedCard.buffs[1]].health += 1;
            state.board[copiedCard.buffs[1]].attack += 1;
          }
          // this is the index of the murloc to be buffed
          if (copiedCard.buffs[2] !== -1) {
            // if copiedCard.buffs[2] == -1, it means there is no murloc to be buffed
            state.board[copiedCard.buffs[2]].health += 1;
            state.board[copiedCard.buffs[2]].attack += 1;
          }
          break;
        case 'Crystalweaver':
          for (let i = 0; i < state.board.size; i += 1) {
            if (state.board[i].minion_type === 15) { // demons
              state.board[i].attack += 1;
              state.board[i].health += 1;
            }
          }
          break;
        case 'Defender of Argus':
          // figure out how to control where the minion goes
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
    },
  },
});
// export default {
//   state: {
//     pogo_count: 0,
//     card_list: [],
//   },

// };
