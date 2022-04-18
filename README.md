
# Large

Large is a serverless and peer-to-peer blogging platform. 

## Features
* Available on web, desktop, and (future) Android/iOS.
* Create blog posts with embedded media. Images (video soon).

## Peer-to-Peer
* Basic functionality requires no infrastructure to manage or servers to maintain.
* Data is hosted by users directly.
* Easy to customize.
* No central database with everyone's data. Users host their own data. 
* If you like javascript this is perfect because it's all javascript. 
* The more users your app gets the more available your site becomes. 

## Serverless 
Not in the fancy cloud marketing way. By default, you don’t have a server. You have an app on your phone/computer and it stores the data that you read and post. It's (eventually) syncronized to all your devices. The more users a P2P network gets the more reliable it becomes. A bittorrent is way faster when you have more peers. Same idea here. You can have servers, but it’s not a requirement.

Without servers to maintain there aren’t bills to pay. You can create a professional website or app, create content, and share it with your audience without a hosting bill. 

An app built with Large stores its data directly on the user's device. Users send messages directly to the other users. If those messages become popular more people have copies to share. They make it available to everyone else. The more popular it gets the more available it becomes. We use public-key cryptography to make sure messages come from who we think they’re from. 

We can make multi-user apps that are ad-free and also actually free that let us do all the same things we already do. There’s no infrastructure to support. It’s just an app that runs on your own phone and computer.

There are some caveats of course. It might be slower at the beginning. Users can download the content from any other user. When you don’t have a lot of users this is possibly slower. If you’ve ever been one of the first people to download and seed a bittorrent file this will be familiar. P2P apps are slower when there are fewer users.

Traditional server-based apps have the opposite problem. Those get slower as you add users. You start by paying for servers and as your app gets more users the servers become bigger and more expensive. 

With Large you can (optionally) pay to host your data at the beginning to help bootstrap the network, but once you actually have an app with actual users that expense mostly disappears. 

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

# Latest Build
[https://ptoner.gitlab.io/large](https://ptoner.gitlab.io/large)



## Accessing Your Large Website

To start, the end-user will need a copy of the Large distribution. There are a bunch of different ways for them to get it. 

* Desktop app. In future also Android / iOS.
* A third-party hosted copy.
* Through an IPFS public gateway.
* Fork this repo. It'll automatically deploy a copy of it in GitLab pages for you. 
* Use [this one](https://ptoner.gitlab.io/large)
* Host it yourself. It's just a directory of HTML/javascript files. 
    * With IPFS
    * With regular web host.
    * Clone this repo and run the commands above to start the web client. 
* You can also fork this git repo and make a competely custom version of Large. All of the above options are still available. 
* Open via wallet address/ENS name (future). This will open the database and try to get the data via pubsub.
    * If peers have data you'll display the page. 
    * If no peers have the data, the site will be blank.


### How to use Large with a domain

- With a web server. 
    * Host the Large distribution. This doesn't include your content.  

    Optional
    * Install daemon to be a peer that distributes the actual website data. Uses pubsub. (future)
        * Will also provide a hosted download with actual website data. Won't require pubsub connection.  
        * This will probably act as a fallback if no peers are found. 


- Without a web server:
    - Redirect to public gateway and pass wallet address. In theory. Not exactly sure how the redirect will work. 



# Development Tools
You need the tools listed below to run the project.

Need help? [Just ask!](https://discord.gg/kRydQeW)


## What You'll Need

1. **[Node.js](https://nodejs.org/en/download/)** - JavaScript runtime environment. **npm** (Node package manager) is required to install and run Large and its dependencies.
    * Run this command in your Terminal to make sure you're done. It will show the version of Node you installed:
    ```console
    node -v
    ```
1. **[MetaMask](https://metamask.io/)** - Plugin for Chrome or Brave enables your browser to connect to the blockchain.


## Help Us Build the Rest!

[Join us on Discord.](https://discord.gg/kRydQeW)



## Launch Signaling Server
https://elements.heroku.com/buttons/penguin-academy/webrtc-signaling-server