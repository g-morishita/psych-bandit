import { StableBernoulliBandit } from "../../src/bandits/bernoulliBandit.mjs";

describe("StableBernoulliBandit Tests", () => {
  // Test 1: Check initialization with valid reward probabilities.
  test("should initialize with valid reward probabilities", () => {
    const rewardProbabilities = [0.3, 0.7];
    const bandit = new StableBernoulliBandit(rewardProbabilities);

    expect(bandit.rewardProbabilities).toEqual(rewardProbabilities);
  });

  // Test 2: Should throw error with only one reward probability.
  test("should throw error with less than two reward probabilities", () => {
    expect(() => new StableBernoulliBandit([0.5])).toThrow(
      "The length of rewardProbabilities must be greater than 1."
    );
  });

  // Test 3: Should throw error with invalid reward probability value.
  test("should throw error with reward probability out of [0, 1] range", () => {
    expect(() => new StableBernoulliBandit([0.5, 1.2])).toThrow(
      "Each reward probability must be between 0 and 1."
    );
    expect(() => new StableBernoulliBandit([-0.1, 0.5])).toThrow(
      "Each reward probability must be between 0 and 1."
    );
  });

  // Test 4: Should not allow changing reward probabilities after initialization.
  test("should not allow modification of reward probabilities after initialization", () => {
    const bandit = new StableBernoulliBandit([0.3, 0.7]);
    expect(() => {
      bandit.rewardProbabilities = [0.4, 0.6];
    }).toThrow(
      "You can't change the reward probabilities after initialization."
    );
  });

  // Test 5: Should return a reward based on Bernoulli distribution.
  test("should provide reward based on specified probability", () => {
    const originalMath = Object.create(global.Math);

    global.Math.random = () => 0.25; // Fixing random number for predictable result.
    const bandit = new StableBernoulliBandit([0.3, 0.7]);
    expect(bandit.getReward(0)).toBe(1); // Because 0.25 < 0.3
    expect(bandit.getReward(1)).toBe(1); // Because 0.25 < 0.7

    global.Math.random = () => 0.8;
    expect(bandit.getReward(0)).toBe(0); // Because 0.8 > 0.3
    expect(bandit.getReward(1)).toBe(0); // Because 0.8 > 0.7

    global.Math = originalMath; // Reset to the original Math object.
  });

  // Test 6: Should throw error for invalid arm index.
  test("should throw error for invalid arm index in getReward", () => {
    const bandit = new StableBernoulliBandit([0.3, 0.7]);
    expect(() => bandit.getReward(2)).toThrow("Invalid arm index: 2.");
  });
});
