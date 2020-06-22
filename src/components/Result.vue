<template>
  <div>
    <h3 class="title">{{ result.title }}</h3>
    <p class="year">{{ result.year }}</p>
    <img class="poster" :src="result.poster" v-if="result.poster"/>
  </div>
</template>

<script>

/**
 * A single result from the API.
 */
export default {
  name: 'Result',
  props: {
    result: Object,
  },
};

</script>
