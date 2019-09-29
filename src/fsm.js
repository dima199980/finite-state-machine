class FSM {

    constructor(config) {
        if (!config) throw new Error();

        this.config = config;
        this.states = this.config.states;

        this.undoStack = [];
        this.redoStack = [];

        this.state = this.config.initial;
    }


    getState() {
        return this.state;
    }


    changeState(state) {
        if (!this.states[state]) throw new Error();

        this.undoStack.push(this.state);
        this.redoStack = [];
        this.state = state;
    }

    trigger(event) {
        this.changeState(this.states[this.state].transitions[event]);
    }

    reset() {
        this.changeState(this.config.initial);
    }

    getStates(event) {
        if (!event) return Object.keys(this.states);

        return Object.keys(this.states).filter(key => this.states[key].transitions[event]);
    }

    undo() {
        if (this.undoStack.length === 0) return false;

        this.redoStack.push(this.state);
        this.state = this.undoStack.pop();

        return true;
    }

    redo() {
        if (this.redoStack.length === 0) return false;

        this.undoStack.push(this.state);
        this.state = this.redoStack.pop();

        return true;
    }

    clearHistory() {
        this.undoStack = [];
        this.redoStack = [];
    }
}

module.exports = FSM;