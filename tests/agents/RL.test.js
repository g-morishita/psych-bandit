import { RLAgent } from '../../src/agents/RL.mjs';

describe('RLAgent', () => {

    // Testing the constructor and initial property validations
    describe('constructor', () => {
        it('should initialize with provided parameters', () => {
            const agent = new RLAgent(0.5, 1, [0, 0]);
            expect(agent.lr).toBe(0.5);
            expect(agent.beta).toBe(1);
            expect(agent.values).toEqual([0, 0]);
        });

        it('should throw an error for invalid learning rate', () => {
            expect(() => new RLAgent(-0.1, 1, [0, 0])).toThrow(/alpha must be between 0 and 1/);
            expect(() => new RLAgent(1.1, 1, [0, 0])).toThrow(/alpha must be between 0 and 1/);
        });

        it('should throw an error for negative beta', () => {
            expect(() => new RLAgent(0.5, -1, [0, 0])).toThrow(/beta must be nonnegative/);
        });
    });

    // Testing the softmax action selection process
    describe('makeChoice', () => {
        it('should make a choice based on softmax distribution', () => {
            const agent = new RLAgent(0.5, 1, [1, 1]); // With equal values, the agent should be approximately equally likely to choose any arm.
            const choices = Array(1000).fill(null).map(() => agent.makeChoice());
            const choice0 = choices.filter(choice => choice === 0).length;
            const choice1 = choices.filter(choice => choice === 1).length;
            expect(Math.abs(choice0 - choice1)).toBeLessThan(100); // With a sample size of 1000, we expect the difference to be less than 100.
        });

        it('should prefer arm with much higher expected value', () => {
            const agent = new RLAgent(0.5, 5, [1, 0]);
            const choices = Array(1000).fill(null).map(() => agent.makeChoice());
            const choice0 = choices.filter(choice => choice === 0).length;
            expect(choice0).toBeGreaterThan(900);  // The agent should prefer the first arm most of the time
        });

        it('should not show a strong preference when all arms have equal values', () => {
            const agent = new RLAgent(0.5, 1, [1, 1, 1]);
            const choices = Array(1000).fill(null).map(() => agent.makeChoice());
            const choiceCounts = [0, 1, 2].map(i => choices.filter(choice => choice === i).length);
            expect(Math.max(...choiceCounts) - Math.min(...choiceCounts)).toBeLessThan(100);  // The counts should be roughly equal
        });

    });

    // Testing the learning mechanism
    describe('learn', () => {
        it('should update the values based on received reward', () => {
            const agent = new RLAgent(0.5, 1, [0, 0]);
            agent.learn(0, 1);
            expect(agent.values).toEqual([0.5, 0]);
            agent.learn(0, 0);
            expect(agent.values).toEqual([0.25, 0]);
        });

        it('should throw an error for invalid arm index', () => {
            const agent = new RLAgent(0.5, 1, [0, 0]);
            expect(() => agent.learn(2, 1)).toThrow(/The index of the given arm exceeds/);
        });
    });
});
