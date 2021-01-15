<p align="center"><img align="center" height="300px" src="https://github.com/lupas/vue3-keypress/blob/master/misc/keypressLogo.png?raw=true"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue3-keypress"><img src="https://badgen.net/npm/dm/vue3-keypress" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue3-keypress"><img src="https://badgen.net/npm/v/vue3-keypress" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue3-keypress"><img src="https://badgen.net/npm/license/vue3-keypress" alt="License"></a>
 </p>
</p>

# Vue Keypress

Want to capture _keydown_, _keypress_ and _keyup_ and events globally in Vue? Nothing easier than that.

The Vue Keypress Component let's you do just that.

Just add the component to the view/component that should start a global keypress handler. When the component gets destroyed, the global event handler also gets removed.

# ‼️ Using Vue 2?

This package only supports Vue 3.

For Vue 2 support, visit the [lupas/vue-keypress](https://github.com/lupas/vue-keypress) package repository.

# How to install?

```bsh
yarn add vue3-keypress
// or
npm i vue3-keypress
```

# How to use in your project?

# Simple Example

```vue
<script>
import { useKeypress } from 'vue3_keypress'
import { ref } from 'vue'

setup() {
    const keypressListenerActive = ref(true)
    const someSuccessCallback = ({ keyCode }) => {
        // doSomething
    }

    useKeypress({
        keyEvent: "keydown",
        keyBinds: [
          {
            keyCode: "down",
            modifiers: ['shiftKey'], // Optional
            preventDefault: false // Optional: default is "true"
            success: someSuccessCallback,
          },
        ],
        isActive: keypressListenerActive,
    })
}
</script>
```

# Full Example

```vue
<script>
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
      isActive: isActiveRef,
    })

    return {}
  },
}
</script>
```

# Config

| Variable   | Type         | Default | Possible Values                | Description                                                                       |
| ---------- | ------------ | ------- | ------------------------------ | --------------------------------------------------------------------------------- |
| keyEvent   | String       | 'keyup' | _keydown_, _keypress_, _keyup_ |                                                                                   |
| keyBinds   | KeyBind[]    | []      | see below                      | Object containing infos about which keys are expected to be pressed.              |
| isActive   | Ref(Boolean) | false   | true / false                   | Setups up a listener that activates/deactivates the keypress listener.            |
| onWrongKey | Function     | null    |                                | Callback that is triggered every time a key is pressed that is not in "keyBinds". |
| onAnyKey   | Function     | null    |                                | Callback that is triggered every time a key is pressed.                           |

## Key Binds

| Variable       | Type     | Default | Possible Values                                      | Description                                                                       |
| -------------- | -------- | ------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| keyCode        | Number   | null    | [see here](https://keycode.info/)                    | Key that should trigger the event. If _null_, any key will trigger event.         |
| modifiers      | Array    | []      | ['_ctrlKey_', '_shiftKey_', '_altKey_', '_metaKey_'] | Keys that needs to be pressed down before the actual key (key Code), e.g. Ctrl+A. |
| preventDefault | Boolean  | false   | _true_,_false_                                       | Prevent the default action of the event                                           |
| success        | Function | null    |                                                      | Callback that is triggered when the correct key is pressed.                       |

The return payload of the callbacks is like so:

```js
{
  event: Object, // the official event object
  expectedEvent: Object, // your defined props.
  message: String // A declarative message on error/success.
}
```
