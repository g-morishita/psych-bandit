import { Bandit } from "../../src/bandits/bandit.mjs";

describe("Bandit Class Tests", () => {
  // Test 1: Ensuring that direct instantiation of the Bandit class throws an error.
  test("should not allow direct instantiation", () => {
    expect(() => new Bandit()).toThrow(
      "Abstract classes can't be instantiated."
    );
  });

  // Test 2: Ensuring that the getReward method throws an error when not overridden.
  test("should throw error when getReward is not overridden", () => {
    class MockBandit extends Bandit {} // A mock subclass without overriding getReward.
    const mockBanditInstance = new MockBandit();

    expect(() => mockBanditInstance.getReward()).toThrow(
      "Method 'getReward' has to be implemented"
    );
  });

  // Test 3: Ensuring that a subclass implementing getReward behaves as expected.
  test("should work correctly when getReward is overridden", () => {
    class MockRewardBandit extends Bandit {
      getReward() {
        return 42; // Always returns a reward of 42 as an example.
      }
    }
    const mockRewardBanditInstance = new MockRewardBandit();

    expect(mockRewardBanditInstance.getReward()).toBe(42);
  });
});
