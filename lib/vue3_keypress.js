"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeypress = void 0;
const vue_1 = require("vue");
const key_codes_1 = require("./key_codes");
const supportedModifiers = ['altKey', 'metaKey', 'ctrlKey', 'shiftKey'];
const useKeypress = ({ keyEvent, keyBinds, onAnyKey, onWrongKey, isActive: isListenerActiveRef, }) => {
    let eventListener = null;
    for (let keyBind of keyBinds) {
        keyBind.keyCode = key_codes_1.default[keyBind.keyCode] || keyBind.keyCode;
    }
    const addListener = () => {
        if (!eventListener)
            eventListener = eventHandler();
        window.addEventListener(keyEvent, eventListener);
    };
    const removeListener = () => {
        if (!eventListener)
            return;
        window.removeEventListener(keyEvent, eventListener);
    };
    const eventHandler = () => {
        return (event) => {
            const callbackData = (eventData = {}) => (Object.assign({ event,
                keyEvent }, eventData));
            if (typeof onAnyKey == 'function')
                onAnyKey(callbackData({ any: true }));
            for (const { keyCode, modifiers, success, wrong, preventDefault = true, } of keyBinds) {
                // Check if the correct keys have been clicked:
                if (keyCode !== event.keyCode)
                    continue;
                if (modifiers && modifiers.length > 0) {
                    if (!requiredModifiersPressed(event, modifiers))
                        continue;
                }
                else {
                    if (anyModifiersPress(event, modifiers))
                        continue;
                }
                if (preventDefault)
                    event.preventDefault();
                // SUCCESS -> the correct key was pressed if we got to this point
                success(callbackData({ keyCode, modifiers, preventDefault }));
                return !preventDefault;
            }
            if (typeof onWrongKey == 'function')
                onWrongKey(callbackData({ wrong: true }));
            return null;
        };
    };
    const requiredModifiersPressed = (event, modifiers) => {
        return supportedModifiers.every((modifier) => event[modifier] == (modifiers.indexOf(modifier) !== -1));
    };
    const anyModifiersPress = (event, modifiers) => {
        return supportedModifiers.some((modifier) => !!event[modifier]);
    };
    if (isListenerActiveRef) {
        if (isListenerActiveRef.value)
            addListener();
        vue_1.watch(isListenerActiveRef.value, (active) => {
            active ? addListener() : removeListener();
        });
    }
    else {
        vue_1.onMounted(() => addListener());
    }
    vue_1.onUnmounted(() => removeListener());
};
exports.useKeypress = useKeypress;
//# sourceMappingURL=vue3_keypress.js.map