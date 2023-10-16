/**
 * Bandit is an abstract base class representing a generic bandit problem.
 * In the context of reinforcement learning, a bandit problem involves making
 * a series of choices and receiving rewards, without knowing the underlying
 * probability distribution of the rewards.
 *
 * This class is intended to be extended by specific bandit problem implementations.
 */
class Bandit {
  /**
   * Constructs a Bandit instance. Throws an error if an attempt is made
   * to directly instantiate this abstract class.
   */
  constructor() {
    if (this.constructor === Bandit) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * Abstract method representing the mechanism to retrieve a reward
   * after a choice has been made by an agent. Subclasses are expected
   * to provide a concrete implementation for this method, usually
   * based on the specific reward distribution of the bandit problem.
   *
   * @throws {Error} If the method is not overridden in a subclass.
   */
  getReward() {
    throw new Error("Method 'getReward' has to be implemented");
  }
}

export { Bandit };
