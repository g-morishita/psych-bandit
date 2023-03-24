class Bandit {
  constructor() {
    if (this.constructor === Bandit) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  getReward() {
    throw new Error("Method 'getReward' has to be implemented");
  }
}

export { Bandit };
