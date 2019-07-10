# Large
If you are curious about blockchain, peer-to-peer technology, or how to build decentralized applications for the new Internet, clone this repo and join us at [Learn Blockchain in Akron](https://www.meetup.com/Akron-DApps/)!

This repo contains the current state of our project, which we add to every week.

Can't make it to the meetup or want to learn more? [Join us on Discord.](https://discord.gg/kRydQeW)

# About the Project
**Large** is the fully decentralized content publishing platform we're building together at Learn Blockchain in Akron. It's like [Medium](https://www.medium.com/), but bigger!

Large uses a simple, reusable pattern to tie data in an Ethereum smart contract to data stored in IPFS. Transactional data is stored in Ethereum; everything else is stored in IPFS. We use [Orbit-Db](https://github.com/orbitdb/orbit-db) to share the data between the users.

We'll demo and review the basics of the project at the beginning of each meetup, so don't worry if you are new - we'll catch you up.

# Getting Started
You need the tools listed below to run the project. If you want to code along with us, try to complete these steps before the meetup. We'll teach you how everything works as we go.

Need help? [Just ask!](https://discord.gg/kRydQeW)

## What You'll Need
1. **Node.js** - JavaScript runtime environment. **npm** (Node package manager) is required to install and run Large and its dependencies.
    * [Get Node.js (includes npm) here.](https://nodejs.org/en/download/)
    * Run this command in your Terminal to make sure you're done. It will show the version of Node you installed:
    ```console
    node -v
    ```
    * If you get permission errors when using npm commands, try adding "sudo" before the command, i.e. 'npm install' becomes 'sudo npm install.' This may or may not be necessary depending on your Node.js installation.

1. **Truffle** - A deployment and testing framework for Ethereum smart contracts.
    * You can install [Truffle](https://truffleframework.com/truffle) with the following command:
    ```console
    npm install -g truffle
    ```
    * Run this command in your Terminal to make sure you're done. It will show your versions of Truffle, Solidity, Node, and Web3.js:
    ```console
    truffle version
    ```

1. **Ganache** - A mock Ethereum blockchain for local development and testing that runs entirely on your machine.
    * [Download the desktop Ganache client here.](https://truffleframework.com/ganache)

1. **IPFS** - The InterPlanetary File System, where all our blog data will be stored. You'll need to run an ipfs node on your machine to create and view blog posts.
    * [View instructions for downloading and running IPFS here.](https://docs.ipfs.io/introduction/install/) We're using the go-ipfs implementation.

1. **MetaMask** - Plugin for Chrome or Brave enables your browser to connect to the blockchain.
    * [Download MetaMask here.](https://metamask.io/)

1. **Visual Studio Code** - The lightweight text editor/IDE we will use at the meetup.
    * [Download VS Code here.](https://code.visualstudio.com/)
    * Once you have VS Code installed, you can add an Extension that helps you code in Solidity, the language we use to write Ethereum smart contracts. [Download the Solidity extension here.](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

1. **Discord** - Ask questions, discuss, get help, or just chat with us. Sometimes we share links here during the meetup.
    * [Click here to join!](https://discord.gg/kRydQeW)

## Installing This Project
If you have installed the tools above, you can run Large with the following steps. (We'll try to commit only working code to the master branch.)

1. **Clone and Install Large**
    * Using your Terminal or command line, copy this repository to your computer, navigate to the project folder, and install the program, using the following commands:
    ```console
    git clone https://github.com/ptoner/large.git
    
    cd large
    
    npm install
    ```

    Note: We've found that on some machines you'll need to run this command as "sudo npm install --allow-root --unsafe-perm


1. **Start Ganache** (your private blockchain!)
    * Just open the Ganache desktop client and leave it running.

1. **Run IPFS Daemon** (your data store!)
    * If you have installed IPFS per above, you can start the daemon with this command in your Terminal:
    ```console
    ipfs daemon
    ```

1. **Run Tests**
    * Inside the large project root directory:
    ```console
    npm run test
    ```
    * If your tests pass, you are all set up!

## Help Us Build the Rest!
Find [our next meetup](https://www.meetup.com/Akron-DApps/) and come see us!

