export default function parseminion(miniontoparse) {
  const parsedminion = {
    img: miniontoparse.battlegrounds.image,
    minion_type: miniontoparse.minionTypeId, // an int representing murloc, beast etc
    children: miniontoparse.childIds, // minions associated with the current minion
    // eg alleycat has tabbycat's id in its children array
    attack: miniontoparse.attack,
    health: miniontoparse.health,
    name: miniontoparse.name,
    cardid: miniontoparse.id, // id unique to the minion
    text: miniontoparse.flavorText,
    keywords: {
      taunt: 0,
      dshield: 0,
      poison: 0,
      plants: 0,
      windfury: 0,
      microbots: 0,
      golden_microbots: 0,
      battlecry: 0,
    },
    inHand: false, // determines whether or not to show play me button on card component
  };
  // go through the keywords of the passed in minion
  // adjust the keywords object of the parsedminion to reflect them
  for (let i = 0; i < miniontoparse.keywordIds.length; i += 1) {
    switch (miniontoparse.keywordIds[i]) {
      case 1:
        parsedminion.keywords.taunt = 1;
        break;
      case 2:
        parsedminion.keywords.dshield = 1;
        break;
      case 32:
        parsedminion.keywords.poison = 1;
        break;
      case 11:
        parsedminion.keywords.windfury = 1;
        break;
      case 8:
        // we only need to know if the minion has a battlecry so we can buff crowd favorite
        parsedminion.keywords.battlcry = 1;
        break;
      default:
    }
  }
  return parsedminion;
}
