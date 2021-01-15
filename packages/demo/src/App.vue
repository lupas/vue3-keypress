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

export default defineComponent({
  components: {
    KeyBackground
  },
  setup() {
    const pressedKeyCode = ref(null)
    const isSuccess = ref(false)
    const isActiveRef = ref(true)

    const someSuccessCallback = ({ keyCode }: any) => {
      console.log(keyCode)
      isSuccess.value = true
    }

    const someWrongKeyCallback = ({ event }: any) => {
      console.log(event)
      isSuccess.value = false
    }

    const someAnyKeyCallback = ({ event }: any) => {
      pressedKeyCode.value = event.keyCode
    }

    useKeypress({
      keyEvent: 'keydown',
      keyBinds: [
        {
          keyCode: '69',
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
      onAnyKey: someAnyKeyCallback,
      isActive: isActiveRef // TODO: Doesn't seem to work yet + doesnt work if not provided
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
