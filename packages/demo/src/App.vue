<template>
  <div class="container">
    <KeypressHandler />
  </div>
</template>

<script lang="ts">
import KeypressHandler from './components/KeypressHandler.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    KeypressHandler
  }
})
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
