<template>
<div class="editmenu">

<!-- v-if is necessary in this modal because otherwise
vue will try to render copyBeingEdited.name for cards which haven't had their "edit" button pressed yet
and therefore have copyBeingEdited.name as null -->
<b-modal
v-model="showmodal"
title="Edit Minion"      
@ok="playedited"
>
{{copyBeingEdited.name}} 
</b-modal>

</div>
</template>
<script>

export default {
  name: 'editmenu',
  props: ['cardToEdit', 'open'],
  data() {
    return {
        showmodal: this.open,
        copyBeingEdited: JSON.parse(JSON.stringify(this.cardToEdit)),
    };
  },
  methods: {
    playedited() {
      if(this.cardToEdit.inHand) {
        // if the card was in hand
        // copy all enumerable properties from
        // the copy of the card to edit to the card to edit itself
        Object.assign(this.cardToEdit, this.copyBeingEdited);
      } else{
        this.$store.commit('addCard', this.copyBeingEdited);
      }    
    }
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
