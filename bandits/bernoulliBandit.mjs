import { Bandit } from "./bandit.mjs";

class StableBernoulliBandit extends Bandit {
    constructor(rewardProbabilities) {
        super();
        this.rewardProbabilities = rewardProbabilities;
    }
    get rewardProbabilities() {
        return this._rewardProbabilities;
    }
    set rewardProbabilities(rewardProbabilities) {
        if (typeof this.rewardProbabilities !== "undefined") {
            throw new Error("You can't change the mean reward.");
        }
        // Check the length of the reward probabilities is larger than 1.
        if (rewardProbabilities.length <= 1) {
            throw new Error(`The length of the meanRewards is less than 2. Check the given param: ${rewardProbabilities}`);
        }
        // Check the reward probability is in a valid range [0, 1].
        for (const rewardProb of rewardProbabilities) {
            if ((rewardProb < 0) && (rewardProb > 1)) {
                throw new Error(`Reward probability must be somewhere between 0 and 1. Given ${rewardProb}`);
            }
        }
        this._rewardProbabilities = rewardProbabilities;
    }

    getReward(chosenArm) {
        const randomVal = Math.random();
        if (chosenArm >= this._rewardProbabilities.length) {
            throw new Error(`The index of arm exceeds the given reward vector. Given ${chosenArm}`);
        }
        const meanReward = this._rewardProbabilities[chosenArm]
        if (meanReward > randomVal) {
            return 1;
        }
        return 0;
    }
}

export { StableBernoulliBandit };
