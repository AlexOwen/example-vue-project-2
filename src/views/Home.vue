<template>
  <div class="home">
    <section class="search">
      <SearchBar />
    </section>
    <section class="results">
      <Results />
    </section>
    <section class="detail">
      <MovieDetail v-if="$store.state.focusedMovie !== null" :movie="$store.state.focusedMovie" />
    </section>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import Results from '@/components/Results.vue';
import MovieDetail from '@/components/MovieDetail.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    Results,
    MovieDetail,
  },
};
</script>

<style lang="scss">
  .results {
    max-width: 80%;
    margin: auto;
  }
</style>
