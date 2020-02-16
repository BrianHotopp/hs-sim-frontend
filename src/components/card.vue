<template>
<div class="card">
  <div class="image-wrapper">
  <img :src="this.aCard.battlegrounds.image" class="card-img-top"
   alt="oops! no image to display">
  </div>
  <div class="card-body">
    <h5 class="card-title">
      {{ this.aCard.cardSet == 'Battlegrounds' ? 'Golden':'' }} {{this.aCard.name}}
    </h5>
    <p class="card-text">{{this.aCard.race}}</p>
    <a href="#" class="btn btn-primary">Play Me</a>
  </div>
</div>
</template>
<script>
export default {
  name: 'card',
  props: ['aCard'],
};
</script>
<style scoped>
.card {
  max-width: 14rem;
  height: 100%;
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
