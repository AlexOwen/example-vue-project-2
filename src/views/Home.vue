<template>
  <div class="home">
    <SearchBar />
    <Results />
    <MovieDetail v-if="$store.state.focusedMovie !== null" :movie="$store.state.focusedMovie" />
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
