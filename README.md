# psych-bandit - Multi-Armed Bandit & Agent Module

This repository contains implementations for both a multi-armed bandit problem and decision-making agents. The primary focus is on simulating reinforcement learning scenarios using bandit problems and evaluating various agent strategies.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
    - [Bandit](#bandit)
    - [Agent](#agent)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

The multi-armed bandit problem is a classic problem in probability theory and statistics. It represents the challenge of decision-making under uncertainty. The repository provides a general bandit class and a specific implementation where the probabilities remain stable.

Agents, on the other hand, are decision-making entities. In the context of the bandit problem, they select arms and then learn from the rewards they receive.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/g-morishita/psych-bandit.git
   ```
2. Navigate to the project directory:
   ```
   cd psych-bandit
   ```
3. Install the dependencies (if any):
   ```
   npm install
   ```

## Usage

### Bandit

To use the bandit module:

```javascript
import { StableBernoulliBandit } from './path-to-bandit-module';

const rewardProbabilities = [0.2, 0.5, 0.8];
const bandit = new StableBernoulliBandit(rewardProbabilities);

const reward = bandit.getReward(1);  // Gets reward from the second arm.
```

### Agent

To use the agent module:

```javascript
import { RLAgent } from './path-to-agent-module';

const initialValues = [0, 0, 0];
const learningRate = 0.1;
const beta = 1;

const agent = new RLAgent(learningRate, beta, initialValues);
const chosenArm = agent.makeChoice();
```

## Testing

To run tests:

```shell
npm test
```

Ensure that you have [Jest](https://jestjs.io/) installed and set up in your project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
