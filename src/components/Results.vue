<template>
  <section>
    <ul v-if="$store.state.searchTerm !== null && $store.state.searchResults.length > 0">
      <li class="result" v-for="result in $store.state.searchResults"
            :key="result.imdbID" >
        <Result :result="result" />
      </li>
    </ul>
    <div>
      <button
        class="previous"
        v-if="$store.state.currentPage > 1"
        v-on:click="$store.dispatch('previousPage')">&lt;</button>
      <button
        class="next"
        v-if="$store.state.currentPage < $store.state.totalPages"
        v-on:click="$store.dispatch('nextPage')">&gt;</button>
    </div>
    <p class="no-results" v-if="$store.state.searchTerm !== null &&
      $store.state.searchResults.length === 0">No results found</p>
  </section>
</template>

<script>

import Result from '@/components/Result.vue';

/**
 * A list of Results.
 */
export default {
  name: 'Results',
  components: {
    Result,
  },
};

</script>
