<template>
  <div class="container">
    <Example />
  </div>
</template>

<script>
import Example from './components/Example.vue'

export default {
  components: {
    Example,
  },
}
</script>

<style>
body {
  margin: 0;
}

.container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
</style>
