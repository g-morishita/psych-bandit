import { Agent } from "./agent.mjs";

class RLAgent extends Agent {
    constructor(lr, beta, initialValues) {
        super();
        this.lr = lr;
        this.beta = beta; // inverse temperature
        this._values = initialValues;
    }

    set lr(newLr) {
        if ((0 >= newLr) && (newLr >= 1)) {
            throw `alpha must be between 0 and 1. Given ${newLr}`;
        }
        this._lr = newLr;
    }

    get lr() {
        return this._lr;
    }

    set beta(newBeta) {
        if (newBeta < 0) {
            throw new Error(`beta must be nonnegative. Given ${newBeta}`);
        }
        this._beta = newBeta;
    }
    get beta() {
        return this._beta;
    }

    set values(newValues) {
        throw `You cannot change the number of arms.`;
    }

    get values() {
        return this._values;
    }

    makeChoice() {
        const cumDist = this.#calculateCumDistWithSoftmax();
        const randomVal = Math.random();
        for (let i = 0; i < cumDist.length; i++) {
            if (randomVal < cumDist[i]) {
                return i;
            }
        }
        return cumDist.length - 1;
    }

    #calculateCumDistWithSoftmax() {
        // const sum = this._qValues.reduce((prevVal, currVal) => prevVal + currVal, 0);
        const expQ = this._values.map((qVal) => Math.exp(this.beta * qVal));
        const sum = expQ.reduce((prevVal, currVal) => prevVal + currVal, 0);
        let cumSum = 0;
        const cumulativeDist = expQ.map((expQVal) => cumSum += expQVal / sum);
        return cumulativeDist;
    }

    learn(madeChoice, reward) {
        if (madeChoice >= this.values.length) {
            throw new Error(`The index of the given arm exceeds. Given ${madeChoice}`);
        }
        this._values[madeChoice] += this.lr * (reward - this._values[madeChoice]);
    }
}

export { RLAgent };
