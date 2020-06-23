<template>
  <div class="result" v-on:click="$store.dispatch('getMovieDetails', result.imdbID)">
    <h3 class="title">{{ result.title }}</h3>
    <p class="year">{{ result.year }}</p>
    <img class="poster" :src="result.poster" v-if="result.poster"/>
  </div>
</template>

<script>

/**
 * A single result from the API.
 */
export default {
  name: 'Result',
  props: {
    result: Object,
  },
};

</script>

<style lang="scss" scoped>
div {
  cursor: pointer;
  padding: 1em;
  margin: 0 1em;
  border-radius: 1em;

  &:hover {
    background-color: rgba(233, 132, 24, 0.4);
  }
}
</style>
