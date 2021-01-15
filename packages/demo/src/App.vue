<template>
  <div class="container">
    <div>
      <KeyBackground :pressed-key-code="pressedKeyCode" />

      <p>{{ isSuccess ? 'Success!' : 'Wrong Key!' }}</p>
      <button @click="isActiveRef = !isActiveRef">
        Listener active: {{ isActiveRef }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import KeyBackground from './components/KeyBackground.vue'
import { useKeypress } from 'vue3-keypress'
import { defineComponent, ref } from 'vue'

// TODO: Grab directly from module's types
interface KeypressResult {
  event: KeypressResult
  keyEvent: string
}

interface SuccessResult extends KeypressResult {
  keyCode: string
  keyEvent: string
  modifiers: ['altKey' | 'metaKey' | 'ctrlKey' | 'shiftKey']
  preventDefault: boolean
}

export default defineComponent({
  components: {
    KeyBackground
  },
  setup() {
    const pressedKeyCode = ref(null)
    const isSuccess = ref(false)
    const isActiveRef = ref(true)

    const someSuccessCallback = (result: SuccessResult) => {
      console.log(result)
      isSuccess.value = true
    }

    const someWrongKeyCallback = (result: KeypressResult) => {
      console.log(result)
      isSuccess.value = false
    }

    const someAnyKeyCallback = (result: KeypressResult) => {
      console.log(result)
      //pressedKeyCode.value = result.keyCode
    }

    useKeypress({
      keyEvent: 'keydown',
      keyBinds: [
        {
          keyCode: 'left',
          modifiers: ['shiftKey'],
          success: someSuccessCallback,
          preventDefault: true // the default is true
        },
        {
          keyCode: 'right',
          modifiers: ['shiftKey'],
          success: someSuccessCallback,
          preventDefault: true // the default is true
        }
      ],
      onWrongKey: someWrongKeyCallback,
      onAnyKey: someAnyKeyCallback
    })

    return { pressedKeyCode, isActiveRef, isSuccess }
  }
})
</script>

<style scoped>
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
