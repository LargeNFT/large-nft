
# Large
The best NFT platform For writers.

Publish your book, fan-fiction, blog, or art as a forkable NFT collection and sell your work as digital collectibles on marketplaces like LooksRare, OpenSea, and more.

Large is open source software that makes it simple to create and publish your digital art and other creative content as an NFT collection on Ethereum and IPFS.  

The Large Reader is a simple HTML/CSS/Javascript application built with Framework7 that includes native theming for iOS, Android, and Desktop. Data is stored directly on user's devices in a P2P database called PouchDB and can be published to an IPFS node (self-hosted or commercial) or directly to a built-in node in the browser with no extra setup*.  

The Large Admin and the [Large Reader](https://gitlab.com/american-space-software/large-reader) apps are offline-first applications and can be distributed with any simple CDN. No cloud computing required.

Large is open source software and is not a cloud service. Large gives users the tools to easily provide hosted infrastructure themselves and distribute the data in a format that guarantees all members of the community can contribute to keeping the content online for as long as necessary.

*Networking in the browser can be tricky and caveats apply. There are commercial technical solutions to most problems.  

## How it Works
* Easily create content in a familiar interface.  
* Content is stored in your browser as you create it.
    * Using [PouchDB](https://pouchdb.com). 
    * PouchDB is a P2P database that was created to help web developers build applications that work as well offline as they do online.
* Publish a simple blog website that works on all devices.
* Generate all metadata to integrate with OpenSea and other public NFT infrastructure.
* Deploy an ERC-721 gas-optimized smart contract to Ethereum.
* Set a mint price. Keep 100% of fees. 
* List NFTs for sale on OpenSea and other NFT marketplaces. 

Please note that data is NOT stored on a server and by default is only available on the device where you are using it until you publish. 

## Create an NFT collection
Create a collection with the Large admin panel. 

* Choose a name, symbol, description, license, and NFT attributes.
* Create attribute categories.
    * Add attributes to give specific items special properties (eg Type, Hat, Shirt, Necklace)
* Set a mint price. Keep 100% of fees. 
* Pre-set royalties for third-party marketplaces. 

## Create content. Publish as NFTs. 
* Each item has a title, content, and a cover image.
* If a cover image is not provided an SVG gets generated based on the text.
* Choose a theme to apply custom CSS.
* Add custom CSS per item.
* Generate HTML-based animation/frame for display on marketplaces.

## Import and fork existing NFT project
* Instead of starting your project from scratch, import an existing project that was published to IPFS with Large.
* Provide the IPFS hash.
* Remix existing ideas.


## Publish collection.

### Export data to IPFS node.
* Connect to browser-based node or configure remote IPFS api.
* NFT metadata, images, animations, and backup data are exported to IPFS.

### Pin data to pinning service.
* Configure commercial pinning service and pin collection data.

### Deploy contract
* Deploy ERC-721 smart contract with minting capability to Ethereum mainnet or other compatible network.
* Customize smart contract or deploy the default low-gas contract.
    * Based on [ERC721A](https://github.com/chiru-labs/ERC721A)

### Fork reader
* Automatically creates a custom fork of the [Large Reader](https://gitlab.com/ptoner/large-reader)
* Publish collection data to Reader app.

### Themes
A theme allows you to apply CSS formatting to an NFT. Create themes and apply them to multiple items. 


### Static Pages.
Static pages let you create content that is displayed in the Large Reader alongside your collection. This allows
you to include content like your "About US" and "FAQ" alongside the collection. When the collection is exported to IPFS
these are exported alongside them which allows them to be displayed in the Large Reader. 


# Large Reader
Generate a search-engine friendly static website for the collection. [Large Reader](https://gitlab.com/ptoner/large-reader)
* Users do not need a web3 browser to read the collection.
* Users do need a web3 browser to mint and interact with NFTs.

The Large Reader is statically generated based on your collection info. Google can crawl the website and you can customimze it to improve SEO. Also the app is a Progressive Web App (PWA) and the user will feel like they are using a native application. Framework7 handles styling components for iOS, Android, and the web which
makes things easy. 

Easily read and enjoy content in a familiar interface.

### Offline-first. Runs on your own devices.
* Distributed via IPFS, GitLab pages, or other CDNs.
* Any static webhost can easily host the Large Reader.
* Built entirely with HTML/CSS/javascript.

### Fully open source. Fork and customize.
* Large Admin publishes your collection to your own private repo on GitLab.
* Includes a full database backup and all associated media. 
* To support static-generated content Large uses GitLab CI to run and publish an npm build. 
* This process can be run on your own hardware instead.

### Data stored in local PouchDB
* P2P database. No master.
* Full-text search of collection contents.
* Multiple versions of the Large Reader can be deployed and each one has its own copy of the data. 
* Allows collection to be forked directly from the Reader as well as the admin. 
* This means your community can copy the Large Reader and make their own custom versions easily.
* Easy to build on. Sync your data with commercial scale CouchDB instances. 

### Custom minting experience
* NFTs are visible before minting.
* Minting starts at token #1 and increments.
* Stories are minted in the order they are told.
* Everyone views the same upcoming mints.
* As NFTs are minted users collectively experience the content in the order it was intended.
    * Like listening to a music album as a group.

### Publish to the Reader at any time.
* Publish the Large Reader and collection content before deploying the smart contract. It's not required to deploy a contract if you do not want to mint NFTs.

### Fork Project
* Large Reader ships with a full-featured copy of Large Admin
* Fork an existing project. Help keep the files online.
* Create your own derivitive.
* Each forked Reader also contains the Large Admin so each new project helps the network expand.



# Reader Showcase
These project(s) showcase the basic features of the Large Reader. These projects are CC0 licensed and can be forked to start your own version of the project.
* [Alice's Adventures in Wonderland](https://readalice.com)

# Large Admin
Recommended: Fork this repo to deploy your own copy. The following link will take you to the most recent build. There is currently no production-ready version. 
[https://american-space-software.gitlab.io/large/](https://american-space-software.gitlab.io/large/)

Remember that all your data is stored in your local browser. We are never able to help you retreive it. 

### Fork this repo and customize the Large Admin. 
Easy to whitelabel. 

## Coming Soon
* Import/Export/Clone existing collections. Works somewhat. Only tested on Alice. 
* Sync to all your devices.
* On-chain marketplace in Reader.

# Run locally
```console

git clone https://gitlab.com/american-space-software/large.git
cd large

npm run install

```


# Running the dev server
```console
npm run start:dev
```

# Creating a production build
```console
npm run build
```

The production build will be in the "public" folder. This repo includes a GitLab compatible script that builds and deploys Large automatically when there are new commits to the master branch. 


## Accessing Your Large Website

To start, the end-user will need a copy of the Large distribution. There are a bunch of different ways for them to get it. 

* Desktop app. In future also Android / iOS.
* A third-party hosted copy.
* Through an IPFS public gateway.
* Fork this repo. It'll automatically deploy a copy of it in GitLab pages for you. 
* Use [this one](https://american-space-software.gitlab.io/large/)
* Host it yourself. It's just a directory of HTML/javascript files. 
    * With IPFS
    * With regular web host.
    * Clone this repo and run the commands above to start the web client. 
* You can also fork this git repo and make a competely custom version of Large. All of the above options are still available. 

