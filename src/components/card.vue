

<template>
    <div class="card">
        <div class="image-wrapper">
            <img :src="this.aCard.img" class="card-img-top"
                alt="oops! no image to display">
        </div>
        <div class="card-body">
            <h5 class="card-title">
                {{this.aCard.name}} {{this.aCard.attack}}/{{this.aCard.health}}
            </h5>
            <!--only want to present the option to add to hand if the card is not in hand already-->
            <button v-if="aCard.location === 0" @click="playtohand" class="btn btn-primary">Add to hand</button>
            <button v-if="aCard.location === 1 || aCard.location === 2" @click="remove" class="btn btn-danger">Remove</button>
            <button v-if="aCard.location === 1" @click="playtoboard" class="btn btn-success">Play to Board</button>
            <div v-if="aCard.location === 1">
                        <b-form-select v-model="playtoposition" :options="options"></b-form-select>
    
    <div class="mt-3">Selected: <strong>{{ playtoposition }}</strong></div>
                        </div>
            <div>
                <button v-if="aCard.location == 0 || aCard.location == 2" @click="showmodal = true;" class="btn btn-secondary">
                    <font-awesome-icon icon="edit" />
                </button>
                
                <b-modal
                    v-model="showmodal"
                    title="Edit Minion"      
                    @ok="commitchanges"
                    >
                    <b-container fluid>
                        <p>{{copyBeingEdited.name}}</p>
                        <label for="attackinput">Attack</label>
                        <b-form-input id="attackinput" v-model="copyBeingEdited.attack" type="number" :placeholder="copyBeingEdited.attack.toString()"></b-form-input>
                        <label for="healthinput">Health</label>
                        <b-form-input id="healthinput" v-model="copyBeingEdited.health" type="number" :placeholder="copyBeingEdited.health.toString()"></b-form-input>
                        <b-form-checkbox
                            v-model="copyBeingEdited.keywords.taunt"
                            value=1
                            unchecked-value=0
                            >
                            Taunt {{copyBeingEdited.keywords.taunt}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="copyBeingEdited.keywords.dshield"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Divine Shield {{copyBeingEdited.keywords.dshield}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="copyBeingEdited.keywords.poison"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Poison {{copyBeingEdited.keywords.poison}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.first"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 1 {{bufftargets.first}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.second"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 2 {{bufftargets.second}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.third"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 3 {{bufftargets.third}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.fourth"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 4 {{bufftargets.fourth}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.fifth"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 5 {{bufftargets.fifth}}
                        </b-form-checkbox>
                        <b-form-checkbox
                            v-model="bufftargets.sixth"
                            name="checkbox-1"
                            value=1
                            unchecked-value=0
                            >
                            Target 6 {{bufftargets.sixth}}
                        </b-form-checkbox>
                        
                  
                    </b-container>
                </b-modal>
            </div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'card',
  props: ['aCard'],
  components:{
    
  },
  data(){
    return {
      showmodal: false,
      copyBeingEdited: JSON.parse(JSON.stringify(this.aCard)),
      playtoposition: 1,
      bufftargets: { // it's only possible to pick from 6 minions when applying a buff
        "first": 0,
        "second": 0,
        "third": 0,
        "fourth": 0,
        "fifth": 0,
        "sixth": 0,
      },
        options: [
          { value: 1, text: 'Play to position 1' },
          { value: 2, text: 'Play to position 2' },
          { value: 3, text: 'Play to position 3' },
          { value: 4, text: 'Play to position 4' },
          { value: 5, text: 'Play to position 5' },
          { value: 6, text: 'Play to position 6' },
          { value: 7, text: 'Play to position 7' },
        ]
    }
  },
  methods: {
    commitchanges(){
      if(this.aCard.location === 0){
        playeditedtohand(); // if the card we are editing is not yet on the board
        // add it to the hand
      }else{
        // the card we just finished editing is already on the board
        // we can just replace the original.aCard = copyBeingEdited;
      }
    },
    playeditedtohand(){
      const payload = {
        cardtoadd: this.copyBeingEdited,
      };
      this.$store.commit('moveToHand', payload);
    },
    playtohand() {
      const payload = {
        cardtoadd: this.aCard,
      };
      this.$store.commit('moveToHand', payload);
    },
    playtoboard(){
      const payload = {
          cardtoadd: this.aCard,
          indextoaddat: this.playtoposition - 1,
          bufftargets: this.bufftargets,

      }
      this.$store.commit('playToBoard', payload); // index to add at omitted here
    },
    remove() {
      this.$store.commit('removeCard', this.aCard);
    },
  },
};
</script>
<style scoped>
.card {
  font-size: .75rem;
  max-width: 14rem;
  height: 100%;
  margin-bottom: 50px;
}
.image-wrapper {
  height:10rem;
  overflow: hidden;
}
img{
  width:100%;
  height: 100%;
  object-fit: none;
  object-position: 50% 20%;
}
</style>
