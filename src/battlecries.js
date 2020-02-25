import hooks from './hooks';

export default function battlecries(state, playedcard, indexplayedat = 0, bufftargets = []) {
// takes in the app's internal state, and a card that was just played
// executes all battlecries for this card
// modifies: minions on the board other than the one which is the argument playedcard
// (the one whose battlecry we are enacting)
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
  };
  switch (playedcard.name) {
    case 'Rockpool Hunter':
      if (bufftargets.length) { // the user specified which minion to buff
        // buff the health and attack on that minion
        state.board[bufftargets[0]].attack += 1;
        state.board[bufftargets[0]].health += 1;
      } else { // the user did not specify which mininos to buff
        // randomly select minions to buff
        // generate list of murlocs currently on the board
        const murlocindices = [];
        let selection;
        for (let i = 0; i < state.board.length; i += 1) {
          if (state.board[i].minion_type === 14 && (state.board[i] !== playedcard)) {
            murlocindices.push(i);
          }
        }
        if (murlocindices.length) {
          selection = murlocindices[Math.floor(Math.random() * murlocindices.length)];
        }
        // buff the health and attack on that minion
        state.board[murlocindices[selection]].attack += 1;
        state.board[murlocindices[selection]].health += 1;
      }
      break;
    case 'Vulgar Homunculus':
      state.timesdamaged += 1;
      break;
    case 'Coldlight Seer':
      // give plus 2 health to all murlocs
      for (let i = 0; i < state.board.length; i += 1) {
        if (state.board[i].minion_type === 14 && !(state.board[i] === playedcard)) {
          state.board[i].health += 2;
        }
        // todo buff minions with minion_type = allminions
      }
      break;
    case 'Metaltooth Leaper':
      // give plus 2 attack to all mechs
      for (let i = 0; i < state.board.length; i += 1) {
        console.log(state.board[i].minion_type);
        if (state.board[i].minion_type === 17 && !(state.board[i] === playedcard)) {
          state.board[i].attack += 2;
        }
        // todo buff minions with minion_type = allminions
      }
      break;
    case 'Nathrezim Overseer':
      if (bufftargets.length) { // the user specified which minion to buff
        // buff the health and attack on that minion
        state.board[bufftargets[0]].attack += 2;
        state.board[bufftargets[0]].health += 2;
      } else { // the user did not specify which mininos to buff
        // randomly select minions to buff
        // generate list of murlocs currently on the board
        const demonindices = [];
        let indextobuff;
        for (let i = 0; i < state.board.length; i += 1) {
          if (state.board[i].minion_type === 15 && (state.board[i] !== playedcard)) {
            demonindices.push(i);
          }
        }
        if (demonindices.length) {
          indextobuff = demonindices[Math.floor(Math.random() * demonindices.length)];
        }
        // buff the health and attack on that minion
        state.board[indextobuff].attack += 1;
        state.board[indextobuff].health += 1;
      }
      break;
    case 'Zoobot':
      break;
    case 'Cobalt Guardian':
      // we have to get rid of cobalt guardian's divine shield status when we play it
      // for some reason it comes with the divine shield
      // we will give it back its divine shield if we play a mech
      playedcard.keywords = [];
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
      // attempt to play buff on right:
      if (indexplayedat !== (state.board.length - 1)) {
        state.board[indexplayedat + 1].health += 1;
        state.board[indexplayedat + 1].attack += 1;
        if (state.board[indexplayedat + 1]) { // minion does not yet have taunt

        }
      }
      if (indexplayedat !== 0) {
        state.board[indexplayedat - 1].health += 1;
        state.board[indexplayedat - 1].attack += 1;
      }
      state.board[playedcard.goes + 1].keywords.push(1);
      state.board[playedcard.goes - 1].keywords.push(1);
      break;
    case 'Gentle Megasaur':
      // todo this one confuses me
      break;
    case 'Houndmaster':
      // buff stats
      state.board[playedcard.buffs[0]].health += 2;
      state.board[playedcard.buffs[0]].attack += 2;
      // give taunt
      state.board[playedcard.buffs[0]].keywords.push(1);
      break;
    case 'Screwjank Clunker':
      state.board[playedcard.buffs[0]].health += 2;
      state.board[playedcard.buffs[0]].attack += 2;
      break;
    case 'Strongshell Scavenger':
      for (let i = 0; i < state.board.length; i += 1) {
        // if there is a taunt minion
        if (state.board[i].keywords.includes(1) && !(state.board[i] === playedcard)) {
          state.board[i].health += 2;
          state.board[i].attack += 2;
        }
      }
      break;
    case 'Menagerie Magician':
      if (playedcard.buffs[0] !== -1) {
        // if playedcard.buffs[0] == -1, it means there is no beast to be buffed
        state.board[playedcard.buffs[0]].health += 2;
        state.board[playedcard.buffs[0]].attack += 2;
      }
      // this is the index of the dragon to be buffed
      if (playedcard.buffs[1] !== -1) {
        // if playedcard.buffs[1] == -1, it means there is no dragon to be buffed
        state.board[playedcard.buffs[1]].health += 2;
        state.board[playedcard.buffs[1]].attack += 2;
      }
      // this is the index of the murloc to be buffed
      if (playedcard.buffs[2] !== -1) {
        // if playedcard.buffs[2] == -1, it means there is no murloc to be buffed
        state.board[playedcard.buffs[2]].health += 2;
        state.board[playedcard.buffs[2]].attack += 2;
      }
      break;
    case 'Virmen Sensei':
      if (playedcard.buffs[0] !== -1) {
        // if playedcard.buffs[2] == -1, it means there is no beast to be buffed
        state.board[playedcard.buffs[0]].health += 2;
        state.board[playedcard.buffs[0]].attack += 2;
      }
      break;
    case 'King Bagurgle':
      // give plus 2 health to all murlocs
      for (let i = 0; i < state.board.length; i += 1) {
        if (state.board[i].minion_type === 14 && !(state.board[i] === playedcard)) {
          state.board[i].health += 2;
        }
        // todo buff minions with minion_type = allminions
      }
      break;
    case 'Annihilan Battlemaster':
      // this one also confuses me
      break;

    case 'Alleycat':
      if (state.board.length < 7) { // there is boardspace
        const tabbyCopy = JSON.parse(JSON.stringify(tabbyCat));
        tabbyCopy.location = 2;
        state.board.splice(indexplayedat + 1, 0, tabbyCopy);
        hooks(state, tabbyCopy);
      }
      break;
    case 'Pogo-Hopper':
      playedcard.health += (2 * state.pogo_count);
      state.pogo_count += 1;
      break;
    case 'Murloc Tidehunter':
      // code block
      if (state.board.length < 7) { // there is boardspace
        const scoutCopy = JSON.parse(JSON.stringify(murlocScout));
        scoutCopy.location = 2;
        state.board.splice(indexplayedat + 1, 0, scoutCopy);
        hooks(state, scoutCopy);
      }
      break;
    default:
  }
}
