<template>
  <div>
    <h3 class="title">{{ movie.title }}</h3>
    <p class="year">{{ movie.year }}</p>
    <img class="poster" :src="movie.poster" v-if="movie.poster"/>
    <p class="plot">{{ movie.plot }}</p>
    <p class="runtime">{{ movie.runtime }}</p>
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
