// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FootballPlayers is ERC721, Ownable {
    uint256 private _nextTokenId;

    constructor()
        ERC721("Football Players", "FTP")
        Ownable(msg.sender)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafkreidyyvdpuxvpc6e3ws6tzqbkm6vof4newzwqa4kg2tnygoqsfieclu";
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}