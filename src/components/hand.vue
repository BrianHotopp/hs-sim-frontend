<template>
<div>
    <b-container>
        <b-row>
            <h1>Hand</h1>
        </b-row>
        <b-row>
            <b-col v-for="minion in hand" :key = minion.id>
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
  name: 'hand',
  data() {
    return {
    };
  },
  components: {
    card,
  },
  computed: {
    hand() {
      return this.$store.state.hand;
    },
  },
};
</script>
<style scoped>

</style>
