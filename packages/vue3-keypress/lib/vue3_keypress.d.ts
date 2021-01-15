interface KeyBind {
    keyCode: string;
    modifiers?: ['altKey' | 'metaKey' | 'ctrlKey' | 'shiftKey'];
    preventDefault: boolean;
    success: {
        (input: any): SuccessResult;
    };
}
interface KeypressOptions {
    keyEvent: 'keydown' | 'keypress' | 'keyup';
    keyBinds: KeyBind[];
    isActive: any;
    onAnyKey?: {
        (event: any): KeypressResult;
    };
    onWrongKey?: {
        (event: any): KeypressResult;
    };
}
interface KeypressResult {
    event: KeypressResult;
    keyEvent: string;
}
interface SuccessResult extends KeypressResult {
    keyCode: string;
    keyEvent: string;
    modifiers: ['altKey' | 'metaKey' | 'ctrlKey' | 'shiftKey'];
    preventDefault: boolean;
}
export declare const useKeypress: ({ keyEvent, keyBinds, onAnyKey, onWrongKey, isActive: isListenerActiveRef, }: KeypressOptions) => void;
export {};
