import { Agent } from '../../src/agents/Agent.mjs';

describe('Agent Class', () => {

    test('should not allow direct instantiation', () => {
        expect(() => new Agent()).toThrowError("Abstract classes can't be instantiated.");
    });

    test('should throw error when makeChoice is called without overriding', () => {
        class TestAgent extends Agent {}
        const testAgent = new TestAgent();
        expect(() => testAgent.makeChoice()).toThrowError("Method makeChoice has to be implemented.");
    });

    test('should throw error when learn is called without overriding', () => {
        class TestAgent extends Agent {}
        const testAgent = new TestAgent();
        expect(() => testAgent.learn()).toThrowError("Method learn has to be implemented.");
    });

    test('should not throw error when makeChoice and learn are overridden', () => {
        class TestAgent extends Agent {
            makeChoice() {
                return 'Choice made';
            }
            learn() {
                return 'Learning done';
            }
        }
        const testAgent = new TestAgent();
        expect(testAgent.makeChoice()).toBe('Choice made');
        expect(testAgent.learn()).toBe('Learning done');
    });

});
