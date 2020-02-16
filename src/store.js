import Axios from "axios";

export const store = {
    state: {
        pogo_count: 0,
        card_list: [],
    },
    addCard(card_from_api) {
        if (this.state.card_list.length >= 7){
            // complain about trying to add too many cards to board
            return;
        };
        // takes a phat card object we got from the api
        // maybe the user modified some variables
        // converts it to an object containing a subset of that information
        // adds that object to the application state
        // what is a hook check?
            // events triggered by the summoning of another minion
            // eg the attack buff on tidecaller or the buff floating watcher gets on damage
        // why should we handle battlecries before hook checks?
        // battlecries
        let times_damaged_this_turn = 0;
        switch(card_from_api.name) {
            case 'Alleycat':
                // call to api to get tabbycat, then recall add card with tabbycat
                Axios.get('https://us.api.blizzard.com/hearthstone/cards/40425')
                .then((response)=>{
                    this.addCard(response);
                });
                break;
            case 'Pogo-Hopper':
                // code block
                break;
            case 'Murloc Tidehunter':
                // code block
                break;
            case 'Rockpool Hunter':
              
            case 'Vulgar Homunculus':
              
            case 'Coldlight Seer':
          
            case 'Metaltooth Leaper':
               
            case 'Nathrezim Overseer':
                
            case 'Zoobot':
                
            case 'Crystalweaver':
               
            case 'Defender of Argus':
               
            case 'Gentle Megasaur':
                
            case 'Houndmaster':
                
            case 'Screwjank Clunker':
                
            case 'Strongshell Scavenger':
                
            case 'Menagerie Magician':
               
            case 'Virmen Sensei':
                
            case 'King Bagurgle':
               
            case 'Annihilan Battlemaster':
                
            default:
                // code block
        } 
        this.state.card_list.push(
            {
                id: card_from_api.id,
                battlegrounds: {
                    image: card_from_api.battlegrounds.image,
                },
                name: card_from_api.name,
                attack: card_from_api.attack,
                health: card_from_api.health,
                // this is an array of numbers where each number represents the following
                // 8 battlecry
                // 3 divine shield
                // 66 magnetic
                // 1 taunt
                // 12 deathrattle
                keywords: card_from_api.keywordIds,
            }
        )
        // now we check for hooks
    }
}