<template>
  <section>
    <ul v-if="$store.state.searchTerm !== null && $store.state.searchResults.length > 0">
      <li class="result" v-for="result in $store.state.searchResults"
            :key="result.imdbID" >
        <Result :result="result" />
      </li>
    </ul>
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
