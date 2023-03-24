class Agent {
    constructor() {
        if (this.constructor === Agent) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    makeChoice() {
        throw new Error("Method makeChoice has to be implemented.");
    }

    learn() {
        throw new Error("Method learn has to be implemented.");
    }
}

export { Agent };