<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'DefaultButton',
  }
</script>

<style scoped>
  button{
    border: 2px solid var(--primary-500);
    padding: 8px;
    max-height: 40px;
    background: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--transition);

    &:hover{
      border-color: var(--secondary-500);
      background: var(--secondary-50);
    }
  }
</style>