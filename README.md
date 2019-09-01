
# Large

![image](https://raw.githubusercontent.com/ptoner/Large/master/www/images/logo_white.png)

**Large** is an open source peer-to-peer blogging platform that helps you build apps and websites that are hosted by the people that use them. 

New peer-to-peer tech lets us make apps that work in familiar ways and gives us a bunch of new benefits.

* **You just send your messages to the people who want to see them.** No one sits in the middle collecting every message from every person to later blast them with ads about the contents until the end of time.

* **It’s serverless.** Not in the fancy cloud marketing way. You don’t have a server. You have an app on your phone and it stores all the things you read and post. If you have more than one device your data is available on both. The more users a P2P network gets the more reliable it becomes. Anyone who’s used bittorrent knows that it’s way faster when you have more peers. Same idea here. You can have servers, but it’s not a requirement.

* **No implicit need to monetize. So no ads.** Without servers to maintain there aren’t bills to pay. You can create a professional website or app, create content, and share it with your audience without a hosting bill. 

* **Offline mode is barely different from online mode.** You just can’t get new stuff.

The data lives on the devices of the people who use it. You send messages directly to the other users. If those messages become popular more people have copies. They make it available to everyone else. The more popular it gets the more available it becomes. We use public-key cryptography to make sure messages come from who we think they’re from. 

We can make multi-user apps that are ad-free and also actually free that let us do all the same things we already do. There’s no infrastructure to support. It’s just an app that runs on your own phone and computer.

There are some caveats of course. It might be slower at the beginning. Users can download the content from any other user. When you don’t have a lot of users this is possibly slower. If you’ve ever been one of the first people to download and seed a bittorrent file this will be familiar. P2P apps are slower when there are fewer users.

Traditional server-based apps have the opposite problem. Those get slower as you add users. You start by paying for servers and as your app gets more users the servers become bigger and more expensive. 

With Large you can (optionally) pay to host your data at the beginning to help bootstrap the network, but once you actually have an app with actual users that expense mostly disappears. Arguably it’s not all that important in the beginning either since you don’t actually have users yet.


## How It Works
**Large** is built on top of [IPFS](https://github.com/ipfs/ipfs) and [Ethereum](https://github.com/ethereum/solidity).

* All the actual data is stored in IPFS.
* Data services are provided by [OrbitDB](https://github.com/orbitdb/orbit-db).
* Ethereum is used as a virtual whitepages and to authenticate all messages. It also allows other crypto-specific features to be added later. In theory you could could later connect this to any smart contract platform.
* The front-end is built using [Framework7](https://github.com/framework7io/framework7). Everything is HTML/CSS/Javascript.
* The front-end is also the back-end. Dawg.

### Basic Architecture

* Everything is [TypeScript](https://github.com/microsoft/TypeScript). Types are the best.
* MVC
* All user interactions are managed by a controller.
    * The controller function will return a "ModelView" object.
        * It contains a function that returns the data for that page.
        * Also a string that represents a Framework7 component to load.
        * HTML goes in the component file. Sometimes with some small amounts of UI specific javascript.

* Controller calls a service function. Preferrably a single one. A service function with unit tests.

* Data is stored using OrbitDB. There are typescript services to help manage it. There's a schema.

* The "register" function calls an Ethereum smart contract. The address for this contract is configurable in the actual app. Eventually this is how you'll connect to different communities without needing a whole new app.



# Getting Started
You need the tools listed below to run the project.

Need help? [Just ask!](https://discord.gg/kRydQeW)

NOTE: All the below steps are now automated with inside a docker container. Visual Studio Code handles most everything. Instruction are in the SETUP file in the repo. We'll write them out here soon.



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
    * [View instructions for downloading and running IPFS here.](https://docs.ipfs.io/guides/guides/install/) We're using the go-ipfs implementation.

1. **MetaMask** - Plugin for Chrome or Brave enables your browser to connect to the blockchain.
    * [Download MetaMask here.](https://metamask.io/)

1. **Visual Studio Code** - The lightweight text editor/IDE we will use at the meetup.
    * [Download VS Code here.](https://code.visualstudio.com/)
    * Once you have VS Code installed, you can add an Extension that helps you code in Solidity, the language we use to write Ethereum smart contracts. [Download the Solidity extension here.](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

1. **Discord** - Ask questions, discuss, get help, or just chat with us. Sometimes we share links here during the meetup.
    * [Click here to join!](https://discord.gg/kRydQeW)

## Installing This Project
You can run this project without installing a ton of dependencies using vscode dev containers or docker-compose: see EXPERIMENTAL_SETUP.md

-- otherwise --

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

If you are curious about blockchain, peer-to-peer technology, or how to build decentralized applications for the new Internet, clone this repo and join us at [Learn Blockchain in Akron](https://www.meetup.com/Akron-DApps/)!

Can't make it to the meetup or want to learn more? [Join us on Discord.](https://discord.gg/kRydQeW)
