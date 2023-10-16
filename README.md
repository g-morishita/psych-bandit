# psych-bandit - Multi-Armed Bandit & Agent Module

This repository contains implementations for both a multi-armed bandit problem and decision-making agents. The primary focus is on simulating reinforcement learning scenarios using bandit problems and evaluating various agent strategies.

## 📖 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
    - [Bandit](#bandit)
    - [Agent](#agent)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## 📜 Overview

**Bandit**: Represents a generic bandit problem in the context of reinforcement learning. This is extended by specific bandit problem implementations, like `StableBernoulliBandit`, which provides rewards based on a Bernoulli distribution.

**Agent**: An abstract base class representing a generic decision-making agent. This can be extended to implement specific decision-making mechanisms like `RLAgent` which makes choices based on a softmax policy.

## ⬇️ Installation

1. **Clone** the repository:
   \```
   git clone https://github.com/your_username/your_repository_name.git
   \```

2. **Navigate** to the repository's root directory:
   \```
   cd your_repository_name
   \```

## 🛠 Usage

### Bandit

1. **Import** the desired Bandit variant, e.g., `StableBernoulliBandit`.
   \```javascript
   import { StableBernoulliBandit } from './src/bandits/StableBernoulliBandit.mjs';
   \```

2. **Instantiate** and use:
   \```javascript
   const bandit = new StableBernoulliBandit([0.2, 0.8]);
   const reward = bandit.getReward(0); // Gets reward for the first arm
   \```

### Agent

1. **Import** the desired Agent, e.g., `RLAgent`.
   \```javascript
   import { RLAgent } from './src/agents/RLAgent.mjs';
   \```

2. **Instantiate** and use:
   \```javascript
   const agent = new RLAgent(0.1, 0.5, [0, 0]);
   const choice = agent.makeChoice(); // Agent makes a choice based on its policy
   \```

## 🧪 Testing

To run tests for the modules, use the following command:

\```
npm test
\```

Ensure you have the required packages installed:

\```
npm install
\```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [Issues](https://github.com/your_username/your_repository_name/issues) page.

## 📄 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
