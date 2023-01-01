
# Large NFT
A decentralized, offline-first content management system for NFT communities.

Publish your book, fan-fiction, blog, or art as a forkable NFT collection and sell your work as digital collectibles on marketplaces like LooksRare, OpenSea, and more.

Large is open source software that makes it simple to create and publish your digital art and other creative content as an NFT collection on Ethereum and IPFS.  

Each generated **Large NFT Reader** website is a simple HTML/CSS/Javascript app built with Framework7 that includes native theming for iOS, Android, and Desktop.

The **Large NFT Admin** and each generated **Large NFT Reader** apps are offline-first and can be distributed with any simple CDN or run locally. GitHub and GitLab Pages are integrated and their CI pipelines can be used to keep Ethereum transaction infomation current. Users can also connect their wallets directly to receive real-time data from their own nodes.  

Large is open source software and is not a cloud service. Large gives users the tools to easily provide hosted infrastructure themselves and distribute the data in a format that guarantees all members of the community can contribute to keeping the content online for as long as necessary. 

*Networking in the browser can be tricky and caveats apply. There are commercial technical solutions to most problems.  

## Installation 
1. Recommended: Fork this repo. 
    * The default CI pipeline will build and deploy a fresh copy.
    * Access through GitLab/GitHub Pages.

2. [Use most recent build](https://american-space-software.gitlab.io/large/)
    * All data is stored in your local browser. We are never able to help you retreive it.

3. Clone repo, install node dependencies, run local static webhost.


### Install dependencies
```console
git clone https://github.com/LargeNFT/large-nft.git
cd large
npm install
```

### Production build
```console
npm run build
```

### Dev server
```console
npm run start:dev
```

### Creating a dev build

The development build outputs full source maps to better debug certain kinds of issues.

```console
npm run build:dev
```

The production builds are located in the "public" folder. This repo includes a GitLab compatible script that builds and deploys Large automatically when there are new commits to the master branch. 


## How it Works
* Create one or more collections with text, images, and mixed-media NFTs.
* Content is stored in your browser using [PouchDB](https://pouchdb.com).
* Generate NFT metadata and publish to IPFS.
* Generate a reader-style website to view each collection.
* Deploy an ERC-721 gas-optimized smart contract to Ethereum.
* Set a mint price. Keep 100% of fees. 
* List NFTs for sale on OpenSea and other NFT marketplaces. 
* Collection data and website stored in GitHub/GitLab.

The community can easily keep the website online and use it as a starting point for custom fan experiences.

### Create an NFT collection
Create a collection with the Large admin panel. 

* Choose a name, symbol, description, license, and NFT attributes.
* Create attribute categories.
    * Add attributes to give specific items special properties (eg Type, Hat, Shirt, Necklace)

### Create content. 
* Each item has a title, content, and a cover image.
* If a cover image is not provided an SVG is generated from the text.
* Choose a theme for each item.
* Automatically generates HTML animation for display on marketplaces.

### Import and fork existing NFT project
* Instead of starting your project from scratch, import an existing project that was published to IPFS with Large.
* Provide the IPFS hash.
* Remix existing ideas.


# Publish

### Export collection to IPFS node.
* Connect to browser-based node or configure remote IPFS api.
* NFT metadata, images, animations, and backup data are exported to IPFS.

### Deploy contract
* Deploy ERC-721 smart contract with minting capability to Ethereum mainnet or other compatible network.
* Customize smart contract or deploy the default low-gas contract.
    * Based on [ERC721A](https://github.com/chiru-labs/ERC721A)

### Fork reader
* Creates a custom fork of the [Large Reader](https://gitlab.com/ptoner/large-reader)

### Themes
A theme allows you to apply CSS formatting to an NFT/item. Create themes and apply them to multiple items. 

### Static Pages.
Create pages with static content.

# Large Reader 
Generate a search-engine friendly static website for each collection. It is also a full-featured PWA (Progressive Web App) with a native look and feel on modern devices.

* Users do not need a web3 browser to read the collection.
* Users do need a web3 browser to mint and interact with NFTs.

Easily read and enjoy content in a familiar interface.

### Offline-first.
* Easily distributed on any static webhost. 
* Simple and customizable HTML/CSS/javascript.
* Wrap with Cordova to distribute to app stores.

### Free and open source. Fork and customize.
* Publish a collection to a public or private repo.
* Includes a full database backup and all associated media. 

### Data lives in browser storage on the user's device.
* Full-text search of collection contents.
* Fork collections directly from the generated **Large Reader** app. 
* This means your community can copy the Large Reader and make their own custom versions easily.
* Easy to build on. Sync your data with commercial scale CouchDB instances. 

### Mint NFTs.
* Minting starts at token #1 and increments.
* Stories are minted in the order they are told.

### Generate Large Reader without deploying a smart contract.
* It's not required to deploy a contract if you do not want to mint NFTs.

### Fork Project
* Large Reader ships with a full-featured copy of Large Admin.
* Fork an existing project. Help keep the files online.
* Easily create derivitive projects.


# Reader Showcase
These project(s) showcase the basic features of the Large Reader. These projects are CC0 licensed and can be forked to start your own version of the project.
* [Alice's Adventures in Wonderland](https://readalice.com)




## Enable CORS to publish to IPFS
To publish to a hosted IPFS node:

1. Set the Remote IPFS API url in the Large Admin settings.
    * http://localhost:5001/api/v0 for local.
2. Configure the local node to set the proper CORS headers. Otherwise the browser will block any requests.

```console
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST", "PUT", "OPTIONS"]'
```