import { Agent } from "./Agent.mjs";

/**
 * RLAgent represents a reinforcement learning agent which makes choices
 * based on a softmax policy. It learns to adjust the estimated values
 * of choices based on received rewards.
 */
class RLAgent extends Agent {

  /**
   * Constructs an RLAgent.
   * @param {number} lr - The learning rate, typically between 0 and 1.
   * @param {number} beta - The inverse temperature parameter for the softmax action selection.
   * @param {number[]} initialValues - Initial estimated values for each choice.
   */
  constructor(lr, beta, initialValues) {
    super();
    this.lr = lr;
    this.beta = beta;
    this._values = initialValues;
  }

  /**
   * Set the learning rate. Throws an error if the value is out of the [0, 1] range.
   */
  set lr(newLr) {
    if (newLr < 0 || newLr > 1) {
      throw new Error(`alpha must be between 0 and 1. Given ${newLr}`);
    }
    this._lr = newLr;
  }

  /** Get the learning rate. */
  get lr() {
    return this._lr;
  }

  /**
   * Set the beta parameter (inverse temperature). Throws an error if negative.
   */
  set beta(newBeta) {
    if (newBeta < 0) {
      throw new Error(`beta must be nonnegative. Given ${newBeta}`);
    }
    this._beta = newBeta;
  }

  /** Get the beta parameter (inverse temperature). */
  get beta() {
    return this._beta;
  }

  /** Get the estimated values for each choice. */
  get values() {
    return this._values;
  }

  /**
   * Disallow setting the values directly to preserve encapsulation.
   */
  set values(_) {
    throw new Error(`You cannot change the number of arms.`);
  }

  /**
   * Makes a choice based on the softmax action selection policy.
   * @returns {number} The index of the chosen arm.
   */
  makeChoice() {
    const cumDist = this.#calculateCumDistWithSoftmax();
    const randomVal = Math.random();
    return cumDist.findIndex(val => randomVal < val) || cumDist.length - 1;
  }

  /**
   * Calculates the cumulative distribution for softmax.
   * @private
   * @returns {number[]} The cumulative distribution array.
   */
  #calculateCumDistWithSoftmax() {
    // Calculate exponentials of values adjusted by the beta parameter.
    const expQ = this._values.map(qVal => Math.exp(this.beta * qVal));

    // Sum of all exponentials.
    const sum = expQ.reduce((acc, val) => acc + val, 0);

    // Generate the cumulative distribution based on softmax probabilities.
    let cumSum = 0;
    return expQ.map(expQVal => (cumSum += expQVal / sum));
  }

  /**
   * Updates the estimated value of the chosen arm based on received reward.
   * @param {number} madeChoice - The index of the chosen arm.
   * @param {number} reward - The received reward after making the choice.
   */
  learn(madeChoice, reward) {
    if (madeChoice >= this.values.length) {
      throw new Error(`The index of the given arm exceeds. Given ${madeChoice}`);
    }
    this._values[madeChoice] += this.lr * (reward - this._values[madeChoice]);
  }
}

export { RLAgent };
