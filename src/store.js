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
      // put the copiedcard in our board
      state.board.splice(copiedCard.goes, 0, copiedCard);
      let timesDamagedThisTurn = 0;
      switch (copiedCard.name) {
        case 'Rockpool Hunter':
          // buff the element which is specified by the 0th
          // element in the card's buffs array
          if (copiedCard.buffs[0] !== -1) {
            state.board[copiedCard.buffs[0]].health += 1;
            state.board[copiedCard.buffs[0]].attack += 1;
          }
          break;
        case 'Vulgar Homunculus':
          timesDamagedThisTurn += 1;
          break;
        case 'Coldlight Seer':
          // give plus 2 health to all murlocs
          for (let i = 0; i < state.board.length; i += 1) {
            if (state.board[i].minion_type === 14) {
              state.board[i].health += 2;
            }
            // todo buff minions with minion_type = allminions
          }
          break;
        case 'Metaltooth Leaper':
          console.log('boob');
          // give plus 2 attack to all mechs
          for (let i = 0; i < state.board.length; i += 1) {
            console.log(state.board[i].minion_type);
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
          for (let i = 0; i < state.board.length; i += 1) {
            if (state.board[i].minion_type === 15) { // demons
              state.board[i].attack += 1;
              state.board[i].health += 1;
            }
          }
          break;
        case 'Defender of Argus':
          // figure out how to control where the minion goes
          // there are bugs here when there aren't minions on both sides getting buffed
          state.board[copiedCard.goes + 1].health += 1;
          state.board[copiedCard.goes + 1].attack += 1;
          state.board[copiedCard.goes - 1].health += 1;
          state.board[copiedCard.goes - 1].attack += 1;
          state.board[copiedCard.goes + 1].keywords.push(1);
          state.board[copiedCard.goes - 1].keywords.push(1);
          break;
        case 'Gentle Megasaur':
          // todo this one confuses me
          break;
        case 'Houndmaster':
          // buff stats
          state.board[copiedCard.buffs[0]].health += 2;
          state.board[copiedCard.buffs[0]].attack += 2;
          // give taunt
          state.board[copiedCard.buffs[0]].keywords.push(1);
          break;
        case 'Screwjank Clunker':
          state.board[copiedCard.buffs[0]].health += 2;
          state.board[copiedCard.buffs[0]].attack += 2;
          break;
        case 'Strongshell Scavenger':
          for (let i = 0; i < state.board.length; i += 1) {
            // if there is a taunt minion
            state.board[i].keywords.includes(1);
            state.board[i].health += 2;
            state.board[i].attack += 2;
          }
          break;
        case 'Menagerie Magician':
          if (copiedCard.buffs[0] !== -1) {
            // if copiedCard.buffs[0] == -1, it means there is no beast to be buffed
            state.board[copiedCard.buffs[0]].health += 2;
            state.board[copiedCard.buffs[0]].attack += 2;
          }
          // this is the index of the dragon to be buffed
          if (copiedCard.buffs[1] !== -1) {
            // if copiedCard.buffs[1] == -1, it means there is no dragon to be buffed
            state.board[copiedCard.buffs[1]].health += 2;
            state.board[copiedCard.buffs[1]].attack += 2;
          }
          // this is the index of the murloc to be buffed
          if (copiedCard.buffs[2] !== -1) {
            // if copiedCard.buffs[2] == -1, it means there is no murloc to be buffed
            state.board[copiedCard.buffs[2]].health += 2;
            state.board[copiedCard.buffs[2]].attack += 2;
          }
          break;
        case 'Virmen Sensei':
          if (copiedCard.buffs[0] !== -1) {
            // if copiedCard.buffs[2] == -1, it means there is no beast to be buffed
            state.board[copiedCard.buffs[0]].health += 2;
            state.board[copiedCard.buffs[0]].attack += 2;
          }
          break;
        case 'King Bagurgle':
          // give plus 2 health to all murlocs
          for (let i = 0; i < state.board.length; i += 1) {
            if (state.board[i].minion_type === 14) {
              state.board[i].health += 2;
            }
            // todo buff minions with minion_type = allminions
          }
          break;
        case 'Annihilan Battlemaster':
          // this one also confuses me
          break;
        default:
          if (timesDamagedThisTurn) {
            console.log('compile');
          }
                  // code block
      }
      switch (copiedCard.name) {
        case 'Alleycat':
          this.addCard( // prune the object from the api before calling addcard
            {
              img: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/6/6b/Tabbycat_full.jpg?version=aa6c91556797bb88a0151344c587c319',
              minion_type: 0,
              children: [],
              attack: 1,
              health: 1,
              name: 'Tabbycat',
              cardid: 420690,
              text: 'welcome to flavortown',
              keywords: [],
              inHand: false,
              goes: copiedCard.goes + 1,
              buffs: [],
            },
          );
          break;
        case 'Pogo-Hopper':
          copiedCard.health += (2 * state.pogo_count);
          state.pogo_count += 1;
          break;
        case 'Murloc Tidehunter':
          // code block
          this.addCard( // prune the object from the api before calling addcard
            {
              img: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/6/6b/Tabbycat_full.jpg?version=aa6c91556797bb88a0151344c587c319',
              minion_type: 14,
              children: [],
              attack: 1,
              health: 1,
              name: 'Murloc Scout',
              cardid: 420691,
              text: 'flavor text v2',
              keywords: [],
              inHand: false,
              goes: copiedCard.goes + 1,
              buffs: [],
            },
          );
          break;
        default:
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
