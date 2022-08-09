
# Large
Large is open source software that makes it simple to create and publish any content as an NFT collection on Ethereum and IPFS. Create a beautiful website, blog, or app and instantly turn all of your content into a professional-grade NFT collection. 

Like WordPress for NFTs but offline-first and web3 native. 
* Easily create content in a familiar interface.
* Publish a simple blog website that works on all devices.
* Distribute content to third-party marketplaces like OpenSea and LooksRare.

The Large Reader is a simple HTML/CSS/Javascript based application built with Framework7 that includes native theming for iOS, Android, and Desktop. 

## How it Works

* Create rich-text NFTs. Text, images, or audio (soon). 
* Content is stored in your browser as you create it.
* Generate all metadata to integrate with OpenSea and other public NFT infrastructure.

Please note that data is NOT stored on a server and by default is only available on the device where you are using it.

* Create a collection with the Large admin panel. 

    * Choose a name, symbol, description, license, and NFT attributes.
        * Create NFT themes. 
            * A theme allows you to apply CSS formatting to an NFT. Create themes and apply them to multiple items. 
        * Create attribute categories.
            * Add attributes to give specific items special properties (eg Type, Hat, Shirt, Necklace)
        * Create static pages.
            * Static pages all you to create content that is displayed in the Large Reader alongside your collection.
        * Set a mint price. 
        * Pre-set royalties for third-party marketplaces. 

* Create items.
    * Each item has a title, content, and a cover image.
    * If a cover image is not provided an SVG gets generated based on the text.
    * Choose a theme to apply custom CSS.
    * Add custom CSS per item.
    * Generate HTML-based animation/frame for display on marketplaces.

* Publish collection.
    * Export data to IPFS node.
        * Connect to browser-based node or configure remote IPFS api.
        * NFT metadata, images, animations, and backup data are exported to IPFS.
    * Pin data to pinning service.
        * Configure commercial pinning service and pin collection data.
    * Deploy contract
        * Deploy ERC-721 smart contract with minting capability to Ethereum mainnet or other compatible network.
        * Customize smart contract or deploy the default low-gas contract.
            * Based on [ERC721A](https://github.com/chiru-labs/ERC721A)
    * Fork reader
        * Create a custom fork of the [Large Reader](https://gitlab.com/ptoner/large-reader)
        * Publish collection data to Reader app.

* Fork a collection
    * Instead of starting your project from scratch, import an existing project that was published to IPFS with Large.
    * Provide the IPFS hash 

## Reader
* Generate a search-engine friendly static website for the collection. [Large Reader](https://gitlab.com/ptoner/large-reader)
 - Users do not need a web3 browser to read the collection.
 - Users do need a web3 browser to mint and interact with NFTs.

* Fully open source. Requires no special infrastrcture to run either the admin panel or the Reader.
* Publish to the Reader at any time.

## IPFS
* Publish to an IPFS node running in the browser.
* Upload to commerical IPFS hosting when ready to deploy to production. 

## Solidity
* Deploy a Solidity contract when ready to mint. Use a pre-built contract or deploy your own. 
* Users can mint NFTs in the Reader app.
* Configure a mint price in ETH.
* Configure NFT royalties.

## Coming Soon
* Import/Export/Clone existing collections.
* Sync to all your devices.
* On-chain marketplace in Reader.


# Install
```console

git clone https://gitlab.com/ptoner/large.git
cd large

npm run install

```


# Running the dev server
```console
npm run start:dev
```

# Latest Build
[https://american-space-software.gitlab.io/large/](https://american-space-software.gitlab.io/large/)


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