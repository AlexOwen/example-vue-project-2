<template>
  <div ref="details">
    <div class="overlay" v-on:click="$store.commit('setFocusedMovie', {})"></div>
    <div class="info">
      <h3 class="title">{{ movie.title }}</h3>
      <p class="year">{{ movie.year }}</p>
      <img class="poster" :src="movie.poster" v-if="movie.poster"/>
      <p class="plot">{{ movie.plot }}</p>
      <p class="runtime">{{ movie.runtime }}</p>
    </div>
  </div>
</template>

<script>

/**
 * Displays details about a movie.
 */
export default {
  name: 'MovieDetail',
  props: {
    movie: Object,
  },
};

</script>

<style lang="scss" scoped>
.info {
  background-color: #fff;
  padding: 1em;
  border-radius: 1em;
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
}
.overlay {
  background-color: rgba(100, 100, 100, 0.7);
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

</style>
