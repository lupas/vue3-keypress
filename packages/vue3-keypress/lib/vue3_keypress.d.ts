interface KeyBind {
    keyCode: string;
    modifiers?: ['altKey' | 'metaKey' | 'ctrlKey' | 'shiftKey'];
    preventDefault: boolean;
    success: Function;
}
interface KeypressOptions {
    keyEvent: 'keydown' | 'keypress' | 'keyup';
    keyBinds: KeyBind[];
    isActive: any;
    onAnyKey?: Function;
    onWrongKey?: Function;
}
export interface KeypressResult {
    keyCode: string;
    modifiers: ['altKey' | 'metaKey' | 'ctrlKey' | 'shiftKey'];
    preventDefault: boolean;
}
declare const useKeypress: ({ keyEvent, keyBinds, onAnyKey, onWrongKey, isActive: isListenerActiveRef, }: KeypressOptions) => void;
export { useKeypress };
