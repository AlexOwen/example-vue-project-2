<template>
  <div class="home">
    <SearchBar />
    <Results />
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import Results from '@/components/Results.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    Results,
  },
};
</script>
