// import Axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';

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
      const murlocScout = {
        img: 'https://media.hearthpwn.com/avatars/412/187/486.png',
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
      };
      const tabbyCat = {
        img: 'https://gamepedia.cursecdn.com/hearthstone_gamepedia/6/6b/Tabbycat_full.jpg?version=aa6c91556797bb88a0151344c587c319',
        minion_type: 20,
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
      };
      if (state.board.length >= 7) {
        console.log('unable to add card because there was no space on the board');
        // complain about trying to add too many cards to board
        return;
      }

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
        case 'Cobalt Guardian':
          // we have to get rid of cobalt guardian's divine shield status when we play it
          // for some reason it comes with the divine shield
          // we will give it back its divine shield if we play a mech
          copiedCard.keywords = [];
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
      }
      // now that we have performed all non token battlecries, we should add the card to the board
      console.log('attempting to add card');
      // put the copiedcard in our board
      state.board.splice(copiedCard.goes, 0, copiedCard);
      // now we do our toeken battlecries
      switch (copiedCard.name) {
        case 'Alleycat':
          this.commit('addCard', tabbyCat);
          break;
        case 'Pogo-Hopper':
          copiedCard.health += (2 * state.pogo_count);
          state.pogo_count += 1;
          break;
        case 'Murloc Tidehunter':
          // code block
          this.commit('addCard', murlocScout);

          break;
        default:
      }
      // now we should deal with hooks
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
              timesDamagedThisTurn += 1;
            }
            break;
          case 'Floating Watcher':
            state.board[i].attack += 2;
            state.board[i].health += 2;
            break;
          default:
        }
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
