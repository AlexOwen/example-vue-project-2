<template>
  <div>
    <input v-model="searchTerm" />
    <button v-on:click="$store.dispatch('search', searchTerm)"
      :disabled="searchTerm === ''">Search</button>
  </div>
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

<style scoped>
div {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: rgb(48, 48, 48);
  padding: 1em;
}

input {
  padding: 0.4em;
  border-radius: 0.4em;
  outline: none;
  border: none;
  margin-right: 1em;
  width: 80%;
}

button {
  padding: 0.4em 1em;
  border-radius: 0.4em;
  background-color: rgb(233, 132, 24);
  color: rgb(255, 255, 255);
  border: none;
  font-weight: bold;
}
</style>
