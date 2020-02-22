

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
            <div>
                <button v-if="aCard.location == 0" @click="showmodal = true;" class="btn btn-secondary">
                    <font-awesome-icon icon="edit" />
                </button>
                <b-modal
                    v-model="showmodal"
                    title="Edit Minion"      
                    @ok="playeditedtohand"
                    >
                    <b-container fluid>
                        <p>{{copyBeingEdited.name}}</p>
                        <b-form-input v-model="copyBeingEdited.health" :placeholder="copyBeingEdited.health"></b-form-input>
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
    }
  },
  methods: {
    playeditedtohand(){
      this.$store.commit('moveToHand', this.copyBeingEdited);
    },
    playtohand() {
      console.log(this.aCard);
      this.$store.commit('moveToHand', this.aCard);
    },
    playtoboard(){
      this.$store.commit('playToBoard', this.aCard); // index to add at omitted here
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
