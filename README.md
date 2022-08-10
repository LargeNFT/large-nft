
# Large
Large is open source software that makes it simple to create and publish any content as an NFT collection on Ethereum and IPFS. 

Create a beautiful website, blog, or app and publish your content as an NFT collection. The Large Reader is a simple HTML/CSS/Javascript application built with Framework7 that includes native theming for iOS, Android, and Desktop. 

* Easily create content in a familiar interface.
* Publish a simple blog website that works on all devices.
* Generate all metadata to integrate with OpenSea and other public NFT infrastructure.

Both the Large Admin dashboard and the Large Reader are offline-first applications and can be used without an internet connection. The user just needs to download the app/website before going offline. 

## How it Works
* Content is stored in your browser as you create it.
* Data stored [PouchDB](https://pouchdb.com). PouchDB was created to help web developers build applications that work as well offline as they do online.
    * Sync devices (future)
    * Sync to cloud services (needs custom configuration)
    * Control your own data
    * Runs on your own devices

Please note that data is NOT stored on a server and by default is only available on the device where you are using it.

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
* Create a custom fork of the [Large Reader](https://gitlab.com/ptoner/large-reader)
* Publish collection data to Reader app.


### Fork and customize the Large Admin. 
Easy to whitelabel. 

### Themes
A theme allows you to apply CSS formatting to an NFT. Create themes and apply them to multiple items. 


### Static Pages.
Static pages let you create content that is displayed in the Large Reader alongside your collection. This allows
you to include content like your "About US" and "FAQ" alongside the collection. When the collection is exported to IPFS
these are exported alongside them which allows them to be displayed in the Large Reader. 


## Reader
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

### Data stored in local PouchDB
* Full-text search of collection contents.
* Multiple versions of the Large Reader can be deployed and each one has its own copy of the data. 
* Allows collection to be forked directly from the Reader as well as the admin. 
* This means your community can copy the Large Reader and make their own custom versions easily.
* Easy to build on. 

### Custom minting experience
* NFTs are visible before minting.
* Minting starts at token #1 and increments.
* Stories are minted in the order they are told.
* Everyone views the same upcoming mints.
* As NFTs are minted users collectively experience the content in the order it was intended.
    * Like listening to a music album as a group.

### Publish to the Reader at any time.
* Publish the Large Reader and collection content before deploying the smart contract. It's not required to deploy a contract if you do not want to mint NFTs.


# Reader Showcase
These project(s) showcase the basic features of the Large Reader. These projects are CC0 licensed and can be forked to start your own version of the project.
* [Alice's Adventures in Wonderland](https://readalice.com)

# Large Admin
Recommended: Fork this repo to deploy your own copy. The following link will take you to the most recent build. There is currently no production-ready version. 
[https://american-space-software.gitlab.io/large/](https://american-space-software.gitlab.io/large/)

Remember that all your data is stored in your local browser. We are never able to help you retreive it. 

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


## Launch Signaling Server
https://elements.heroku.com/buttons/penguin-academy/webrtc-signaling-server