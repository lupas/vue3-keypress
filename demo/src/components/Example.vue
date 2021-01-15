<template>
  <div>
    <KeyBackground :pressed-key-code="pressedKeyCode" />
    <p>{{ isSuccess ? 'Success!' : 'Wrong Key!' }}</p>
    <button @click="isActiveRef = !isActiveRef">
      Listener active: {{ isActiveRef }}
    </button>
  </div>
</template>

<script>
import KeyBackground from './KeyBackground.vue'
import { useKeypress } from 'vue3-keypress'
import { ref } from 'vue'

export default {
  components: {
    KeyBackground,
  },
  setup() {
    const pressedKeyCode = ref(null)
    const isSuccess = ref(false)
    const isActiveRef = ref(true)

    const someSuccessCallback = ({ keyCode }) => {
      isSuccess.value = true
    }

    const someWrongKeyCallback = ({ event }) => {
      isSuccess.value = false
    }

    const someAnyKeyCallback = ({ event }) => {
      pressedKeyCode.value = event.keyCode
    }

    useKeypress({
      keyEvent: 'keydown',
      keyBinds: [
        {
          keyCode: 'left',
          modifiers: ['shiftKey'],
          success: someSuccessCallback,
          preventDefault: true, // the default is true
        },
        {
          keyCode: 'right',
          modifiers: ['shiftKey'],
          success: someSuccessCallback,
          preventDefault: true, // the default is true
        },
      ],
      onWrongKey: someWrongKeyCallback,
      onAnyKey: someAnyKeyCallback,
      isActive: isActiveRef, // TODO: Doesn't seem to work yet + doesnt work if not provided
    })

    return { pressedKeyCode, isActiveRef, isSuccess }
  },
}
</script>
