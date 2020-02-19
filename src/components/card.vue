<template>
<div class="card">
  <div class="image-wrapper">
  <img :src="this.aCard.battlegrounds.image" class="card-img-top"
   alt="oops! no image to display">
  </div>
  <div class="card-body">
    <h5 class="card-title">
      {{this.aCard.name}}
    </h5>
    <!--only want to present the option to add to hand if the card is not in hand already-->
    <button v-if = "!aCard.inHand" @click="click" class="btn btn-primary">Play Me</button>
  </div>
</div>
</template>
<script>
export default {
  name: 'card',
  props: ['aCard'],
  methods: {
    click() {
      console.log(this.aCard);
      this.$store.commit('addCard', this.aCard);
    },
  },
};
</script>
<style scoped>
.card {
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
