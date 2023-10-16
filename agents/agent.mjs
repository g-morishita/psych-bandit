/**
 * Agent is an abstract base class representing a generic decision-making agent.
 * This class is meant to be extended by other specific agent types.
 */
class Agent {

  /**
   * Constructs an Agent. Throws an error if an attempt is made to directly
   * instantiate this abstract class.
   */
  constructor() {
    if (this.constructor === Agent) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * Abstract method representing the action-selection or decision-making mechanism
   * of the agent. Subclasses are expected to provide a concrete implementation
   * for this method.
   *
   * @throws {Error} If the method is not overridden in a subclass.
   */
  makeChoice() {
    throw new Error("Method makeChoice has to be implemented.");
  }

  /**
   * Abstract method representing the learning mechanism of the agent.
   * Subclasses are expected to provide a concrete implementation for this method.
   *
   * @throws {Error} If the method is not overridden in a subclass.
   */
  learn() {
    throw new Error("Method learn has to be implemented.");
  }
}

export { Agent };
