export const store = {
    state: {
        card_list: [],
    },
    addCard(card_from_api) {
        // takes a phat card object we got from the api
        // maybe the user modified some variables
        // converts it to an object containing a subset of that information
        // adds that object to the application state
        this.state.card_list.push(
            {
                id: card_from_api.id,
                battlegrounds: {
                    image: card_from_api.battlegrounds.image,
                },
            }
        )
    }
}