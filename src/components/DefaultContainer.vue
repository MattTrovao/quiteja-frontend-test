<template>
  <v-container class="py-10">
    <v-row>
      <slot />
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DefaultContainer',
  }
</script>