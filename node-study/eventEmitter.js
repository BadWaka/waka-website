class EventEmitter {

    constructor() {
        this.messageBox = {};
    }

    on(eventName, func) {
        const callbacks = this.messageBox[eventName] || [];
        callbacks.push(func);
        this.messageBox[eventName] = callbacks;
    }

    emit(eventName, ...args) {
        const callbacks = this.messageBox[eventName];
        if (callbacks.length > 0) {
            callbacks.forEach((callback) => {
                callback(...args);
            });
        }
    }

    off(eventName, func) {
        const callbacks = this.messageBox[eventName];
        const index = callbacks.indexOf(func);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    }
}