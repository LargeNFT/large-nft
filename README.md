
# Large
Large is open source software that makes it simple to create and publish any content as an NFT collection on Ethereum and IPFS. Create a beautiful website, blog, or app and instantly turn all of your content into a professional-grade NFT collection. 

Like WordPress for NFTs but offline-first and web3 native. 

## How it Works
* Create rich-text NFTs. Text, images, or audio (soon). 
* Content is stored in your browser as you create it.
* Generate all metadata to integrate with OpenSea and other public NFT infrastructure.
* Available on web, desktop, and mobile.

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