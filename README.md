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

Import the component in any .vue file like so:

```js
...
components: {
  Keypress: defineAsyncComponent(() => import('vue3-keypress')),
}
...
```

# Simple Usage

```vue
<template>
  <Keypress key-event="keyup" :key-code="13" @success="someMethod" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Keypress: defineAsyncComponent(() => import('vue3-keypress')),
  },
  methods: {
    someMethod(response) {
      // Do something
    }
  }
}
</script>
```

# Props

| Prop    | Type   | Default | Possible Values                   | Description |
| ------- | ------ | ------- | --------------------------------- | ------------------------------------------------------------------------- |
| keyEvent   | String | 'keyup' | _keydown_, _keypress_, _keyup_    | |
| keyCode | Number | null    | [see here](https://keycode.info/) | Key that should trigger the event. If _null_, any key will trigger event. |
| modifiers   | Array | [] | ['_ctrlKey_', '_shiftKey_', '_altKey_', '_metaKey_']    | Keys that needs to be pressed down before the actual key (key Code), e.g. Ctrl+A.  |
| preventDefault   | Boolean | false | _true_,_false_    | Prevent the default action of the event |
| multipleKeys   | Array | [] | See example in 'Multiple Keys'   | Allows you to define multiple keyCode/modifier combinations per keyEvent. |

> If you use `multipleKeys`, all the other props (except `keyEvent`) become redundant.

# Events

| Event    | Description                                          |
| -------- |  ---------------------------------------------------- |
| @success | Get's emitted when the defined key/modifiers were pressed. |
| @wrong | Get's emitted when the wrong key(s) or modifier(s) was/were pressed. |
| @any | Get's emitted with any keypress in any case. |

All of them return a payload like so:

```js
{
  event: Object, // the official event object
  expectedEvent: Object, // your defined props.
  message: String // A declarative message on error/success.
}
```

# Multiple Keys

The `multiple-keys` prop allows for defining multiple keys (or key-modifier combinations) per key-event that can be pressed for success.

All the other props except key-event become redundant.

```vue
<template>
  <Keypress key-event="keyup" :multiple-keys="multiple" @success="someMethod" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Keypress: defineAsyncComponent(() => import('vue3-keypress')),
  },
  data: () => ({
    multiple: [
        {
          keyCode: 65, // A
          modifiers: ['shiftKey'],
          preventDefault: true,
        },
        {
          keyCode: 83, // S
          modifiers: ['shiftKey'],
          preventDefault: false,
        },
      ],
  }),
  methods: {
    someMethod(response) {
      // Do something
    }
  }
}
</script>
```

# Multiple Key Events

Multiple key events means that multiple event handlers for each evennt need to be registered. To do this, simply put your props in an array and register the component multiple times, like so:

```vue
<template>
    <Keypress
      v-for="keypressEvent in keypressEvents"
      :key="keypressEvent.id"
      :key-event="keypressEvent.keyEvent"
      :multiple-keys="keypressEvent.multipleKeys"
      @success="someMethod"
    />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    Keypress: defineAsyncComponent(() => import('vue3-keypress')),
  },
  data() {
    return {
      keypressEvents: [
        {
          keyEvent: 'keydown',
          multipleKeys: [
            {
              keyCode: 65, // A
              modifiers: ['shiftKey'],
              preventDefault: true,
            },
            {
              keyCode: 83, // S
              modifiers: ['shiftKey'],
              preventDefault: false,
            },
          ],
        },
        {
          keyEvent: 'keyup',
          multipleKeys: [
            {
              keyCode: 65, // A
              modifiers: ['shiftKey'],
              preventDefault: true,
            },
            {
              keyCode: 83, // S
              modifiers: ['shiftKey'],
              preventDefault: false,
            },
          ],
        },
      ],
    }
  },
  methods: {
    someMethod(response) {
      // Do something
    }
  },
}
</script>

```

# Typescript Support

Add the following to your `tsconfig.json`:

```json
"types": [
  "vue3-keypress"
]
```