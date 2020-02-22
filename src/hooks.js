export default function hooks(state, playedcard) {
  for (let i = 0; i < state.board.length; i += 1) {
    // it feels bad to go through all possible minions
    // for every minion on the board but it is constant time because the board is max 7 minions
    switch (state.board[i].name) {
      case 'Murloc Tidecaller':
        if (playedcard.minion_type === 14 && !(playedcard === state.board[i])) {
          // the second part of this conditional prevents tidecaller
          // from buffing itself when played
          // if a murloc was just played
          state.board[i].attack += 1;
        }
        break;
      case 'Cobalt Guardian':
        if (playedcard.minion_type === 17 && !(playedcard === state.board[i])) {
          // if a murloc was just played
          if (!state.board[i].keywords.includes(3)) {
            // give the cobalt divine shield if it doesn't already have it
            state.board[i].keywords.push(3);
          }
        }
        break;
      case 'Crowd Favorite':
        if (playedcard.keywords.includes(8)) {
          // if the played minion had a battlecry
          state.board[i].health += 2;
          state.board[i].attack += 2;
        }
        break;
      case 'Pack Leader':
        if (playedcard.minion_type === 20 && !(playedcard === state.board[i])) {
          // if a beast was just played
          playedcard.attack += 3;
        }
        break;
      case 'Mama Bear':
        if ((playedcard.minion_type === 20) && !(playedcard === state.board[i])) {
          // if a beast just got played
          playedcard.attack += 4;
          playedcard.health += 4;
        }
        break;
      case 'Wrath Weaver':
        if ((playedcard.minion_type === 15)) {
          // if a demon was just played
          state.timesdamaged += 1;
        }
        break;
      default:
    }
    // now that we have properly buffed floating watchers off the last minion we played
    // we can set timesdamaged = 0
    // so that next time we take damage off a minion we don't get excess buffs
  }
  for (let i = 0; i < state.board.length; i += 1) {
    if (state.board[i].name === 'Floating Watcher') {
      state.board[i].attack += 2 * (state.timesdamaged);
      state.board[i].health += 2 * (state.timesdamaged);
    }
  }
  state.timesdamaged = 0;
}
