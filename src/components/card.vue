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
    <button v-if="!aCard.inHand" @click="playtoboard" class="btn btn-primary">Play</button>
    <button v-if="aCard.inHand" @click="removefromboard" class="btn btn-danger">Remove</button>
    <!-- there is an edit button on all cards no matter what -->
   
    <div>
      <button @click="showchildmodal = true;" class="btn btn-secondary">
          <font-awesome-icon icon="edit" />
    </button>
    <div v-if="showchildmodal">
    <editmenu :cardToEdit = aCard :open = showchildmodal></editmenu>
    </div>

  </div>
  </div>
</div>
</template>
<script>
import editmenu from './editmenu';
export default {
  name: 'card',
  props: ['aCard'],
  components:{
    editmenu,
  },
  data(){
    return {
      showchildmodal: false,
    }
  },
  methods: {
    playtoboard() {
      console.log(this.aCard);
      this.$store.commit('addCard', this.aCard);
    },
    removefromboard() {
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
