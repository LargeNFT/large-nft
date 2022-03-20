// contracts/Channel.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
// import "./util/console.sol";


contract Channel is ERC721Enumerable, Ownable {

    string private _ipfsCid;

    uint256 private _mintFee;
    address private _feeRecipient;

    uint256 private _maxTokenId;

    constructor(string memory name, string memory symbol, uint256 mintFee, address feeRecipient, uint256 maxTokenId) ERC721(name, symbol) {
        _mintFee = mintFee;
        _feeRecipient = feeRecipient;
        _maxTokenId = maxTokenId;
    }

    function changeFeeRecipient(address newRecipient) external onlyOwner {
        _feeRecipient = newRecipient;
    }

    function activate(string calldata ipfsCid) external onlyOwner {
        require(bytes(_ipfsCid).length == 0, "Already active");
        _ipfsCid = ipfsCid;
    }

    function mint(uint256 tokenId) public payable {

        /**
        Checks
         */

        //Make sure we are active
        require(bytes(_ipfsCid).length > 0, "Inactive");

        //Validate tokenId is in range
        require(tokenId > 0 && tokenId <= _maxTokenId, "Invalid token");

        //Make sure this one hasn't been minted
        require(_exists(tokenId) == false, "Exists");

        //Validate we have enough ETH. 
        require(msg.value == _mintFee, "Send exact ETH");
 
        //Transfer ETH to _feeRecipient
        if (msg.value > 0) {
            payable(_feeRecipient).transfer(msg.value);
        }
        
        //Mint
        _safeMint(_msgSender(), tokenId, "");

    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        
        require(bytes(_ipfsCid).length > 0, "Not active");

        //Validate token exists
        require(_exists(tokenId), "Does not exist");


        return string(abi.encodePacked("ipfs://", _ipfsCid, "/", tokenId, ".json"));
    
    }






}