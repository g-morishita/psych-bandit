import { Bandit } from "./bandit.mjs";

/**
 * StableBernoulliBandit represents a multi-armed bandit problem
 * where each arm provides a reward based on a Bernoulli distribution.
 * The probability of reward for each arm remains stable over time.
 */
class StableBernoulliBandit extends Bandit {
  /**
   * Constructs a StableBernoulliBandit instance with specified reward probabilities for each arm.
   *
   * @param {number[]} rewardProbabilities - An array representing the probability of reward for each arm.
   *                                         Each probability should be a value between 0 and 1.
   *                                         The array should contain at least two probabilities.
   */
  constructor(rewardProbabilities) {
    super();

    // Ensure there are at least two arms
    if (rewardProbabilities.length <= 1) {
      throw new Error(
        `The length of rewardProbabilities must be greater than 1. Given: ${rewardProbabilities}`
      );
    }

    // Validate each reward probability is in the range [0, 1]
    for (const rewardProb of rewardProbabilities) {
      if (rewardProb < 0 || rewardProb > 1) {
        throw new Error(
          `Each reward probability must be between 0 and 1. Given: ${rewardProb}`
        );
      }
    }

    this._rewardProbabilities = rewardProbabilities;
  }

  /**
   * Get the reward probabilities for each arm.
   *
   * @returns {number[]} An array of reward probabilities for each arm.
   */
  get rewardProbabilities() {
    return this._rewardProbabilities;
  }

  /**
   * Setter to prevent changes to reward probabilities after initialization.
   *
   * @param {number[]} _ - Ignored parameter. Used to throw an error when attempting to set rewardProbabilities.
   * @throws {Error} If an attempt is made to change reward probabilities.
   */
  set rewardProbabilities(_) {
    throw new Error(
      "You can't change the reward probabilities after initialization."
    );
  }

  /**
   * Determine the reward for a chosen arm. The reward is 1 or 0 based on a Bernoulli distribution.
   *
   * @param {number} madeChoice - The index of the chosen arm.
   * @returns {number} Returns 1 if the random draw is less than the reward probability of the chosen arm, otherwise returns 0.
   * @throws {Error} If the chosen arm index is invalid.
   */
  getReward(madeChoice) {
    if (madeChoice >= this._rewardProbabilities.length) {
      throw new Error(`Invalid arm index: ${madeChoice}.`);
    }

    const rewardProbability = this._rewardProbabilities[madeChoice];
    return Math.random() < rewardProbability ? 1 : 0;
  }
}

export { StableBernoulliBandit };
