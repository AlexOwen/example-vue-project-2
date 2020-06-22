<template>
  <section>
    <input v-model="searchTerm" />
    <button v-on:click="$store.dispatch('search', searchTerm)"
      :disabled="searchTerm === ''">Search</button>
  </section>
</template>

<script>

/**
 * A box for seaching for movies.
 */
export default {
  name: 'SearchBox',
  data() {
    return {
      searchTerm: '',
    };
  },
};

</script>
