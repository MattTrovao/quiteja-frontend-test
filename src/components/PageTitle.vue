<template>
  <v-col cols="12">
    <h1>
      <slot />
    </h1>
  </v-col>
</template>

<script>
  export default {
    name: 'PageTitle',
  }
</script>

<style scoped>
  h1 {
    font-size: 2rem;
    color: var(--primary-800);
    border-bottom: 2px solid var(--primary-800);
    text-transform: uppercase;
    font-weight: bold;
    padding-bottom: 8px;
    margin-bottom: 24px;
  }
</style>