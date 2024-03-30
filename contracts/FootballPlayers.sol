// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FootballPlayers is ERC721, Ownable {
    uint16 private TOKEN_CAP = 4;
    uint256 private _nextTokenId;

    constructor()
        ERC721("Football Players", "FTP")
        Ownable(msg.sender)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafybeiag6fokmiz6xmjodjyeuejtgrbyf2moirydovrew2bhmxjrehernq/";
    }

    function safeMint(address to) public onlyOwner {
        require (_nextTokenId <= TOKEN_CAP, "Token cap exceeded");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);
        return string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"));
    }
}