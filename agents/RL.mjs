import { Agent } from "./agent.mjs";

class RL extends Agent {
  constructor(lr, beta, initialValues) {
    super();
    this.lr = lr;
    this.beta = beta;
    this._values = initialValues;
  }

  set lr(newLr) {
    if (newLr < 0 || newLr > 1) {
      throw new Error(`alpha must be between 0 and 1. Given ${newLr}`);
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

  get values() {
    return this._values;
  }

  set values(_) {
    throw new Error(`You cannot change the number of arms.`);
  }

  makeChoice() {
    const cumDist = this.#calculateCumDistWithSoftmax();
    const randomVal = Math.random();
    return cumDist.findIndex((val) => randomVal < val) || cumDist.length - 1;
  }

  #calculateCumDistWithSoftmax() {
    const expQ = this._values.map((qVal) => Math.exp(this.beta * qVal));
    const sum = expQ.reduce((acc, val) => acc + val, 0);
    let cumSum = 0;
    return expQ.map((expQVal) => (cumSum += expQVal / sum));
  }

  learn(madeChoice, reward) {
    if (madeChoice >= this.values.length) {
      throw new Error(
        `The index of the given arm exceeds. Given ${madeChoice}`
      );
    }
    this._values[madeChoice] += this.lr * (reward - this._values[madeChoice]);
  }
}

export { RL };
