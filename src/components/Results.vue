<template>
  <div>
    <ul v-if="$store.state.searchTerm !== null && $store.state.searchResults.length > 0">
      <li v-for="result in $store.state.searchResults"
            :key="result.imdbID" >
        <Result :result="result" />
      </li>
    </ul>
    <div class="pagination" v-if="$store.state.searchTerm !== null &&
      $store.state.searchResults.length > 0">
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
  </div>
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

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow-x: auto;
  border-radius: 1em;
  width: 100%;
  align-items: center;

  li {
    width: 400px;
  }
}

.pagination {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgb(48, 48, 48);
  padding: 1em;
}

button {
  padding: 0.4em 1em;
  border-radius: 0.4em;
  background: rgb(233, 132, 24);
  color: rgb(255, 255, 255);
  border: none;
  font-weight: bold;
  margin: 0.5em;
}
</style>
