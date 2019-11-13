
# Large

![image](https://raw.githubusercontent.com/ptoner/Large/master/www/images/logo_white.png)

## Build a website or app that's hosted by your users with [IPFS](http://ipfs.io).
* P2P. No servers.
* Data is hosted by users directly.
* The more users your app gets the more available your site becomes.
* Browser-based. It's accessed like any other website.

## Features
* Create blog posts with embedded media. Images (video soon).
* Create pages with static content. 
* Build custom navigation menus (soon).
* Existing users are instantly notified when new content is posted. Real time updates.
* Users with wallets can interact with the app. Make comments, post media, etc. 
* Create complex, data-driven plugins. (later)  

## Peer-to-peer 
New P2P tech lets us make apps that work in familiar ways and gives us a bunch of new benefits.

* **You just send your messages to the people who want to see them.** There's no big database that contains everyone's data. Users have the data that's important to them and mechanisms to get shared data from any other user. 

* **It’s serverless.** Not in the fancy cloud marketing way. You don’t have a server. You have an app on your phone/computer and it stores the data that you read and post. It's (eventually) syncronized to all your devices. The more users a P2P network gets the more reliable it becomes. A bittorrent is way faster when you have more peers. Same idea here. You can have servers, but it’s not a requirement.

* **No implicit need to monetize.** Without servers to maintain there aren’t bills to pay. You can create a professional website or app, create content, and share it with your audience without a hosting bill. 

* **Offline mode** You just can’t get new stuff. 

An app built with Large stores its data directly on the user's device. Users send messages directly to the other users. If those messages become popular more people have copies to share. They make it available to everyone else. The more popular it gets the more available it becomes. We use public-key cryptography to make sure messages come from who we think they’re from. 

We can make multi-user apps that are ad-free and also actually free that let us do all the same things we already do. There’s no infrastructure to support. It’s just an app that runs on your own phone and computer.

There are some caveats of course. It might be slower at the beginning. Users can download the content from any other user. When you don’t have a lot of users this is possibly slower. If you’ve ever been one of the first people to download and seed a bittorrent file this will be familiar. P2P apps are slower when there are fewer users.

Traditional server-based apps have the opposite problem. Those get slower as you add users. You start by paying for servers and as your app gets more users the servers become bigger and more expensive. 

With Large you can (optionally) pay to host your data at the beginning to help bootstrap the network, but once you actually have an app with actual users that expense mostly disappears. Arguably it’s not all that important in the beginning either since you don’t actually have users yet.


## How It Works

**Large** is built on top of [IPFS](https://github.com/ipfs/ipfs) and [Ethereum](https://github.com/ethereum/solidity).

* All the actual data is stored in IPFS.
* Data services are provided by [OrbitDB](https://github.com/orbitdb/orbit-db).
* It provides an [ethers.js](https://github.com/ethers-io/ethers.js/) Ethereum wallet.
* The front-end is built using [Framework7](https://github.com/framework7io/framework7). Everything is HTML/CSS/Javascript.
* The front-end is also the back-end. Dawg.

### Basic Architecture

* All of the code is [TypeScript](https://gitlab.com/microsoft/TypeScript). Types are the best.

* [Large Core](https://gitlab.com/ptoner/large-core) - Basic P2P data services that are authenticated by an Ethereum wallet. Provides services that let you create a profile, follow other users, and users can post messages that are aggreggated to everyone who follows them.

    * Data is stored using OrbitDB. There are typescript services to help manage it. There's a schema.

* [Large Web](https://gitlab.com/ptoner/large-web) - Common web components. Depends on Framework7. Goal is to make it as quick as possible to build a full, working UI on Desktop/Android/iOS without needing to manage the difference between the environments. It looks like a desktop app on a desktop, like an iOS app on iOS, and like Android on an Android. 

* This repo contains an app that's built to showcase all of these features. It's mostly like Twitter right now. But it's really just a prototype to make sure there's a full toolkit to quickly build cross platform P2P apps/websites. There are many things that are broken and or missing. Please file issues when you find them. There are a lot of issues at this point.



# Install
```console

git clone https://gitlab.com/ptoner/large.git
cd large

npm run install
```

# Running the desktop client

```console
npm run electron
```


# Running the web client

```console
npm run watch
```

Then in a different terminal

```console
npm run serve
```

# Latest Build Hash
```console
QmccRnV2hdLsLT5C73VU6WZwDrfPdGFa8ohHq5sCdCnEj4
```




# Development Tools
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

1. **MetaMask** - Plugin for Chrome or Brave enables your browser to connect to the blockchain.
    * [Download MetaMask here.](https://metamask.io/)

1. **Visual Studio Code** - The lightweight text editor/IDE we will use at the meetup.
    * [Download VS Code here.](https://code.visualstudio.com/)
    * Once you have VS Code installed, you can add an Extension that helps you code in Solidity, the language we use to write Ethereum smart contracts. [Download the Solidity extension here.](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)

1. **Discord** - Ask questions, discuss, get help, or just chat with us. Sometimes we share links here during the meetup.
    * [Click here to join!](https://discord.gg/kRydQeW)




## Help Us Build the Rest!

[Join us on Discord.](https://discord.gg/kRydQeW)
