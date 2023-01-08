
# Large

[![Npm package version](https://badgen.net/npm/v/large-nft)](https://npmjs.com/package/large-nft) [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE) 




The easiest way to publish your work as an NFT collection on **Ethereum** and **IPFS**. 

Publish a book, fan-fiction, blog, or art as a forkable NFT collection and sell digital collectibles on marketplaces like LooksRare, OpenSea, and more.

Build a fan site for an existing NFT collection.

Fork any NFT collection to experiment.

Generate a full-featured SEO-friendly PWA built with Framework7 to showcase your book or collection. Native theming for iOS, Android, and Desktop.

Inexpensively scale your community and marketplace on GitHub Pages, GitLab Pages, or any other simple, static webhost. No server compute required. No database server required.

Large stores and replicates NFT data directly in browser storage to help ensure a community can always keep their NFTs online even if the creator (and Large's creators) disappear and takes all of their hardware and software with them. 

# Goals

* Bring the permissionless properties of Ethereum to the rest of the NFT tech stack with a default viewer and marketplace that any user in the community can build on.

* Empower users to experience feelings associated with ownership with their digital artifacts.

* Help make sure users never lose the ability and rights to keep their digital property online for display and resale.

* Share and remix existing ideas. 

* What if an NFT creator disappears?
    * It's inevitable that every creator dies.
    * It's inevitable that every company dies.
    * The plan for technical implementation of the software stack should start with those assumptions. 
    * Decentralization demands it. 
    * Bitcoin continues to run even though Satoshi disappeared and so should an NFT collection.

* A single member of the community should be able to keep things going themselves.
    * What happens to your digital collectibles if you're the last one who cares?
    * Are you able to keep them online? 
    * Do you have legal rights to display them?
    * Permissionless ownership requires permisionless rights to display content.
    * As an artist do you want the value you built to crumble because no one is there to pay hosting fees?

* What if OpenSea disappears? What if they change their terms? What if every market disappears?
    * Is it smart to have no backup plan if something drastic were to happen to the largest marketplace providers? A well-made collection should have a home base and it should (arguably) provide fee free trading just like the original Cryptopunks market.

* An NFT collection should have a default viewer, marketplace, and any user should be able to run it.
    * Otherwise we lose the permissionless and open source properties of Ethereum.

* If anyone can run the whole stack it has to be designed with similar constraints as Ethereum in the sense that a single user should be able to run the entire thing on a consumer-grade machine. 

* No dependency on app stores. Built for the open and free web. Large NFT and Large Reader are modern PWAs that run directly in the browser with a simple static webhost. Since it's built to work offline-first it can also be wrapped and distributed to app stores if you choose. 

* Distributed through web or IPFS.

* Use git as a critical piece of decentralized, P2P infrastructure.

* Dependencies 
    * A web browser.
    * A simple static webhost.
    * A git provider.
    * IPFS node.


* Provide reasonable defaults for new NFTs collection and the ability to change and customize.

* To be distributed through IPFS and the web the full stack must run in a web browser.
    
* Any user can run the entire stack for a particular collection. 

* Provide a solid foundation for anyone to build on.

### Community
Join us on [Discord](https://discord.gg/35U29bEj)

## Components

**Large NFT** is a self-hosted web app to help build and publish an NFT collection right in your browser. Create new collections from scratch or fork existing ones. Data is stored right in local browser storage. **Large NFT** can also be whitelabeled and distributed to users. It scales by relying on the user's own hardware instead of cloud servers. So the hardware requirements as your community grows are minimal. 

**Large Reader** is a statically generated, self-hosted PWA that can be deployed to any simple webhost to let users enjoy the collection from any device. Large Reader is optimized for text-based content and has functionality similar to the Kindle. When combined with **Large Sync** it also shows the full transaction history for every token, for every user, and includes a full collection leaderboard. 

**Large Sync** is a lightweight Node app that generates live Ethereum transaction data for **Large Reader** in real-time or on a schedule. The sync is designed to run both in the browser and in Node. Because it is lightweight it can also be run on a schedule on the free-tier of the popular free webhosts. So users can get the latest data from the webhost or download and process it themselves from their own Ethereum node.

Supports [Alchemy](https://www.alchemy.com/) and local Ethereum nodes. 

Large is alpha software.

## Installation 

### Clone
```console
git clone https://github.com/LargeNFT/large-nft.git
```

### Install
Navigate to the new directory and run:

```console
npm install
```

### Run a local HTTP Server
```console
npm run start
```

# Large NFT

### Access in Browser
Large will be available at [http://localhost:8000](http://localhost:8000) by default.

![Large Admin](src/admin/html/images/large-start.jpg)


* Create one or more collections with text, images, and mixed-media NFTs.
* Content is stored in your browser using [PouchDB](https://pouchdb.com).
* Generate NFT metadata and publish to IPFS.
* Generate a reader-style website to view each collection.
* Deploy an ERC-721 gas-optimized smart contract to Ethereum.
* Set a mint price. Keep 100% of fees. 
* List NFTs for sale on OpenSea and other NFT marketplaces. 
* Collection data and website stored in GitHub/GitLab.

The community can easily keep the website online and use it as a starting point for custom fan experiences.

### Create an NFT Collection
Create a collection with the Large admin panel. 

* Choose a name, symbol, description, license, and NFT attributes.
* Create attribute categories.
    * Add attributes to give specific items special properties (eg Type, Hat, Shirt, Necklace)

### Create Content 
* Each item has a title, content, and a cover image.
* If a cover image is not provided an SVG is generated from the text.
* Choose a theme for each item.
* Automatically generates HTML animation for display on marketplaces.

### SVG and HTML Themes
Apply custom CSS formatting to an NFT/item. Create themes and apply them to multiple items. 

### Import and Fork Existing NFT Project
* Instead of starting your project from scratch, import an existing project that was published to IPFS with Large.
* Provide the IPFS hash.
* Remix existing ideas.

---

## Publish to Ethereum, IPFS, and Git

### Export collection metadata to IPFS.
* Connect to browser-based node or configure remote IPFS api.
* NFT metadata, images, animations, and backup data are exported to IPFS.

### Export to GitHub/GitLab
* Create a custom fork of the Large Reader.
* Use personal access token authentication and a CORS proxy to push content directly from your browser to GitHub and GitLab. 

### Deploy contract
* Deploy ERC-721 smart contract with minting capability to Ethereum mainnet or other compatible network.
* Customize smart contract or deploy the default low-gas contract.
    * Based on [ERC721A](https://github.com/chiru-labs/ERC721A)


# Large Reader 
Generate a search-engine friendly static website for an NFT collection. It is also a full-featured PWA (Progressive Web App) with a native look and feel on modern devices.

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


The following commands are to be used in the forked repository that you publish from the Large Admin. After pushing the content to your git provider, clone the repo and run the following commands.

## Install
```console
npm install
```

## Config
Configuration for the generation and sync processes are stored in large-config.json.  

### Example
Here is an example configuration for a site hosted on GitLab Pages.

```json
{
    "hostname": "https://ptoner.gitlab.io",
    "baseURL": "/bladerunner-punks-reader/",

    "showMintPage": false,
    "showActivityPage": true,
    "marketplaces": [
        {
            "name": "OpenSea",
            "link": "https://opensea.io/collection/bladerunner-punks"
        },
        {
            "name": "LooksRare"
        }
    ],
    "externalLinks": [
        {
            "name": "Discord",
            "link": "https://discord.gg/NhuCN5s2Xa"
        },
        {
            "name": "Twitter",
            "link": "https://twitter.com/BladeRunnerPunk"
        }
    ]
}
```


| Option | Default | Description | 
| ------------- | ------------- | ------------- |
| hostname  | http://localhost:8081 | The hostname where the generated Reader will be hosted. When generating the dev version it defaults to localhost. |
| baseURL  |  / | The path on the host where the generated app is hosted. This is used by the PWA's routing and must match the actual deployment URL. Must end with a /. For example /bladerunner-punks-reader/ 
| marketplaces  |   | See below
| externalLinks  |   | See below


### Marketplaces
The marketplaces field is an array of objects, with each object representing a marketplace. The objects in the array should have the following fields:

**name:** a string representing the name of the marketplace. This field is required.

**link (optional):** a string representing the URL of the marketplace's homepage or collections page. This field is optional and does not need to be included in every object. If the name field matches a preconfigured value (such as "LooksRare"), the link field will be set to the corresponding URL.


In the example above, the link field for the "OpenSea" marketplace is the URL of the collection page for that marketplace. The link field for the "LooksRare" marketplace is not included. It will default to the preconfigured URL for the "LooksRare" marketplace.

You can add as many objects to the marketplaces array as you like, as long as each object has the required name field.

Currently OpenSea and LooksRare are configured by default.

### External Links
Configure links to external resources associated with the collection such as Discord or Twitter. 



### Generate Large Reader for localhost
Note the -- before passing options. Generates HTML files in ./public folder.
```console
npm run generate -- --env dev --main-branch main
```

### Generate Large Reader for localhost
```console
npm run start
```

### Access in Browser
The generated web app will be available at [http://localhost:8081](http://localhost:8081) by default.


### Generate Large Reader for production
Generates HTML files in 'public' branch.

```console
npm run generate -- --main-branch main
```



# Large Sync
**Large Sync** is a Node.js app that reads transaction data from a configured Ethereum node and writes it to the "public" branch so it can be deployed to a web server. If configured it will also commit those changes to a configured git provider. 

Transaction data is also cached locally in PouchDB. 

### Start Large Sync
Note the -- before passing options.
```console
npm run sync --  --env dev --alchemy <API key>
```

## API

| Option | Default | Description | 
| ------------- | ------------- | ------------- |
| --env  | production | This loads either the dev or production settings for hostname and baseURL. Also in dev mode nothing is written to the 'public' branch. |
| --alchemy  |   | Pass a valid API key to connect the sync process to an Alchemy hosted Ethereum node. 
| --main-branch  | main  | The main branch. 
| --public-branch  | public  | The public branch. This branch is where the generate and sync tools write their changes.
| --sync-rate  | 30*1000  | Milliseconds between sync attempts. Default is 30 seconds. 



# Large Reader Showcase
These project(s) showcase the basic features of the Large Reader. These projects are CC0 licensed and can be forked to start your own version of the project.
* [Alice's Adventures in Wonderland](https://readalice.com)


# CORS

## Enable CORS to publish to IPFS
To publish to a hosted IPFS node:

1. Set the Remote IPFS API url in the Large Admin settings.
    * http://localhost:5001/api/v0 for local.
2. Configure the local node to set the proper CORS headers. Otherwise the browser will block any requests.

```console
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["GET", "POST", "PUT", "OPTIONS"]'
```

## Install CORS Proxy to publish to GitHub/GitLab
Large publishes directly to your git provider from browser storage. By default both GitHub and GitLab make this difficult because of their CORS setup. To get around this please install and use the [CORS Proxy](https://github.com/isomorphic-git/cors-proxy). You configure the URL on the Large NFT settings page.

