<template>
<div>
    <b-container>
        <b-row>
            <b-col v-for="minion in board" :key = minion.id>
                <card :aCard = minion></card>
            </b-col>
        </b-row>
        <b-row>
        </b-row>
    </b-container>
</div>
</template>
<script>
import card from './card.vue';

export default {
  name: 'board',
  data() {
    return {
    };
  },
  components: {
    card,
  },
  computed: {
    board() {
      return this.$store.state.board;
    },
  },
};
</script>
<style scoped>

</style>
