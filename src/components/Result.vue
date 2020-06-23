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
  border: 1px solid #ccc;
  cursor: pointer;
  padding: 1em;
}
</style>
