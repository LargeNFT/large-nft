// contracts/Channel.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "erc721a/contracts/ERC721A.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

// import "./util/console.sol";

contract Channel is ERC721A, Ownable {

    string private _ipfsCid;

    uint256 private _mintFee;

    uint256 private _maxTokenId;

    //set the maximum number an address can mint at a time
    uint256 public MAX_MINT_AMOUNT = 10;


    constructor(string memory name, string memory symbol, string memory ipfsCid, uint256 mintFee, uint256 maxTokenId) ERC721A(name, symbol) {
        _mintFee = mintFee;
        _maxTokenId = maxTokenId;
        _ipfsCid = ipfsCid;
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function mint(uint256 quantity) public payable {

        /**
        Checks
         */
        uint256 totalMinted = _totalMinted();

        //No zeros
        require(quantity > 0, "Too few");

        //Enforce mint limit
        require(quantity <= MAX_MINT_AMOUNT, "Too many");

        //Don't mint past final token
        require(totalMinted + quantity <= _maxTokenId, "Minting closed");

        //Validate we have enough ETH. 
        require(msg.value == quantity * _mintFee, "Send exact ETH");

        //Mint
        _safeMint(_msgSender(), quantity);

    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        return string(abi.encodePacked("ipfs://", _ipfsCid, "/", uint2str(tokenId), ".json"));
    
    }

    function withdraw() public payable onlyOwner {

        (bool success, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(success);

    }

    function uint2str(uint _i) public pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

}